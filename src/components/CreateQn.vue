<template>
  <div class="Relative">
    <el-container class="content">
      <div>
        <Header logged="true" v-bind:uid="this.UID" activeindex="1"></Header>
      </div>
      <el-header height="60px">
        <Subheader funcname="创建问卷" step="1" v-bind:uid="this.UID" v-bind:qid="this.QID" createBtn=true previewBtn=true></Subheader>
      </el-header>
      <el-container>
        <el-aside>
          <QuestionsBar></QuestionsBar>
        </el-aside>
        <el-main>
          <div style="font-weight: bold; font-size: 16px; text-align: left">{{title}}</div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default,
    QuestionsBar: require('./QuestionsBar.vue').default
  },
  data () {
    return {
      title: '问卷标题',
      QID: this.$route.params.QID,
      UID: this.$route.params.UID
    }
  },
  computed: {
  },
  methods: {
  },
  created: function () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    const url = 'https://afo3wm.toutiao15.com/getQuesnaire'
    const request = {
      'questionnaireID': this.QID
    }
    this.$axios
      .post(url, request)
      .then(response => {
        this.title = response.data.Questionnaire.title
      })
      .catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '与远程服务器的连接发生错误',
          type: 'error'
        })
        // this.$router.push('/non-existing')
      })
    loading.close()
  }
}
</script>

<style scoped>
.content {
  position: absolute;
  width: 100%;
  height: 100%;
}
.el-header {
  padding: 0px;
}
.el-aside {
  /* width: 150px !important; */
  background-color: white;
  left: 0;
  height: 100%;
}
.el-main {
  background-color: rgba(242, 242, 242, 1);
  padding: 20px;
}
.box-card {
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 150px;
  text-align: center;
}
</style>
