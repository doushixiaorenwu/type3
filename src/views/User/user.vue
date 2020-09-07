<template>
  <div>
    <breadcrumb-user />
    <el-card class="box-card">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select" v-model="queryInfo.query" clearable @clear="getData">
            <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="warning" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 主体 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="username" label="姓名" width="180"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template v-slot="abs">
            <el-switch v-model="abs.row.mg_state" @change="userStateChanged(abs.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" v-slot="asd">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUserData(asd.row.id)"> </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUserData(asd.row.id)"></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(asd.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryInfo.pagenum"
        :page-sizes="[10, 15, 20, 30]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close="dialogVisibleClose">
      <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRul">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户 -->
    <el-dialog title="修改用户" :visible.sync="editDialog" width="30%" @close="editDialogVisibleClose">
      <el-form ref="editForm" :model="editInfo" label-width="80px" :rules="addFormRul">
        <el-form-item label="用户名" disabled>
          <el-input v-model="editInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editInfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="delUserData">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色权限 -->
    <el-dialog title="分配角色" :visible.sync="setRoledialogVisible" width="50%" @close="roleClose">
      <div>
        <p>当前用户姓名 :{{&nbsp; userInfo.username }}</p>
        <p>当前用户角色 :{{&nbsp; userInfo.role_name }}</p>
        <p>
          分配新角色
          <el-select v-model="selectRole" placeholder="请选择">
            <el-option v-for="item in getRoleData" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumbUser from '../../components/content/breadcrumb/user'

import { getUserList, userPut, addUserData, getUserData, editUserDataForm, deleteUserData, getRoleList, allotRole } from '../../network/user'
export default {
  components: {
    breadcrumbUser
  },
  data () {
    const checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (!regMobile.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      }
      callback()
    }
    return {
      editInfo: {},
      setRoledialogVisible: false,
      dialogVisible: false,
      editDialog: false,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userInfo: {},
      // 获取的角色信息
      getRoleData: [],
      // 选中的角色信息
      selectRole: '',
      addFormRul: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入登录名称', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getUserList(this.queryInfo).then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('获取列表失败')
        this.userList = res.data.data.users
        this.total = res.data.data.total
      })
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getData()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getData()
    },
    userStateChanged (item) {
      userPut(item).then((res) => {
        if (res.data.meta.status !== 200) {
          item.mg_state = !item.mg_state
          return this.$message.error('更新用户状态失败')
        }
      })
    },
    dialogVisibleClose () {
      this.$refs.addForm.resetFields()
    },
    editDialogVisibleClose () {
      this.$refs.editForm.resetFields()
    },
    addUser () {
      this.$refs.addForm.validate((val) => {
        if (!val) return
        addUserData(this.addForm).then((res) => {
          if (res.data.meta.status !== 201) return this.$message.error('添加用户失败')
          this.$message.success('添加用户成功')
          this.dialogVisible = false
          this.getData()
        })
      })
    },
    editUserData (id) {
      this.editDialog = true
      getUserData(id).then((res) => {
        if (res.data.meta.status !== 200) return this.$message.error('查询失败')
        this.editInfo = res.data.data
      })
    },
    editUserDataForm () {
      this.$refs.editForm.validate((val) => {
        if (!val) return
        editUserDataForm(this.editInfo).then((res) => {
          if (res.data.meta.status !== 200) return this.$message.error('添加用户失败')
          this.$message.success('修改用户成功')

          this.editDialog = false
          this.getData()
        })
      })
    },
    async delUserData (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((err) => err)
      if (confirmResult !== 'confirm') return this.$message.info('已经取消了删除')
      const { data: res } = await deleteUserData(id)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getData()
    },

    // 获取角色信息
    async setRole (data) {
      this.userInfo = data
      const { data: res } = await getRoleList()
      if (res.meta.status !== 200) return this.$message.error('获取信息失败')
      console.log(res)
      this.getRoleData = res.data

      this.setRoledialogVisible = true
    },
    // 更新管理权限
    async saveRoleInfo () {
      if (!this.selectRole) return this.$message.error('请选择要分配的角色')
      const { data: res } = await allotRole(this.userInfo.id, this.selectRole)
      if (res.meta.status !== 200) return this.$message.error('更新数据失败')
      this.getData()
      this.$message.success('这个接口有问题')
      this.setRoledialogVisible = false
    },
    // 关闭的对话框清除内容
    roleClose () {
      this.selectRole = ''
      this.userInfo = ''
    }
  }
}
</script>

<style>
p {
  margin: 20px;
}
</style>
