<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
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
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(data.row)"></el-button>
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
  </div>
</template>

<script>
import { getUserList, userPut, addUserData, getUserData, editUserDataForm, deleteUserData } from '../../network/user'
export default {
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
      })
        .catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('已经取消了删除')
      const { data: res } = await deleteUserData(id)
      if (res.meta.status !== 200) return this.$message.error('删除失败')
      this.$message.success('删除成功')
      this.getData()
    }
  }
}
</script>

<style></style>
