<template>
  <div>
    <div>
      <Header v-bind:logged="true" v-bind:uid=this.UID  v-bind:activeindex=1></Header>
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
          <el-main>
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
  components: {
    Header: require('./Header.vue').default
  },
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
      var order = 1
      this.$router.push(order)
      this.loading = true
      this.$refs[form].validate(valid => {
        if (!valid) {
          this.$alert('问卷标题或描述不符合要求', '创建失败', {
            confirmButtonText: '确定'
          })
        } else {
          this.$axios
            .post('https://afo3wm.toutiao15.com/checkTitle', {
              title: this.formForQuesionnaire.title,
              UID: this.$router.history.current.params.UID
            })
            .then(response => {
              this.loading = false
              console.log(response.data)
              if (response.data.state === 'vaild') {
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
              } else {
                this.$alert('该问卷已存在', '创建问卷失败', {
                  confirmButtonText: '确定'
                })
              }
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
