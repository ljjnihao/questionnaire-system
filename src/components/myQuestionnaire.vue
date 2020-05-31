<template>
  <div class="information">
    <el-container>
      <el-header>
        <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000000" @select="handleSelect">
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">个人信息</el-menu-item>
          <div class="demo-image">
               <el-image style="border-radius: 100%;width: 50px;height: 50px; float: right; margin-right: 100px" :src="url"></el-image>
          </div>

        <el-menu-item style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </el-menu-item>
        </el-menu> -->
        <Header logged="true" v-bind:uid="this.UID"  activeindex='2'></Header>
      </el-header>
      <el-main>
<div class="subtitle">
    <span>问卷列表</span>
</div>
    <el-container v-for="questionnaire in Questionnaires" :key="questionnaire._id" class='container'>
    <el-card class="box-card">
  <div slot="header" class="clearfix title" style='margin-bottom:2%'>
    <el-col :span="6" >{{questionnaire.title}}</el-col>
    <el-col :span="6">id:{{questionnaire._id}}</el-col>
    <el-col :span="3" v-if="questionnaire.state" class='el-icon-success' style='color:#3894FF'>已发布</el-col>
    <el-col :span="3" v-else class='el-icon-error'>未发布</el-col>
    <el-col :span="3">答卷份数：{{questionnaire.answeredNum}}</el-col>
    <el-col :span="6">{{questionnaire.createdAt}}</el-col>
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
      activeIndex: '2',
      UID: this.$router.history.current.params.UID,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      Questionnaires: []
    }
  },
  mounted: function () {
    this.getQuestionnaire()
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
          this.Questionnaires = response.data.Questionaire
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    preview (QID) {
      this.$router.push({path: `/preview/${QID}`})
    },
    drop (QID) {
      console.log(QID)
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
    create () {
      this.$router.push(`/create/${this.UID}`)
    },
    share (QID) {
      this.$router.push(`/ShareQuestionnaire/${QID}/${this.UID}`)
    },
    analysis (QID) {
      this.$router.push(`/DataAnalysis/${this.UID}/${QID}`)
    }
  }
}

</script>
<style>
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
      margin-bottom: 1%;
      margin-left:3%;
      text-align: left;
      font-size:20px
  }
  .container {
        width: 100%;
        background-color: rgba(244, 243, 243, 0.97);
        border: 0.06em solid rgba(187, 187, 187, 1);
  }
  .img {
      width:1.57em;
      height:2em;
  }
  .el-header {
    padding: 0px
  }
</style>
