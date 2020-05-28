<template>
  <div class="DataAnalysis">
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
      <el-aside width="10.26vw" >
        <el-menu  default-active="3"
                class="el-menu-vertical-demo" @select="handleSelect2" style="position:fixed;top: 15vw;left: 4vw">
          <el-menu-item index="1">
            <span slot="title" class="hyc" style="font-size: 20px">回收概况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" class="hyc" style="font-size: 20px">查看问卷</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" class="hyc" style="font-size: 20px">数据分析</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="display-flex">
        <span id="myChartTitle">{{title}}<span id="totalrecovery">回收总量：{{total}}</span> </span>
        <div v-for="(item,index) in processed" :key=index class="Item">
          <div v-if="item.type==0" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="choice" label="选项" width="100">
              </el-table-column>
              <el-table-column prop="choiceNum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
            <ve-pie :data="chartData[index]"></ve-pie>
          </div>
          <div v-else-if="item.type==1" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="choice" label="选项" width="100">
              </el-table-column>
              <el-table-column prop="choiceNum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
            <ve-pie :data="chartData[index]"></ve-pie>
          </div>
          <div v-else-if="item.type==2" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="choice" label="选项" width="100">
              </el-table-column>
              <el-table-column prop="choiceNum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
            <ve-pie :data="chartData[index]"></ve-pie>
          </div>
          <div v-else-if="item.type==3" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="choice" label="选项" width="100">
              </el-table-column>
              <el-table-column prop="choiceNum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
            <ve-pie :data="chartData[index]"></ve-pie>
          </div>
          <div v-else-if="item.type==4" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==5" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==6" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==7" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==8" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <p>本题平均分:<span>{{item.avg}}</span></p>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="mark" label="分数" width="100">
              </el-table-column>
              <el-table-column prop="marknum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==9" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span><span v-text="item.title"></span>
            <p>本题平均分:<span>{{item.avg}}</span></p>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="mark" label="分数" width="100">
              </el-table-column>
              <el-table-column prop="marknum" label="小计" width="100">
              </el-table-column>
              <el-table-column label="比例" width="300">
                <template slot-scope="scope">
                  <el-progress :percentage="scope.row.Percent"></el-progress>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==10" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span>
            <span v-for="(titleBlank,index) in item.title" :key=index class="titleBlank">
                <span v-if="index!=item.title.length-1">
                    <span>{{titleBlank}}___</span>
                </span>
                <span v-else>
                    <span>{{titleBlank}}</span>
                </span>
            </span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
          <div v-else-if="item.type==11" class="unit">
            <span style="font-weight: bold">{{index+1}}、 </span>
            <span v-for="(titleBlank,index) in item.title" :key=index class="titleBlank">
                <span v-if="index!=item.title.length-1">
                    <span>{{titleBlank}}___</span>
                </span>
                <span v-else>
                    <span>{{titleBlank}}</span>
                </span>
            </span>
            <el-table :data="tabeldata[index]" max-height="590" style="width: 500px;" class="Table">
              <el-table-column prop="No" label="序号" width="100">
              </el-table-column>
              <el-table-column prop="fintime" label="提交答卷时间" width="100">
              </el-table-column>
              <el-table-column prop="answer" label="答案文本" width="300">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      total: '',
      activeIndex: '2',
      title: '问卷标题',
      QuestionNaireId: '10001',
      qid: this.$router.history.current.params.QID,
      UID: this.$router.history.current.params.UID,
      answers: '',
      processed: [],
      tabeldata: [],
      chartData: []
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
                Percent: percent
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
                Percent: percent
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
                Percent: percent
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
                Percent: percent
              })
            }
            break
          case 8:
            this.processed[i].avg = this.processed[i].totalscore / this.processed[i].sum
            for (let j = 0; j < this.processed[i].marknum.length; j++) {
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].marknum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                mark: this.processed[i].mark[j],
                marknum: this.processed[i].marknum[j],
                Percent: percent
              })
            }
            break
          case 9:
            this.processed[i].avg = this.processed[i].totalscore / this.processed[i].sum
            for (let j = 0; j < this.processed[i].marknum.length; j++) {
              let percent = 0
              if (this.processed[i].sum !== 0) {
                percent = (this.processed[i].marknum[j] / this.processed[i].sum) * 100
              }
              this.tabeldata[i].push({
                mark: this.processed[i].mark[j],
                marknum: this.processed[i].marknum[j],
                Percent: percent
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
        this.$router.push('/non-existing')
      })
  }
}
</script>
<style scoped>
  .unit{
    margin-top: 50px;
    position: relative;
  }
  .Table{
    margin-left: auto;
    margin-right: auto;
  }
  #myChartTitle{
    font-weight: 600;
    display: flex;
    flex-direction: row;
  }
  .QuestionNaireTitle{
    float:left;
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
