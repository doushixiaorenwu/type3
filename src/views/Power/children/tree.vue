<template>
  <div>
    <el-tree :data="getRolesRightsList" v-if="getRolesRightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="keyId" ref="treeRsf"> </el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button  @click="rightListdialogVisible">取 消</el-button>
      <el-button type="primary" @click="allotRight">确 定</el-button>
    </span>
  </div>
</template>

<script>
import { setRights } from '@/network/power/roles'

export default {
  props: ['getRolesRightsList', 'keyId', 'roleId'],
  data () {
    return {
      treeProps: {
        label: 'authName',
        children: 'children'
      }

    }
  },
  methods: {
    rightListdialogVisible () {
      this.$emit('rightListcancel')
    },
    allotRight () {
      const keys = [
        ...this.$refs.treeRsf.getCheckedKeys(),
        ...this.$refs.treeRsf.getHalfCheckedNodes()
      ]
      const idStr = keys.join(',')
      setRights(this.roleId, idStr).then(res => {
        if (res.data.meta.status !== 200) return this.$message.error('分配权限失败')
        this.$emit('allotRight')
      })
    }
  }
}
</script>

<style scoped>

</style>
