<template>
  <div class="register">
    <el-container
      v-bind:style="{ 'background-image': 'url(' + require('../assets/imgs/背景.jpg') + ')' }"
    >
      <el-header style="font-size: 20px; padding: 0px !important">
        <Header></Header>
      </el-header>
      <el-main>
        <el-row class="content">
          <el-col :xs="24" :sm="{span: 6,offset: 9}">
            <span class="title">用户注册</span>
            <el-row class="inputs">
              <el-form :model="formForRegister" status-icon :rules="rules" ref="formForRegister" v-loading="loading" element-loading-text="注册中">
                <el-form-item style="margin-top: 30px" prop="username">
                  <el-input
                    v-model="formForRegister.username"
                    prefix-icon="el-icon-user"
                    placeholder="用户名"
                    type="text"
                  ></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 30px" prop="password">
                  <el-input
                    v-model="formForRegister.password"
                    prefix-icon="el-icon-lock"
                    placeholder="请输入8-20位密码(包括数字和英文)"
                    type="text"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 30px" prop="secPassword">
                  <el-input
                    v-model="formForRegister.secPassword"
                    prefix-icon="el-icon-lock"
                    placeholder="确认密码"
                    type="text"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
              <el-button type="primary" @click="register('formForRegister')">注册</el-button>
              <div class="go-to-login">
                <span>
                  <router-link to="/login">已有账号，立即登录</router-link>
                </span>
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
  components: {
    Header: require('./Header.vue').default
  },
  data () {
    var checkName = (rule, value, callback) => {
      console.log('in check:')
      if (value === '') {
        return callback(new Error('用户名不能为空'))
      } else return callback()
    }
    var checkPw = (rule, value, callback) => {
      console.log('in check:')
      if (value === '') {
        return callback(new Error('密码不能为空'))
      } else {
        let alpha = ''
        let number = ''
        let length = value.length >= 8 && value.length <= 20
        console.log(value)
        for (let i = 0; i < value.length; i++) {
          if (/^[A-Z]$/i.test(value[i])) {
            alpha = 1
          }
          if (/[0-9]/g.test(value[i])) {
            number = 1
          }
          if (alpha & number & length) {
            return callback()
          }
        }
        console.log('alpha' + alpha + 'number' + number + 'length' + length)
        return callback(new Error('密码不符合要求'))
      }
    }
    var checkPw2 = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请确认密码'))
      } else if (value !== this.formForRegister.password) {
        return callback(new Error('两次输入密码不一致!'))
      } else {
        return callback()
      }
    }

    return {
      formForRegister: {
        username: '',
        password: '',
        secPassword: ''
      },
      UID: '',
      token: '',
      rules: {
        password: [{ validator: checkPw, trigger: 'blur' }],
        secPassword: [{ validator: checkPw2, trigger: 'blur' }],
        username: [{ validator: checkName, trigger: 'blur' }]
      },
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
    register (form) {
      this.loading = true
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.loading = false
          this.$alert('密码或用户名不符合要求', '注册失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.$axios
            .post('https://afo3wm.toutiao15.com/register', {
              username: this.formForRegister.username,
              encodedPassword: this.$md5(this.formForRegister.password)
            })
            .then(response => {
              this.loading = false
              console.log(response)
              if (response.data.success) {
                this.UID = response.data.UID
                this.token = response.data.token
                localStorage.setItem('user-token', this.token)
                localStorage.setItem('user-id', this.UID)
                this.$alert('从问调网开始，制作你的问卷吧！', '注册成功', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push({ path: `/create/${this.UID}` })
                  }
                })
              } else {
                this.$alert('用户已存在', '注册失败', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
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
