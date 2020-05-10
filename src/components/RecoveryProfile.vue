<template>
  <div class="RecoveryProfile">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#000000">
          <el-menu-item id="logo" style="color: #409EFF;">LOGO</el-menu-item>
          <el-menu-item index="1" class="title-item">创建问卷</el-menu-item>
          <el-menu-item index="2" class="title-item">我的问卷</el-menu-item>
          <el-menu-item index="3" class="title-item">消息中心</el-menu-item>
          <el-menu-item index="4" class="title-item">个人信息</el-menu-item>
          <el-menu-item class="title-item">
            <div class="demo-image">
              <div class="block">
                {{ fit }}
                <el-image :src="url" class="profilePhoto"></el-image>
              </div>
            </div>
          </el-menu-item>
        </el-menu>
      </el-header>
    </el-container>
    <el-container>
      <el-header style="position: relative;top: 10px">
        <el-row>
          <el-col :span="2"><div class="grid-content bg-purple bodyhead">问卷分析</div></el-col>
          <el-col :span="12" :offset="2">
            <div class="grid-content bg-purple-light steps">
              <el-steps :active="3">
                <el-step title="编辑" icon="el-icon-edit"></el-step>
                <el-step title="发布" icon="el-icon-upload"></el-step>
                <el-step title="分析" icon="el-icon-s-data"></el-step>
              </el-steps>
            </div>
          </el-col>
          <el-col :span="1" :offset="6">
            <div class="grid-content bg-purple">
              <el-button type="primary" plain icon="el-icon-view" @click="preview">预览</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
        <el-container style="padding-top: 1.5vw;">
      <el-aside width="15vw" style="background-color: #d3dce6;text-align: center;">
        <el-menu  default-active="2"
                class="el-menu-vertical-demo" @select="handleSelect2">
          <el-menu-item index="1">
            <span slot="title" class="hyc">回收概况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" class="hyc">查看问卷</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" class="hyc">数据分析</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="display-flex">
        <span id="myChartTitle">{{title}}<span id="totalrecovery">回收总量：{{total}}</span> </span>
        <div id="main" style="width: 100%;height:400px;position:relative;top:10px;"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
var echarts = require('echarts')
export default {
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
        series: [{
          name: '回收量',
          type: 'line',
          data: []
        }]
      }
    }
  },
  methods: {
    preview () {
      let routeData = this.$router.resolve({path: `/preview/${this.qid}`})
      window.open(routeData.href, '_blank')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect2 (key, keyPath) {
      if (key === '2') {
        this.$router.push({path: `/CheckQuestionnaire/${this.UID}/${this.qid}`})
      }
      if (key === '3') {
        this.$router.push({path: `/DataAnalysis/${this.UID}/${this.qid}`})
      }
    }
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
    this.$axios.post(url, request).then(response => {
      this.total = response.data.total
      this.title = response.data.title
      for (let i = 0; i < response.data.status.length; i++) {
        this.option.xAxis.data.push(response.data.status[i].date.substring(0, 10))
        this.option.series[0].data.push(response.data.status[i].number)
      }
      let myChart = echarts.init(document.getElementById('main'))
      this.$nextTick(() => {
        myChart.setOption(this.option)
        loading.close()
      }
      )
    })
      .catch((error) => {
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
  #main{
    background-color: white;
  }
  #myChartTitle{
    font-weight: 600;
    display: flex;
    flex-direction: row;
  }
  #totalrecovery{
    position: relative;
    left: 20px;
    top: 4px;
    font-size: 10px;
    font-weight: 300;
    display: flex;
    flex-direction: row;
  }
  .QuestionNaireTitle{
    float:left;
  }
  .display-flex{
    display: flex;
    flex-direction: column;
    float: left;
    background-color: #F3F5F6;
  }
  .asidefont{
    font-size: 22px;
  }
  .bodyhead{
    font-size: 22px;
    position: relative;
    left: 20px;
    top: 7px;
  }
  .el-menu-demo{
    text-color: "#000000";
  }
  .title-item{
    font-size: 20px;
    text-color: "#000000";
  }
  #logo{
    font-size: 35px;
    cursor: default;
  }
  .demo-image{
    width: 60px;
    height: 60px;
    position: relative;
    left: 655px;
  }
  .profilePhoto{
    border-radius: 100%;
  }
</style>
