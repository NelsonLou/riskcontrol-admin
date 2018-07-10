<template>
<div id="login">
  <div class="logo-info">
    <img class="logo" src="../assets/logo.png">
    <span class="name">维凯借贷管理系统 <br> www.weknet.com.cn</span>
  </div>
  <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" @keyup.enter.native="handleLogin" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" @keyup.enter.native="handleLogin" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :loading="logining" @click="handleLogin" type="primary" class="submit">登录</el-button>
    </el-form-item>
  </el-form>
  <p class="prompt">
    <span class="span">Username：admin</span>
    <span class="span">Password：111111</span>
  </p>
</div>
</template>
<script>
export default {
  name: 'login',
  data: () => ({
    logining: false,
    loginForm: {
      username: '',
      password: ''
    },
    loginRules: {
      username: [{
        required: true,
        message: '请输入用户名',
        trigger: 'blur'
      }],
      password: [{
        required: true,
        message: '请输入密码',
        trigger: 'blur'
      }]
    }
  }),
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true
          // 请求参数
          const para = {
            admin_name: this.loginForm.username,
            admin_password: this.loginForm.password
          }
          this.axios.post(this.$api.system.login, para).then(res => {
            this.logining = false
            const {
              code,
              msg,
              data
            } = res.data
            if (code === 1) {
              // 获取请求返回数据
              localStorage.setItem('user', JSON.stringify(data))
              // 配置默认TOKEN
              this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
              this.$router.push('/dashboard') // 路由指向首页
            } else {
              this.$message.error(msg)
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 320px;
    height: 320px;
    margin: -160px 0 0 -160px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    .logo-info {
        height: 64px;
        margin-bottom: 22px;
        text-align: center;
        color: #444;
        .name {
            position: relative;
            bottom: 11px;
            display: inline-block;
        }
    }
    .submit {
        width: 100%;
    }
    .prompt {
        text-align: center;
        color: #888;
        .span {
            margin: 0 10px;
            color: #ccc;
            font-family: sans-serif;
            font-size: 14px;
        }
    }
}
</style>
