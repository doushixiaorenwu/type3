<template>
  <div>
      <el-form :model="model" label-width="80px" :rules="rules">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="model.roleName" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="model.roleDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="right" @click="cancel">取 消</el-button>
        <el-button  class="right" type="primary" @click="editRoles">确 定</el-button>
      </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['model'],
  methods: {
    editRoles () {
      this.$emit('editRoles')
    },
    cancel () {
      this.$emit('cancel')
    }
  }

}
</script>

<style scoped>
.right{
   margin: -15px 10px 0 0;
    float: right;
}
</style>
