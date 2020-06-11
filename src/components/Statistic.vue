<template>
  <div id="statistic">
    <el-container class="content">
        <el-header v-bind:activeindex="2">
          <Header logged="true" v-bind:uid="this.UID"></Header>
        </el-header>
      <el-header>
        <Subheader funcname="问卷分析" step="3" v-bind:uid="this.UID" v-bind:qid="this.qid"></Subheader>
      </el-header>
      <el-container>
        <el-aside>
          <Sidebar activeindex="3"></Sidebar>
        </el-aside>
        <el-main>
            <div style="font-weight: bold; font-size: 16px; text-align: left">{{title}}</div>
            <div style="text-align: left">回收总量：{{total}}</div>
            <div class="stat">
                <div v-for="(item,index) in processed" :key=index class="item">
                    <div v-if="item.type==0 || item.type == 1 || item.type == 2 || item.type == 3">
                        <div style="font-weight: bold; text-align: left">{{index+1}}. {{item.title}}</div>
                        <el-card class="box-card">
                          <el-table :data="tabeldata[index]" max-height="590" style="width: 100%">
                          <el-table-column prop="choice" label="选项" width="150">
                          </el-table-column>
                          <el-table-column prop="choiceNum" label="小计" width="150">
                          </el-table-column>
                          <el-table-column label="比例" width="500">
                              <template slot-scope="scope">
                              <el-progress :percentage="scope.row.Percent"></el-progress>
                              </template>
                          </el-table-column>
                          </el-table>
                        </el-card>
                        <el-radio-group v-model="graph[index]" style="margin-bottom: 30px; margin-top: 30px;">
                          <el-radio-button label="histogram">柱状图</el-radio-button>
                          <el-radio-button label="pie">饼状图</el-radio-button>
                          <el-radio-button label="bar">条形图</el-radio-button>
                        </el-radio-group>

                        <el-card class="box-card">
                          <ve-histogram v-if="graph[index] == 'histogram'" :data="chartData[index]"></ve-histogram>
                          <ve-pie v-if="graph[index] == 'pie' || graph[index] == null " :data="chartData[index]"></ve-pie>
                          <ve-bar v-if="graph[index] == 'bar'" :data="chartData[index]"></ve-bar>
                        </el-card>
                    </div>
                     <div v-if="item.type==4 || item.type == 5 || item.type == 6 || item.type == 7 ||  item.type == 10 ||  item.type == 11">
                        <div style="font-weight: bold; text-align: left">{{index+1}}. {{item.title}}</div>
                        <el-card class="box-card">
                          <el-table :data="tabeldata[index]" max-height="590" style="width: 100%">
                            <el-table-column prop="No" label="序号" width="150">
                            </el-table-column>
                            <el-table-column prop="fintime" label="提交答卷时间" width="150">
                            </el-table-column>
                            <el-table-column prop="answer" label="答案文本" width="500">
                            </el-table-column>
                          </el-table>
                        </el-card>
                    </div>
                    <div v-if="item.type==8 || item.type == 9">
                        <div style="font-weight: bold; text-align: left">{{index+1}}. {{item.title}}</div>
                        <div style="font-weight: bold; text-align: left">评价值: {{item.avg}}</div>
                        <el-card class="box-card">
                          <el-table :data="tabeldata[index]" max-height="590" style="width: 100%">
                          <el-table-column prop="mark" label="分数" width="150">
                          </el-table-column>
                          <el-table-column prop="marknum" label="小计" width="150">
                          </el-table-column>
                          <el-table-column label="比例" width="500">
                              <template slot-scope="scope">
                              <el-progress :percentage="scope.row.Percent"></el-progress>
                              </template>
                          </el-table-column>
                          </el-table>
                        </el-card>
                        <el-radio-group v-model="graph[index]" style="margin-bottom: 30px; margin-top: 30px;">
                          <el-radio-button label="histogram">柱状图</el-radio-button>
                          <el-radio-button label="pie">饼状图</el-radio-button>
                          <el-radio-button label="bar">条形图</el-radio-button>
                        </el-radio-group>

                        <el-card class="box-card">
                          <ve-histogram v-if="graph[index] == 'histogram'" :data="chartData[index]"></ve-histogram>
                          <ve-pie v-if="graph[index] == 'pie' || graph[index] == null " :data="chartData[index]"></ve-pie>
                          <ve-bar v-if="graph[index] == 'bar'" :data="chartData[index]"></ve-bar>
                        </el-card>
                    </div>
                </div>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Statistic',
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default,
    Sidebar: require('./Sidebar.vue').default
  },
  data () {
    return {
      UID: this.$router.history.current.params.UID,
      total: '',
      title: '问卷标题',
      QuestionNaireId: '10001',
      qid: this.$router.history.current.params.QID,
      answers: '',
      processed: [],
      tabeldata: [],
      chartData: [],
      graph: []
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
    getQuesnaire: function () {
      return this.$axios({
        url: 'https://afo3wm.toutiao15.com/getQuesnaire',
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
    handleSelect2 (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/RecoveryProfile/${this.UID}/${this.qid}`})
      }
      if (key === '2') {
        this.$router.push({path: `/CheckQuestionnaire/${this.UID}/${this.qid}`})
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
    this.$axios.all([this.getQuesnaire(), this.getAns(), this.getAnswersNum()]).then(this.$axios.spread((response1, response2, response3) => {
      this.title = response3.data.title
      this.total = response3.data.total
      for (let i = 0; i < response1.data.Questions.length; i++) {
        switch (response1.data.Questions[i].questionType) {
          case 0:
            this.processed.push({title: response1.data.Questions[i].content.title, choice: response1.data.Questions[i].content.choice, choiceNum: new Array(response1.data.Questions[i].content.choice.length).fill(0), type: 0, sum: 0})
            break
          case 1:
            this.processed.push({title: response1.data.Questions[i].content.title, choice: response1.data.Questions[i].content.choice, choiceNum: new Array(response1.data.Questions[i].content.choice.length).fill(0), type: 1, sum: 0})
            break
          case 2:
            this.processed.push({title: response1.data.Questions[i].content.title, choice: response1.data.Questions[i].content.choice, choiceNum: new Array(response1.data.Questions[i].content.choice.length).fill(0), type: 2, sum: 0})
            break
          case 3:
            this.processed.push({title: response1.data.Questions[i].content.title, choice: response1.data.Questions[i].content.choice, choiceNum: new Array(response1.data.Questions[i].content.choice.length).fill(0), type: 3, sum: 0})
            break
          case 4:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 4})
            break
          case 5:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 5})
            break
          case 6:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 6})
            break
          case 7:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 7})
            break
          case 8:
            this.processed.push({title: response1.data.Questions[i].content.title, mark: [1, 2, 3, 4, 5], marknum: [0, 0, 0, 0, 0], avg: null, type: 8, sum: 0, totalscore: 0})
            break
          case 9:
            this.processed.push({title: response1.data.Questions[i].content.title, mark: [1, 2, 3, 4, 5], marknum: [0, 0, 0, 0, 0], avg: null, type: 9, sum: 0, totalscore: 0})
            break
          case 10:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 10})
            break
          case 11:
            this.processed.push({title: response1.data.Questions[i].content.title, fintime: [], answer: [], type: 11})
            break
          default:
            break
        }
      }
      for (let i = 0; i < response2.data.result.length; i++) {
        for (let j = 0; j < response2.data.result[i].answers.length; j++) {
          switch (response2.data.result[i].answers[j].questiontype) {
            case 0:
              this.processed[response2.data.result[i].answers[j].order].choiceNum[response2.data.result[i].answers[j].Anscontent.choice] += 1
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              break
            case 1:
              this.processed[response2.data.result[i].answers[j].order].choiceNum[response2.data.result[i].answers[j].Anscontent.choice] += 1
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              break
            case 2:
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              for (let k = 0; k < response2.data.result[i].answers[j].Anscontent.choice.length; k++) {
                this.processed[response2.data.result[i].answers[j].order].choiceNum[response2.data.result[i].answers[j].Anscontent.choice[k]] += 1
              }
              break
            case 3:
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              for (let k = 0; k < response2.data.result[i].answers[j].Anscontent.choice.length; k++) {
                this.processed[response2.data.result[i].answers[j].order].choiceNum[response2.data.result[i].answers[j].Anscontent.choice[k]] += 1
              }
              break
            case 4:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            case 5:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            case 6:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            case 7:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            case 8:
              this.processed[response2.data.result[i].answers[j].order].marknum[response2.data.result[i].answers[j].Anscontent.mark - 1] += 1
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              this.processed[response2.data.result[i].answers[j].order].totalscore += response2.data.result[i].answers[j].Anscontent.mark
              break
            case 9:
              this.processed[response2.data.result[i].answers[j].order].marknum[response2.data.result[i].answers[j].Anscontent.mark - 1] += 1
              this.processed[response2.data.result[i].answers[j].order].sum += 1
              this.processed[response2.data.result[i].answers[j].order].totalscore += response2.data.result[i].answers[j].Anscontent.mark
              break
            case 10:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            case 11:
              this.processed[response2.data.result[i].answers[j].order].answer.push(response2.data.result[i].answers[j].Anscontent.text)
              this.processed[response2.data.result[i].answers[j].order].fintime.push(response2.data.result[i].answers[j].AnsCreateAt.substring(0, 10))
              break
            default:
              break
          }
        }
      }
      for (let i = 0; i < this.processed.length; i++) {
        this.tabeldata.push([])
        this.chartData.push({})
        switch (this.processed[i].type) {
          case 0:
            this.chartData[i] = {
              columns: ['选项', '小计'],
              rows: []
            }
            for (let j = 0; j < this.processed[i].choiceNum.length; j++) {
              this.chartData[i].rows.push({
                '小计': this.processed[i].choiceNum[j],
                '选项': this.processed[i].choice[j]
              })
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].choiceNum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                choice: this.processed[i].choice[j],
                choiceNum: this.processed[i].choiceNum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          case 1:
            this.chartData[i] = {
              columns: ['选项', '小计'],
              rows: []
            }
            for (let j = 0; j < this.processed[i].choiceNum.length; j++) {
              this.chartData[i].rows.push({
                '小计': this.processed[i].choiceNum[j],
                '选项': this.processed[i].choice[j]
              })
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].choiceNum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                choice: this.processed[i].choice[j],
                choiceNum: this.processed[i].choiceNum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          case 2:
            this.chartData[i] = {
              columns: ['选项', '小计'],
              rows: []
            }
            for (let j = 0; j < this.processed[i].choiceNum.length; j++) {
              this.chartData[i].rows.push({
                '小计': this.processed[i].choiceNum[j],
                '选项': this.processed[i].choice[j]
              })
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].choiceNum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                choice: this.processed[i].choice[j],
                choiceNum: this.processed[i].choiceNum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          case 3:
            this.chartData[i] = {
              columns: ['选项', '小计'],
              rows: []
            }
            for (let j = 0; j < this.processed[i].choiceNum.length; j++) {
              this.chartData[i].rows.push({
                '小计': this.processed[i].choiceNum[j],
                '选项': this.processed[i].choice[j]
              })
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].choiceNum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                choice: this.processed[i].choice[j],
                choiceNum: this.processed[i].choiceNum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          case 8:
            this.chartData[i] = {
              columns: ['分数', '小计'],
              rows: []
            }
            this.processed[i].avg = (this.processed[i].totalscore / this.processed[i].sum).toFixed(2)
            for (let j = 0; j < this.processed[i].marknum.length; j++) {
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].marknum[j] / this.processed[i].sum) * 100
              }
              this.chartData[i].rows.push({
                '小计': this.processed[i].marknum[j],
                '分数': this.processed[i].mark[j]
              })
              this.tabeldata[i].push({
                mark: this.processed[i].mark[j],
                marknum: this.processed[i].marknum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          case 9:
            this.chartData[i] = {
              columns: ['分数', '小计'],
              rows: []
            }
            this.processed[i].avg = (this.processed[i].totalscore / this.processed[i].sum).toFixed(2)
            for (let j = 0; j < this.processed[i].marknum.length; j++) {
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].marknum[j] / this.processed[i].sum) * 100
              }
              this.chartData[i].rows.push({
                '小计': this.processed[i].marknum[j],
                '分数': this.processed[i].mark[j]
              })
              this.tabeldata[i].push({
                mark: this.processed[i].mark[j],
                marknum: this.processed[i].marknum[j],
                Percent: percent.toFixed(1)
              })
            }
            break
          default:
            for (let j = 0; j < this.processed[i].answer.length; j++) {
              let ans = this.processed[i].answer[j]
              if (this.processed[i].answer[j] instanceof Array) {
                ans = ''
                for (let k = 0; k < this.processed[i].answer[j].length; k++) {
                  ans += this.processed[i].answer[j][k] + ' \n '
                }
              }
              this.tabeldata[i].push({
                No: j + 1,
                answer: ans,
                fintime: this.processed[i].fintime[j]
              })
            }
            break
        }
      }
      loading.close()
    }))
      .catch((error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '与远程服务器的连接发生错误',
          type: 'error'
        })
        loading.close()
        // this.$router.push('/non-existing')
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
  margin-top:1px;
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
.stat {
  background-color: white;
  margin-top: 30px;
  margin-right: 200px;
  margin-left: 200px;
}
.item {
    padding: 50px 200px 30px 200px
}
.box-card {
  margin-top: 30px
}
</style>
