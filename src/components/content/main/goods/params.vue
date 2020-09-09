<template>
  <div>
    <main-item>
      <template #main>
        <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon />
        <el-row>
          <el-col>
            <span>选择商品分类</span>
            <el-cascader v-model="selectData" :options="getDataList" :props="propsData" @change="handleChange" wight="100px"></el-cascader>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="handleTab">
          <el-tab-pane label="动态参数" name="many">
            <el-button type="primary" size="mini" :disabled="isBtn" @click="addParamDiaLog = true"> 添加参数</el-button>
            <el-table :data="manyList" border stripe>
              <el-table-column type="expand"> </el-table-column>

              <el-table-column type="index" label="#"> </el-table-column>
              <el-table-column label="参数名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作" width="200px">
                <template v-slot="asd">
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdit(asd.row.attr_id)">编辑</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(asd.row.attr_id)" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="only">
            <el-button type="primary" size="mini" :disabled="isBtn" @click="addParamDiaLog = true"> 添加属性</el-button>
            <el-table :data="onlyList" border stripe>
              <el-table-column type="expand"> </el-table-column>

              <el-table-column type="index" label="#"> </el-table-column>
              <el-table-column label="属性名称" prop="attr_name"></el-table-column>
              <el-table-column label="操作" width="200px">
                <template v-slot="asd">
                  <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEdit(asd.row.attr_id)">编辑</el-button>
                  <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(asd.row.attr_id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- 添加 -->
        <el-dialog :title="'添加' + titleText" :visible.sync="addParamDiaLog" width="50%" @close="addParamClose">
          <el-form :model="addParamForm" label-width="80px" ref="addParamRef" :rules="rules">
            <el-form-item :label="titleText" prop="attr_name">
              <el-input v-model="addParamForm.attr_name" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addParamDiaLog = false">取 消</el-button>
            <el-button type="primary" @click="addParam">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog :title="'修改' + titleText" :visible.sync="editParamDiaLog" width="50%" @close="editParamClose">
          <el-form :model="editParamForm" label-width="80px" ref="editParamRef" :rules="rules">
            <el-form-item :label="titleText" prop="attr_name">
              <el-input v-model="editParamForm.attr_name" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="editParamDiaLog = false">取 消</el-button>
            <el-button type="primary" @click="editParam">确 定</el-button>
          </span>
        </el-dialog>
      </template>
    </main-item>
  </div>
</template>

<script>
import MainItem from '@/components/comomon/main'
import { getCategories, getCateData, addParamData, getParamById, editParamData, delParamData } from '@/network/goods/params'
export default {
  components: {
    MainItem
  },
  data () {
    return {
      getDataList: [],
      selectData: [],
      manyList: [],
      onlyList: [],
      addParamDiaLog: false,
      editParamDiaLog: false,
      addParamForm: {},
      editParamForm: {},
      propsData: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeName: 'many',
      rules: {
        attr_name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getData()
  },
  computed: {
    isBtn () {
      if (this.selectData.length !== 3) {
        return true
      }
      return false
    },
    // 当前选中的三级分类的id
    cateId () {
      if (this.selectData.length === 3) {
        return this.selectData[this.selectData.length - 1]
      }
      return null
    },
    titleText () {
      return this.activeName === 'many' ? '动态参数' : '静态属性'
    }
  },

  methods: {
    getData () {
      getCategories().then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.getDataList = res.data.data
        console.log(this.getDataList)
      })
    },
    handleChange () {
      console.log(this.cateId)
      this.getParamsData()
    },
    handleTab () {
      this.getParamsData()
    },
    getParamsData () {
      if (this.selectData.length !== 3) {
        this.selectData = []
        this.manyList = []
        this.onlyList = []
        return
      }
      getCateData(this.cateId, this.activeName).then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        if (this.activeName === 'many') {
          this.manyList = res.data.data
        } else {
          this.onlyList = res.data.data
        }
      })
    },
    addParam () {
      this.$refs.addParamRef.validate((val) => {
        if (!val) return
        const obj = {
          id: this.cateId,
          attr_name: this.addParamForm.attr_name,
          attr_sel: this.activeName
        }
        addParamData(obj).then((res) => {
          console.log(res)
          if (res.data.meta.status !== 201) return this.$message.error('获取数据失败')
          this.getParamsData()
        })
        this.addParamDiaLog = false
      })
    },
    addParamClose () {
      this.$refs.addParamRef.resetFields()
    },
    editParamClose () {
      this.$refs.editParamRef.resetFields()
    },
    editParam () {
      this.$refs.editParamRef.validate((val) => {
        if (!val) return
        editParamData(this.editParamForm).then((res) => {
          if (res.data.meta.status !== 200) return this.$message.error('修改参数失败')
          this.editParamDiaLog = false
          this.getParamsData()
        })
      })
      this.editParamDiaLog = false
    },
    showEdit (id) {
      this.editParamDiaLog = true
      getParamById(this.cateId, id, this.activeName).then((res) => {
        console.log(res)
        if (res.data.meta.status !== 200) return this.$message.error('获取参数信息失败')
        this.editParamForm = res.data.data
      })
    },
    async removeParams (id) {
      const result = await this.$confirm('此操作将永久删除该参数，是否继续?', '提示', {
        type: 'warning'
      }).catch((err) => err)
      if (result !== 'confirm') return this.$message.info('取消操作')
      delParamData(this.cateId, id).then(
        res => {
          if (res.data.meta.status !== 200) return this.$message.error('删除分类失败')
          this.getParamsData()
        }
      )
    }
  }
}
</script>

<style scopde>
.el-row {
  margin-top: 15px;
}
.el-row span {
  margin-right: 15px;
}
</style>
