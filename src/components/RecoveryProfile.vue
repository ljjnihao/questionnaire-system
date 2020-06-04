<template>
  <div class="RecoveryProfile">
    <el-container class="content">
      <el-header>
        <Header logged="true" v-bind:uid="this.UID" activeindex='2'></Header>
      </el-header>
      <el-header height="80px">
        <Subheader funcname="问卷分析" step="3"></Subheader>
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
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
var echarts = require('echarts')
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
      option: {
        title: {
          text: '问卷回收量'
        },
        tooltip: {},
        legend: {
          data: ['回收量']
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [
          {
            name: '回收量',
            type: 'line',
            data: []
          }
        ]
      }
    }
  },
  methods: {
  },
  created: function () {
    let url = 'https://afo3wm.toutiao15.com/getAnswersNum'
    let request = {
      questionnaireID: this.qid
    }
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$axios
      .post(url, request)
      .then(response => {
        this.total = response.data.total
        this.title = response.data.title
        for (let i = 0; i < response.data.status.length; i++) {
          this.option.xAxis.data.push(
            response.data.status[i].date.substring(0, 10)
          )
          this.option.series[0].data.push(response.data.status[i].number)
        }
        let myChart = echarts.init(document.getElementById('main'))
        this.$nextTick(() => {
          myChart.setOption(this.option)
          loading.close()
        })
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
