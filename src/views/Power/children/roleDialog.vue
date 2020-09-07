<template>
  <div>
      <el-dialog :show-close="false" title="添加角色" :visible.sync="haha" width="50%" @close="addRoleClose">
      <el-form :model="addRoleForm" label-width="80px" ref="addRoleRef">
        <el-form-item prop="roleName" label="角色名称">
          <el-input v-model="addRoleForm.roleName" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isshow">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRoleData } from '@/network/power/roles'

export default {
  computed: {
    haha: {
      get () {
        return this.show
      },
      set (val) {
        this.show = !val
      }

    }
  },
  methods: {
    isshow () {
      this.$emit('isshow')
    },
    addRole () {
      this.$refs.addRoleRef.validate(val => {
        if (!val) return
        addRoleData(this.addRoleForm).then(res => {
          console.log(res)
          if (res.data.meta.status !== 201) return this.$message.error('添加角色失败')
          this.$emit('isshow')
          this.$emit('change')
        })
      })
    },
    addRoleClose () {
      this.$refs.addRoleRef.resetFields()
      this.addRoleForm.roleDesc = ''
    }
  },

  props: ['show'],
  data () {
    return {
      showis: this.show,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      }
    }
  }

}
</script>

<style>

</style>
