<template>
  <div class="RecoveryProfile">
    <el-container class="content">
      <div>
        <Header logged="true" v-bind:uid="this.UID" activeindex='2'></Header>
      </div>
      <el-header>
        <Subheader funcname="问卷分析" step="3" v-bind:uid="this.UID" v-bind:qid="this.qid"></Subheader>
      </el-header>
      <el-container>
        <el-aside>
          <Sidebar activeindex="1"></Sidebar>
        </el-aside>
        <el-main>
          <div style="font-weight: bold; font-size: 16px; text-align: left">{{title}}</div>
          <div style="text-align: left">回收总量：{{total}}</div>
          <el-card class="box-card">
            <div style="margin: 100px">
              <ve-line :data="chartData"></ve-line>
            </div>
          </el-card>
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
    Sidebar: require('./Sidebar.vue').default
  },
  data () {
    return {
      activeIndex: '2',
      title: '问卷标题',
      qid: this.$router.history.current.params.QID,
      UID: this.$router.history.current.params.UID,
      total: '',
      chartData: {
        columns: ['日期', '回收量'],
        rows: [
        ]
      }
    }
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
    let url = 'https://afo3wm.toutiao15.com/getAnswersNum'
    let request = {
      questionnaireID: this.qid
    }
    this.$axios
      .post(url, request)
      .then(response => {
        loading.close()
        this.total = response.data.total
        this.title = response.data.title
        for (let i = 0; i < response.data.status.length; i++) {
          const date = new Date(response.data.status[i].date)
          const realDate = date.getDate()
          const month = date.getMonth() + 1
          this.chartData.rows.push({
            '日期': month + '月' + realDate + '日',
            '回收量': response.data.status[i].number
          })
        }
      })
      .catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '与远程服务器的连接发生错误',
          type: 'error'
        })
        this.$router.push('/non-existing')
      })
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
  width: 150px !important;
  background-color: white;
  left: 0;
  height: 100%;
}
.el-main {
  background-color: rgba(242,242,242,1);
  padding: 50px;
}
.box-card {
  margin-top: 30px;
  text-align: center;
}
.stat {
  background-color: white;
  margin: 30px;
}
.table {
  margin: 100px
}
</style>
