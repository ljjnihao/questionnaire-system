<template>
  <div class="register">
    <el-container  v-bind:style="{ 'background-image': 'url(' + require('../assets/imgs/背景.jpg') + ')' }">
      <el-header style="text-align: left; font-size: 20px; padding: 0px !important">
        <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">消息中心</el-menu-item>
          <el-menu-item index="4" style="font-size: 20px">个人信息</el-menu-item>
      </el-menu>

      </el-header>

      <el-main>
        <el-row class="content">
          <el-col :xs="24" :sm="{span: 6,offset: 9}">
            <span class="title">用户注册</span>
            <el-row class="inputs">
              <el-form :model="formForRegister" :label-position="left">
                <el-form-item style="margin-top: 30px">
                    <el-input v-model="formForRegister.username" prefix-icon="el-icon-user" placeholder="用户名" type="text"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 30px">
                    <el-input v-model="formForRegister.password" prefix-icon="el-icon-lock" placeholder="请输入8-20位密码" type="text" show-password="false"></el-input>
                </el-form-item>
                 <el-form-item style="margin-top: 30px">
                    <el-input v-model="formForRegister.secPassword" prefix-icon="el-icon-lock" placeholder="确认密码" type="text" show-password="false"></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="register">注册</el-button>
              <div class="go-to-login">
                <span><router-link to="/login">已有账号，立即登录</router-link></span>
              </div>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data () {
    return {
      formForRegister: {
        username: '',
        password: '',
        secPassword: ''
      },
      UID: ''
    }
  },
  methods: {
    register () {
      if (this.secPassword === this.password) {
        this.$axios.post('https://af48ab.toutiao15.com/register', {
          username: this.formForRegister.username,
          password: this.formForRegister.password
        })
          .then((response) => {
            console.log(response)
            this.UID = response.data.UID
            const uid = this.UID
            this.$alert('从问调网开始，制作你的问卷吧！', '注册成功', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({path: `/create/${uid}`})
              }
            })
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        // invalid
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-container {
  background-size: 100% 100%;
  height: 100%;
  position: absolute;
  width: 100%
}
.title {
  color: #409EFF;
  font-size: 30px;
  margin-top: 40px;
}
.content {
  margin-top: 120px;
}
.el-col {
  background-color: white;
  padding: 40px;
  border-radius: 5px;
}

.el-button {
  margin-top: 20px;
  width: 100px;
}
.go-to-login {
  color: blue;
  font-size: 12px;
  margin-top: 20px;
}
</style>
