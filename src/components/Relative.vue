<template>
  <div class="Relative">
    <el-container class="content">
      <el-header>
        <Header logged="true" v-bind:uid="this.UID" activeindex="2"></Header>
      </el-header>
      <el-header height="80px">
        <Subheader funcname="问卷分析" step="3"></Subheader>
      </el-header>
      <el-container>
        <el-aside>
          <Sidebar activeindex="4"></Sidebar>
        </el-aside>
        <el-main>
          <div style="font-weight: bold; font-size: 16px; text-align: left">{{title}}</div>
          <div style="text-align: left">回收总量：{{total}}</div>
          <el-card class="box-card">
            <div style="margin: 30px">
              <div v-for="(selector,index) in selectors" :key="index">
                <el-row>
                  <el-col :span='14' style="text-align: left">
                    <div v-if="index < 1">
                      <i class="el-icon-edit"></i>
                      <span style="color:#409EFF;font-weight: bold">定义题目</span>
                      <span>[仅限单选和多选题]</span>
                    </div>
                    <div>
                      <el-select
                        v-model="selectors[index].select1"
                        placeholder="请选择题目"
                        style="width: 400px; margin-top: 20px"
                      >
                        <el-option
                          v-for="question in questions"
                          :key="question.order"
                          :label="question.title"
                          :value="question.order"
                        ></el-option>
                      </el-select>
                      <el-button type="text" v-on:click="del(index)">删除</el-button>
                    </div>
                  </el-col>
                  <el-col :span='10' style="text-align: left">
                    <div v-if="index < 1">
                      <i class="el-icon-edit"></i>
                      <span style="color:#409EFF;font-weight: bold">定义选项</span>
                    </div>
                    <div>
                      <el-select
                        v-model="selectors[index].select2"
                        placeholder="请选择选项"
                        style="width: 400px; margin-top: 20px"
                      >
                        <el-option
                          v-for="choice in questions[selectors[index].select1].choices"
                          :key="choice.order"
                          :label="choice.content"
                          :value="choice.order"
                        ></el-option>
                      </el-select>
                      <el-button type="text" v-on:click="del(index)" style="">删除</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-row style="border: 1px dotted #409EFF; margin-top: 20px">
                  <el-button type="text" v-on:click="add" style="width: 700px">+添加</el-button>
                </el-row>
              </div>
              <div>
                <el-row style="text-align: left; margin-top: 30px">
                  <el-button type="primary" v-on:click="analyse">开始分析</el-button>
                </el-row>
              </div>
              <div style="border: 3px solid rgba(240,240,240,1); margin-top: 50px">
                <div
                  v-if="none"
                  style="color: rgba(165,156,156,1);align: center; padding: 200px"
                >暂无数据</div>
                <div v-if="!none" style="margin-top: 30px; margin: 30px">
                   <div style="text-align: left;">
                      <i class="el-icon-rank"></i>
                      <span style="color:#409EFF;font-weight: bold">关联规则</span>
                    </div>
                    <div v-for="(res,index) in results" :key="index">
                      <el-row style="text-align: left; margin-top: 20px">
                        <span style="color:#409EFF;font-weight: bold">规则 - {{index}}</span>
                      </el-row>
                      <el-row style="border: 1px solid rgba(212, 216, 220, 1); margin-top: 10px">
                        <el-table :data="tableData[index]" max-height="590" style="width: 100%" border=true>
                          <el-table-column prop="qtitle" label="题目" style="width: 50%">
                          </el-table-column>
                          <el-table-column prop="choicetitle" label="选项">
                          </el-table-column>
                          </el-table>
                      </el-row>
                    </div>
                </div>
              </div>
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
      title: '问卷标题',
      qid: this.$router.history.current.params.QID,
      UID: this.$router.history.current.params.UID,
      total: '',
      selectors: [{
        select1: 0,
        select2: ''
      }
      ],
      questions: [],
      none: true,
      results: [],
      tableData: []
    }
  },
  computed: {
    choices: function () {
      let ret = []
      for (let i = 0; i < this.selectors.length; ++i) {
        // console.log(this.selectors[i].select1)
        ret.push({
          'questionID': this.questions[this.selectors[i].select1].qid,
          'choiceOrder': this.selectors[i].select2
        })
      }
      return ret
    }
  },
  methods: {
    add: function () {
      this.selectors.push({
        select1: 0,
        select2: ''
      })
    },
    del: function (index) {
      this.selectors.splice(index, 1)
    },
    getQn: function () {
      return this.$axios({
        url: 'https://afo3wm.toutiao15.com/getAnswersNum',
        method: 'get',
        params: {
          questionnaireID: this.qid
        }
      })
    },
    getQuestions: function () {
      return this.$axios({
        url: 'https://afo3wm.toutiao15.com/getQuesnaire',
        method: 'get',
        params: {
          questionnaireID: this.qid
        }
      })
    },
    analyse: function () {
      var url = 'https://afo3wm.toutiao15.com/apriori'
      var params = {
        questionnaireID: this.qid,
        choices: this.choices,
        minSup: 0.375
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$axios
        .post(url, params)
        .then(response => {
          if (response.data.success) {
            if (response.data.results.length > 0) {
              this.none = false
              for (let id = 0; id < response.data.results.length; id++) {
                var items = []
                var data = []
                var qid, choiceOrder, qtitle, choicetitle
                for (let i = 0; i < response.data.results[id].length; ++i) {
                  qid = response.data.results[id][i].questionID
                  choiceOrder = response.data.results[id][i].choiceOrder
                  items.push({
                    qid: qid,
                    choiceOrder: choiceOrder
                  })
                  for (let j = 0; j < this.questions.length; ++j) {
                    var question = this.questions[j]
                    // console.log(question)
                    if (question.qid === qid) {
                      qtitle = question.title
                      choicetitle = question.choices[choiceOrder].content
                      console.log(qtitle)
                      console.log(choicetitle)
                      data.push({
                        qtitle: qtitle,
                        choicetitle: choicetitle
                      })
                    }
                  }
                }
                this.results.push({
                  index: id,
                  items: items
                })
                this.tableData.push(data)
              }
            } else {
              this.$message({
                showClose: true,
                message: '选项不足以得到关联规则哦',
                type: 'error'
              })
            }
          } else {
            console.log(response.data.error)
            this.$message({
              showClose: true,
              message: response.data.error,
              type: 'error'
            })
          }
          loading.close()
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
  },
  created: function () {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$axios.all([this.getQn(), this.getQuestions()])
      .then(this.$axios.spread((response1, response2) => {
        this.total = response1.data.total
        this.title = response1.data.title
        for (let i = 0; i < response2.data.Questions.length; ++i) {
          var question = response2.data.Questions[i]
          if (question.questionType === 0 || question.questionType === 1 ||
          question.questionType === 2 || question.questionType === 3) {
            // console.log(question.order)
            let choices = []
            for (let i = 0; i < question.content.choice.length; ++i) {
              // console.log(question.content.choice)
              choices.push({
                order: i,
                content: question.content.choice[i]
              })
            }
            this.questions.push({
              qid: question._id,
              title: question.content.title,
              order: question.order,
              choices: choices
            })
          }
        }
        loading.close()
      }))
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
  background-color: rgba(242, 242, 242, 1);
  padding: 20px;
}
.box-card {
  margin-top: 30px;
  margin-left: 150px;
  margin-right: 150px;
  text-align: center;
}
.stat {
  background-color: white;
  margin: 30px;
}
</style>
