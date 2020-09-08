<template>
  <div>
    <main-item>
      <template #top>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="addCatebtn">添加分类</el-button>
            </div></el-col
          >
        </el-row>
      </template>
      <template #main>
        <tree-table :data="getList" v-if="getList" :columns="columns" :selection-type="false" :expand-type="false" show-index border>
          <template #isok="asd">
            <i class="el-icon-circle-check" v-if="asd.row.cat_deleted" style="color: lightgreen"></i>
            <i class="el-icon-circle-close" style="color: red"></i>
          </template>
          <template #order="asd">
            <el-tag size="mini" v-if="asd.row.cat_level === 0">一级</el-tag>
            <el-tag size="mini" type="success" v-else-if="asd.row.cat_level === 1">二级</el-tag>
            <el-tag size="mini" type="warning" v-else>三级</el-tag>
          </template>
          <template #opt="asd">
            <el-button type="primary" @click="showEditCate(asd.row.cat_id)" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" @click="showDelCate(asd.row.cat_id)" size="mini" icon="el-icon-delete">删除</el-button>
          </template>
        </tree-table>
        <!-- 分页 -->
        <page :queryInfo="queryInfo" :total="total" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" />
        <!-- 添加分类 -->
        <el-dialog title="添加分类" :visible.sync="addCate" width="35%" @close="editCateClose">
          <addCate @addCateRef="addCateRef"  :parentGoodsList='parentGoodsList' @addCateForm='addCateForm' @selectedKeys="selectedKeys"> </addCate>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addCate = false">取 消</el-button>
            <el-button type="primary" @click="addCatecuss">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 修改 -->

        <!-- 删除 -->
      </template>
    </main-item>
  </div>
</template>

<script>
import MainItem from '@/components/comomon/main'
import addCate from './children/goodsdialog'
import page from './children/goodspage'
import { getCategories, getParentCateData, addCateData } from '@/network/goods/cate'
export default {
  components: {
    MainItem,
    page,
    addCate
  },
  data () {
    return {
      queryInfo: {
        type: 2,
        pagenum: 1,
        pagesize: 10
      },
      getList: [],
      total: 0,
      addCate: false,
      parentFrom: [],
      parentGoodsList: [],
      ref: '',
      data: [],
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getCategories(this.queryInfo).then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.getList = res.data.data.result
        this.total = res.data.data.total
      })
    },
    handleSizeChange () {
      this.getData()
    },
    handleCurrentChange () {
      this.getData()
    },
    addCatebtn () {
      this.getParentCateList()
      this.addCate = true
    },
    getParentCateList () {
      getParentCateData().then(res => {
        if (res.data.meta.status !== 200) return this.$message.error('获取数据失败')
        this.parentGoodsList = res.data.data
        console.log(this.parentGoodsList)
      })
    },
    addCatecuss () {
      this.ref.validate(val => {
        if (!val) return
        addCateData(this.parentFrom).then(res => {
          console.log(res)
          if (res.data.meta.status !== 201) return this.$message.error('添加失败')
          this.getData()
        })
      })
      this.addCate = false
    },
    addCateForm (data) {
      this.parentFrom = data
    },
    addCateRef (ref) {
      this.ref = ref
    },
    selectedKeys (data) {
      this.data = data
    },
    editCateClose () {
      this.ref.resetFields()
      this.data = []
      this.parentFrom.cat_level = 0
      this.parentFrom.cat_pid = 0
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 15px;
}
</style>
