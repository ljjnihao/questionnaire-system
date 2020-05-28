<template>
  <div class="CheckQuestionnaire">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#000000">
           <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">个人信息</el-menu-item>
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
          <el-table :data="tableData" max-height="590" style="width: 500px;box-shadow: 1px -1px 7px #888888;" class="QuestionNaireTable">
            <el-table-column label="查看" width="100">
              <template slot-scope="scope">
                <i @click="handleCheck(scope.row.ansUid)" class="el-icon-view">前往</i>
              </template>
            </el-table-column>
            <el-table-column prop="No" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="admitTime" label="提交时间" width="300">
            </el-table-column>
          </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
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
    preview () {
      let routeData = this.$router.resolve({path: `/preview/${this.qid}`})
      window.open(routeData.href, '_blank')
    },
    handleCheck (ansUid) {
      let routeData = this.$router.resolve({path: `/filledcheck/${this.qid}/${ansUid}`})
      window.open(routeData.href, '_blank')
    },
    handleSelect2 (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/RecoveryProfile/${this.UID}/${this.qid}`})
      }
      if (key === '3') {
        this.$router.push({path: `/DataAnalysis/${this.UID}/${this.qid}`})
      }
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
  #myChartTitle{
    font-weight: 600;
    display: flex;
    flex-direction: row;
  }
  .el-icon-view:hover{
    color: blue;
    cursor: pointer;
  }
  .QuestionNaireTable{
    position: relative;
    left: 10%;
    font-size: 20px;
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
  #totalrecovery{
    position: relative;
    left: 20px;
    top: 4px;
    font-size: 10px;
    font-weight: 300;
    display: flex;
    flex-direction: row;
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
