<template>
  <div class="register">
    <el-container
      v-bind:style="{ 'background-image': 'url(' + require('../assets/imgs/login_bg.jpg') + ')'}"
    >
      <el-header style="text-align: left; font-size: 20px; padding: 0px !important">
        <Header v-bind:logged="false"></Header>
      </el-header>
      <el-main>
        <el-row class="content">
          <el-col :xs="24" :sm="24" :md="24" :lg="{span: 8, offset: 16}" :xl="{span: 8, offset: 12}">
            <div style="text-align: left">
              <span class="title" style="font-size: 40px">欢迎使用,</span>
            </div>
            <div style="text-align: left">
              <span class="title" style="font-size: 40px; font-weight: bold">在线问卷调研系统</span>
            </div>
            <el-form label-width="auto" :model="formForLogin" v-loading="loading" element-loading-text="登录中">
              <el-form-item label="账号：" style="font-weight: bold; margin-top: 30px">
                <el-input v-model="formForLogin.username" placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码：" style="font-weight: bold; margin-top: 30px">
                <el-input v-model="formForLogin.password" placeholder="请输入密码" show-password></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" round @click="login">登录</el-button>
            <div class="go-to-register">
              <el-checkbox v-model="rememPw">记住密码</el-checkbox>
              <span style="float: right">
                <router-link to="/findPassword">忘记密码</router-link>
              </span>
            </div>
            <div class="go-to-register">
              <span>
                没有账号？去
                <router-link to="/register">注册</router-link>
              </span>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {
    Header: require('./Header.vue').default
  },
  data () {
    return {
      formForLogin: {
        username: '',
        password: ''
      },
      rememPw: true,
      UID: '',
      token: '',
      loading: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/create/${this.UID}`})
      }
      if (key === '2') {
        this.$router.push({path: `/myQuestionnaire/${this.UID}`})
      }
      if (key === '3') {
        this.$router.push({path: `/information/${this.UID}`})
      }
    },
    login () {
      this.loading = true
      this.$axios
        .post('https://afo3wm.toutiao15.com/loginWIthPassword', {
          username: this.formForLogin.username,
          encodedpassword: this.$md5(this.formForLogin.password)
        })
        .then(response => {
          this.loading = false
          console.log(response.data)
          if (response.data.success) {
            this.UID = response.data.UID
            this.token = response.data.token
            if (this.rememPw) {
              localStorage.setItem('user-token', this.token)
              localStorage.setItem('user-id', this.UID)
            } else {
              sessionStorage.setItem('user-temp-token', this.token)
              sessionStorage.setItem('user-temp-id', this.UID)
            }

            // ! Use a closure to capture the correct "this" or using arrow function
            this.$router.push({ path: `/create/${this.UID}` })
          } else {
            this.$message('用户名或密码错误')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  background-size: 100% 100% no-repeat;
  background-repeat: no-repeat;
  height: 100%;
  position: absolute;
  width: 100%;
}
.title {
  color: #409eff;
  font-size: 30px;
  margin-top: 40px;
}
.content {
  margin-top: 120px;
}
.el-col {
  background-color: white;
  padding: 40px;
  border-radius: 20px;
}
.el-button {
  margin-top: 20px;
  width: 200px;
}
.go-to-register {
  font-size: 12px;
  text-align: left;
  margin-top: 20px;
}
</style>
