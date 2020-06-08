<template>
  <div class="information">
    <el-container>
      <el-header>
        <Header logged="true" v-bind:uid="this.UID"  activeindex='2'></Header>
        <div v-if="Questionnaires.length">
        <div class="subtitle"><a style="margin-right:70%">问卷列表</a>
        <el-select
    v-if="!deleteState"
    v-model="value"
    multiple
    collapse-tags
    style=""
    placeholder="请选择">
    <el-option
      v-for="(questionnaire,index) in Questionnaires"
      :key="questionnaire._id"
      :label="questionnaire.title"
      :value="index">
    </el-option>
  </el-select>
  <el-button v-if="!deleteState" type="danger" style="" @click=deleteAll()>确认删除</el-button>
  <el-button v-if="deleteState" type="danger" style="margin-left:15%" @click=changeDeleteState()>批量删除</el-button>
        </div>
        </div>
        <el-divider></el-divider>
      </el-header>
      <el-main v-if="Questionnaires.length">
    <el-container v-for="questionnaire in Questionnaires" :key="questionnaire._id" class='container'>
    <el-card class="box-card" shadow="hover">
  <div slot="header" class="clearfix title" style='margin-bottom:2%'>
    <el-col :span="5">{{questionnaire.title}}</el-col>
    <el-col :span="7" class="add_padding">id:{{questionnaire._id}}</el-col>
    <el-col :span="3" v-if="questionnaire.state==1" class='el-icon-success add_padding' style='color:#3894FF'>已发布</el-col>
    <el-col :span="3" v-else-if="questionnaire.state==0" class='el-icon-error add_padding'>未发布</el-col>
    <el-col :span="3" v-else class='el-icon-error add_padding' style='color:#F56C6C'>已过期</el-col>
    <el-col :span="4">答卷份数：{{questionnaire.answeredNum}}</el-col>
    <el-col :span="5" class="add_padding">{{questionnaire.createdAt.substring(0,19).replace('T',' ')}}</el-col>
  </div>
  <div class='text'>
    <el-col :span="1"><img class='img' src="./../assets/imgs/icon-design@2x.png" /></el-col>
    <el-col :span="3"><el-button type="text" style="font-size:20px" @click="create()">问卷设计</el-button></el-col>
    <el-col :span="1"><img class='img' src="./../assets/imgs/icon-spread@2x.png" /></el-col>
    <el-col :span="3"><el-button type="text" style="font-size:20px" @click="share(questionnaire._id)">问卷发放</el-button></el-col>
    <el-col :span="1"><img class='img' src="./../assets/imgs/icon-data@2x.png" /></el-col>
    <el-col :span="10"><el-button type="text" style="font-size:20px;" @click="analysis(questionnaire._id)">问卷分析</el-button></el-col>
    <el-col :span="2"><el-button type="primary" icon="el-icon-view" @click="preview(questionnaire._id)">预览</el-button></el-col>
    <el-col :span="2"><el-button type="danger" icon="el-icon-delete" @click="drop(questionnaire._id)">删除</el-button></el-col>
  </div>
</el-card>
    </el-container>
      </el-main>
<el-main v-else>
<h1 v-if="seen" style="text-align:center">您还没有问卷噢，点击下方按钮去创建吧</h1>
<el-button v-if="seen" type="primary" class="createButton" @click="create ()">创建问卷</el-button>
</el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'information',
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default,
    Sidebar: require('./Sidebar.vue').default
  },
  data () {
    return {
      deleteState: 1,
      activeIndex: '2',
      UID: this.$router.history.current.params.UID,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      Questionnaires: [],
      value: [],
      seen: false
    }
  },
  mounted: function () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.getQuestionnaire()
    loading.close()
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
    changeDeleteState () {
      if (this.deleteState) { this.deleteState = 0 } else this.deleteState = 1
      this.value = []
    },
    deleteAll () {
      this.$confirm('此操作将永久删除所选问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sz = this.value.length
        for (let i = 0; i < sz; i++) {
          this.deleteTheQuestionnaire(this.Questionnaires[this.value[i]]._id)
        }
        this.changeDeleteState()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    drop (QID) {
      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTheQuestionnaire(QID)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteTheQuestionnaire (QID) {
      this.$axios
        .post('https://afo3wm.toutiao15.com/deleteQuesnaire', {
          questionnaireID: QID
        })
        .then(response => {
          this.getQuestionnaire()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    logout () {
      //! don't use arrow function here
      console.log(this.$router)
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    },
    getQuestionnaire: function () {
      this.$axios
        .get('https://afo3wm.toutiao15.com/getAllQuesnaires', {
          params: {
            UID: this.UID
          }
        })
        .then(response => {
          if (response.data.Questionaire.length === 0) {
            this.seen = true
          }
          this.Questionnaires = response.data.Questionaire
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    preview (QID) {
      this.$router.push({path: `/preview/${QID}`})
    },
    create () {
      this.$router.push(`/create/${this.UID}`)
    },
    share (QID) {
      this.$router.push(`/ShareQuestionnaire/${QID}/${this.UID}`)
    },
    analysis (QID) {
      this.$router.push(`/stat/${this.UID}/${QID}`)
    }
  }
}

</script>
<style scoped>
  .createButton{
    margin-top:3%;
  }
  .box{
    margin-left: 2%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }
  .title {
      text-align: left;
      margin-left: 2%;
      font-size: 20px;
    }
  .text1 {
    font-size: 26px;
    text-align: left;
    color:#AAAAAA;
  }
  .text2 {
    font-size: 26px;
    text-align: left;
    margin-left: 5%;
  }

  .item {
    margin-bottom: 10%;
    margin-left: 2%;
  }

  .text {
      margin-left: 2%;
      position:relative;
      text-align:left;
      font-size: 20px;
      color: #797575;
      margin-bottom:6%;
      margin-top:2%;
  }

  .box-card {
    margin-left: 4%;
    width:92%;
    margin-top: 1.5%;
    margin-bottom: 1.5%;
  }
  .subtitle {
    text-align: left;
    font-size: 20px;
    margin: 20px 25px;
  }
  .container {
        width: 100%;
  }
  .img {
      width:1.57em;
      height:2em;
  }
  .el-header {
    padding: 0px;
    height:120px;
  }
  .add_padding {
    padding: 3px 0 0 0
  }
  .el-divider--horizontal {
    margin: 24px 0 0 0;
  }
  .el-main {
    background-color: rgba(244, 243, 243, 0.97);
    width:100%;
    position: absolute;
    top:132px;
    left: 0;
    bottom:0;
  }
  .information{
    height: 100%;
    width:100%;
    margin:0;
    padding:0;
  }
</style>
