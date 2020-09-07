<template>
  <div>
    <main-item>
      <template #top>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="showDialog = true">添加角色</el-button>
            </div></el-col
          >
        </el-row>
      </template>
      <template #main>
        <el-table :data="rolesList" border stripe>
          <!-- 渲染下拉表 -->
          <power></power>
          <!-- 主体 -->
          <el-table-column type="index"></el-table-column>
          <el-table-column label="角色名称" prop="roleName"></el-table-column>
          <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
          <el-table-column label="操作" width="260px">
            <template v-slot="asd">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRolesData(asd.row.id)"> </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoles(asd.row.id)">删除</el-button>
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightList(asd.row)">分配权限</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </main-item>
    <!-- 添加角色 -->
    <add :show="showDialog" @isshow="showDialog = false" @change="haha"></add>
    <!-- 修改 -->
    <el-dialog title="修改角色信息" :visible.sync="rolesdialogVisible" width="50%">
      <edit-role :model="editRolesList" @cancel="cancel" @editRoles="editRoles" ref="editRoleRef"></edit-role>
    </el-dialog>
    <!-- 分配角色权限 -->
    <el-dialog title="分配角色权限" :visible.sync="rightListdialogVisible" width="30%" @close="setRight">
      <tree :getRolesRightsList="getRolesRightsList" @rightListcancel="rightscancel" @allotRight="allotRight" :roleId='roleId' :keyId="defKeys"></tree>
    </el-dialog>
  </div>
</template>

<script>
import add from '@/views/Power/children/roleDialog'
import editRole from '@/views/Power/children/editRole'
import power from '@/views/Power/children/power'
import tree from '@/views/Power/children/tree'
import MainItem from '../../../comomon/main'
import { getRoleById, editRolesInfo, delRolesData, getRightList } from '@/network/power/roles'
export default {
  props: {
    rolesList: {
      type: Array
    }
  },
  components: {
    MainItem,
    add,
    editRole,
    power,
    tree
  },

  data () {
    return {
      showDialog: false,
      rolesdialogVisible: false,
      rightListdialogVisible: false,
      editRolesList: {},
      getRolesRightsList: {},
      defKeys: [],
      roleId: ''
    }
  },
  methods: {
    haha () {
      this.$emit('change')
    },
    cancel () {
      this.rolesdialogVisible = false
    },

    async editRolesData (id) {
      const { data: res } = await getRoleById(id)
      if (res.meta.status !== 200) return this.$message.error('获取信息失败')
      //  获取到得数据给私有数据
      this.editRolesList = res.data
      this.rolesdialogVisible = true
    },
    editRoles () {
      // 表单域验证
      this.$refs.editRoleRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await editRolesInfo(this.editRolesList)
        if (res.meta.status !== 200) return this.$message.error('修改失败')
        this.$emit('change')
      })
      this.rolesdialogVisible = false
    },

    async deleteRoles (id) {
      const result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (result !== 'confirm') return this.$message.info('取消了删除')
      const { data: res } = await delRolesData(id)
      if (res.meta.status !== 200) return this.$message('删除失败')
      this.$message.success('删除成功')
      this.$emit('change')
    },
    // 分配权限列表
    async showRightList (role) {
      this.roleId = role.id
      const { data: res } = await getRightList()
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败')
      this.getRolesRightsList = res.data
      this.getLeafList(role, this.defKeys)
      console.log(this.getRolesRightsList)
      this.rightListdialogVisible = true
    },
    // 获取三级节点的额id
    getLeafList (node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => this.getLeafList(item, arr))
    },
    setRight () {
      this.defKeys = []
    },
    rightscancel () {
      this.rightListdialogVisible = false
    },
    allotRight () {
      this.rightListdialogVisible = false
      this.$emit('change')
    }

  }
}
</script>

<style lang="less" scoped></style>
