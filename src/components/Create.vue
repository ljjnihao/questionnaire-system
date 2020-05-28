<template>
  <div>
    <div class="head">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="width:100vw"
      >
        <el-menu-item index="0">
          <div class="logo">LOGO</div>
        </el-menu-item>
        <el-menu-item index="1" class="title">创建问卷</el-menu-item>
        <el-menu-item index="2" class="title">我的问卷</el-menu-item>
        <el-menu-item index="3" class="title">消息中心</el-menu-item>
        <el-menu-item index="4" class="title">个人信息</el-menu-item>
        <el-menu-item index="4" style="float: right;">
          <img style="border-radius: 100%;width: 50px;height: 50px" :src="url" alt class="imgs" />
        </el-menu-item>
        <el-menu-item style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <el-container>
        <el-header>
          <div class="tou">
            <div style="font-size:1vw">编辑问卷</div>
            <div style="width:50vw">
              <el-steps :active="1">
                <el-step title="编辑" icon="el-icon-edit"></el-step>
                <el-step title="发布" icon="el-icon-upload"></el-step>
                <el-step title="分析" icon="el-icon-picture"></el-step>
              </el-steps>
            </div>
            <div>
              <el-button type="primary" plain icon="el-icon-view">预览</el-button>
              <el-button type="primary" icon="el-icon-check">完成编辑</el-button>
            </div>
          </div>
        </el-header>
        <el-container style="padding-top: 1.5vw;">
          <el-main style="background-color: #e9eef3;">
            <div>
              <div>
              <el-form :model = "formForQuesionnaire" status-icon :rules="rules" ref="formForQuesionnaire" v-loading="loading" element-loading-text="创建中">
                <el-form-item style="    font-size: 1.5vw;"><el-input v-model="formForQuesionnaire.title" placeholder="请输入问卷标题"></el-input></el-form-item>
                <el-form-item style="    font-size: 1.5vw;"><el-input v-model="formForQuesionnaire.description" placeholder="请输入问卷描述"></el-input></el-form-item>
                <el-form-item style="    font-size: 1vw;">感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</el-form-item>
              </el-form>
              <el-button type="primary" @click="createquestionnaire('formForQuesionnaire')">提交问卷标题</el-button>
            </div>
              <!-- 显示题目 -->
            </div>
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      formForQuesionnaire: {
        title: '',
        description: ''
      },
      value: '',
      UID: this.$router.history.current.params.UID,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      //! don't use arrow function here
      console.log(this.$router)
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    },
    createquestionnaire (form) {
      this.loading = true
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$alert('问卷标题或描述不符合要求', '创建失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.$axios
            .post('https://afo3wm.toutiao15.com/createQuesnaire', {
              title: this.formForQuesionnaire.title,
              description: this.formForQuesionnaire.description,
              UID: this.$router.history.current.params.UID
            })
            .then(response => {
              this.loading = false
              console.log(response)
              this.questionnaireID = response.data.questionnaireID
              this.$alert('开始创建你的问题吧', '创建问卷成功', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push({ path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/one` })
                }
              })
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head ul {
  width: 100vw;
}
.logo {
  color: #409eff;
  font-size: 2vw;
}
.imgs {
  width: 3vw;
  border-radius: 50%;
}
.title {
  font-size: 1vw;
}
.tou {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1vw;
}
.hyc {
  text-decoration:none;
  color: black;
}
</style>
