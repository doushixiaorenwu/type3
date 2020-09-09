<template>
  <div>
    <el-card>
      <!-- 提示消息 -->
      <el-alert title="消息提示的文案" type="info" center show-icon :closable="false"></el-alert>
      <!-- 状态步骤条 -->
      <el-steps :space="300" :active="acttiveIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏 -->
      <el-form :model="addForm" :rules="addRules" ref="addRuleForm" label-width="100px" label-position="top">
        <el-tabs v-model="acttiveIndex" :tab-position="'left'" :before-leave="beforeLeave" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addForm.goods_cat" :options="dataList" :props="cateProps" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="item in manyData" :key="item.attr_id">
              <!-- 复选框 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="it" border v-for="(it, i) in item.attr_vals" :key="i"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" :headers="headerObj" :on-success="handleSuccess" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="btn" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img :src="previewPath" class="imgSize" />
    </el-dialog>
  </div>
</template>

<script>
import { addGetData, getCategories, addGoodData } from '@/network/goods/goods'

export default {
  data () {
    return {
      acttiveIndex: '0',
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      addRules: {
        goods_name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      // 获取的商品分类
      dataList: [],
      // 级联选择器规则
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 动态参数列表
      manyData: [],
      // 静态资源
      onlyData: [],
      // 图片上传地址
      uploadURL: 'http://timemeetyou.com:8889/api/private/v1/upload',
      //  上传图片请求他
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      //  图片预览对话框隐藏
      dialogVisible: false,
      // 图片预览地址
      previewPath: ''
    }
  },
  created () {
    this.getDataList()
  },
  methods: {
    async getDataList () {
      const { data: res } = await addGetData()
      if (res.meta.status !== 200) return this.$message.error('获取数据失败')
      this.dataList = res.data
    },
    // 级联选测器变化
    handleChange () {
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    // 标签页转换前置钩子
    beforeLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // TAB被点击时触发
    tabClicked () {
      if (this.acttiveIndex === '1') {
        this.getParamsList('many')
      } else if (this.acttiveIndex === '2') {
        this.getParamsList('only')
      }
    },
    // 获取动态资源静态
    async getParamsList (type) {
      const { data: res } = await getCategories(this.cateId, type)
      if (res.meta.status !== 200) return this.$message.error('获取失败')
      if (type === 'many') {
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals === '' ? [] : item.attr_vals.split(' ')
        })
        this.manyData = res.data
      } else {
        this.onlyData = res.data
      }
    },
    //  图片预览
    handlePreview (file) {
      this.previewPath = file.response.data.url
      this.dialogVisible = true
    },
    // 图便移除
    handleRemove (file) {
      const path = file.response.data.tmp_path
      const i = this.addForm.pics.findIndex((v) => v.pic === path)
      this.addForm.pics.splice(i, 1)
    },
    // 图片上传成功钩子
    handleSuccess (response) {
      const picInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(picInfo)
    },
    // 添加商品介绍
    add () {
      this.$refs.addRuleForm.validate(async (valid) => {
        if (!valid) return this.$message.error('请填写表单必要项！')

        const form = JSON.parse(JSON.stringify(this.addForm))
        form.goods_cat = form.goods_cat.join(',')
        this.manyData.forEach((item) => {
          const newForm = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newForm)
        })
        this.onlyData.forEach((item) => {
          const newForm = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newForm)
        })
        const { data: res } = await addGoodData(form)
        if (res.meta.status !== 201) return this.$message.error('添加商品失败')
        this.$router.push('/goods')
        this.$message.success('添加商品成功')
      })
    }
  },
  computed: {
    // 获取三级ID
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[this.addForm.goods_cat.length - 1]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important ;
}
.imgSize {
  width: 100%;
}
.btn {
  margin-top: 15px;
}
</style>
