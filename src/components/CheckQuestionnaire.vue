<template>
  <div class="CheckQuestionnaire">
    <el-container class="content">
       <div>
          <Header logged="true" v-bind:uid="this.UID" activeindex="2"></Header>
        </div>
      <el-header height="80px">
        <Subheader funcname="问卷分析" step="3" v-bind:uid="this.UID" v-bind:qid="this.qid"></Subheader>
      </el-header>
      <el-container>
        <el-aside>
            <Sidebar activeindex="2"></Sidebar>
        </el-aside>
         <el-main>
            <div style="font-weight: bold; font-size: 16px; text-align: left">{{title}}</div>
            <div style="text-align: left">回收总量：{{total}}</div>
               <el-card class="box-card">
                 <div style="margin: 100px">
                  <el-table :data="tableData" max-height="590" border width="100%">
                    <el-table-column label="查看" align="center">
                      <template slot-scope="scope">
                        <i @click="handleCheck(scope.row.ansUid)" class="el-icon-view">前往</i>
                      </template>
                    </el-table-column>
                    <el-table-column prop="No" label="序号" align="center">
                    </el-table-column>
                    <el-table-column prop="admitTime" label="提交时间" align="center">
                    </el-table-column>
                  </el-table>
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
      total: null,
      qid: this.$router.history.current.params.QID,
      UID: this.$router.history.current.params.UID,
      tableData: []
    }
  },
  methods: {
    getAnswersNum: function () {
      return this.$axios({
        url: 'https://afo3wm.toutiao15.com/getAnswersNum',
        method: 'get',
        params: {
          questionnaireID: this.qid
        }
      })
    },
    getAns: function () {
      return this.$axios({
        url: 'https://afo3wm.toutiao15.com/getAnsByQnID',
        method: 'get',
        params: {
          questionnaireID: this.qid
        }
      })
    },
    handleCheck (ansUid) {
      let routeData = this.$router.resolve({path: `/filledcheck/${this.qid}/${ansUid}`})
      window.open(routeData.href, '_blank')
    }
  },
  created: function () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$axios.all([this.getAnswersNum(), this.getAns()]).then(this.$axios.spread((response1, response2) => {
      this.title = response1.data.title
      this.total = response1.data.total
      for (let i = 0; i < this.total; i++) {
        this.tableData.push({
          ansUid: response2.data.result[i].answerUID,
          No: i + 1,
          admitTime: response2.data.result[i].answers[0].AnsCreateAt.substring(0, 10)
        })
      }
      loading.close()
    }))
      .catch((error) => {
        console.log(error)
        loading.close()
        this.$message({
          showClose: true,
          message: '与远程服务器的连接发生错误',
          type: 'error'
        })
        this.$router.push('/non-existing')
      })
  },
  mounted: function () {
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
  /* margin: 0px; */
}
.el-aside {
  width: 150px !important;
  background-color: white;
  left: 0;
  height: 100%;
}
.el-main {
  background-color: rgba(242,242,242,1);
  padding: 20px;
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
