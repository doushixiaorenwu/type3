<template>
  <div>
    <el-form :model="addCateForm" ref="addCateRef" :rules="rules" label-width="90px">
      <el-form-item prop="cat_name" label="分类名称:">
        <el-input v-model="addCateForm.cat_name"  @input="reset" />
      </el-form-item>
      <el-form-item label="父级分类:">
        <!-- options 用来指定数据源 -->
        <!-- props 用来指定配置对象 -->
        <el-cascader :clearable="true" expand-trigger='hover' v-model="selectedKeys" :options="parentGoodsList" :props="cascaderProps" @change="parentCateChange"></el-cascader>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['parentGoodsList'],
  data () {
    return {
      addCateForm: {
        cat_name: '',
        cat_pid: 0, // 父级分类id
        cat_level: 0 // 分类等级
      },
      selectedKeys: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    parentCateChange () {
      this.addCateForm.cat_level = this.selectedKeys.length
      if (this.selectedKeys.length === 0) {
        this.addCateForm.cat_pid = 0
      } else {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
      }
      this.$emit('addCateForm', this.addCateForm)
      this.$emit('selectedKeys', this.selectedKeys)
    },
    reset () {
      this.$emit('addCateRef', this.$refs.addCateRef)
    }
  }
}
</script>

<style>
.el-cascader {
  width: 100%;
}</style>
