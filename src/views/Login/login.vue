<template>
  <div class="login">
    <div class="box">
      <img src="@/assets/3.png" alt="" />
      <el-form class="login_form"
       :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
           v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input  v-model="loginForm.password" prefix-icon="el-icon-s-goods" type="password"></el-input>
        </el-form-item>
        <div class="btns">
          <el-button type="primary" @click="loginIn">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { loging } from '../../network/login'

export default {
  data () {
    return {
      // 绑定val
      loginForm: {
        username: 'admin',
        password: '123456'
      },

      // 表单域校验
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm () {
      this.$refs.loginFormRef.resetFields()
    },
    loginIn () {
      this.$refs.loginFormRef.validate(val => {
        if (!val) return
        loging(this.loginForm).then(
          res => {
            console.log(res.data.data.token)
            if (res.data.meta.status !== 200) return this.$message.error('登录失败')
            this.$message.success(res.data.meta.msg)

            sessionStorage.setItem('token', res.data.data.token)
            this.$router.push('/home')
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
    background-image: url('../../assets/1.jpg');
    background-size: 100% 100%;
    height: 100%;
  .box {
    height: 300px;
    width: 450px;
    background-color: azure;
    border-radius: 10px;
    position: absolute;
    top: 120px;
    left: 200px;
    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      padding: 10px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
