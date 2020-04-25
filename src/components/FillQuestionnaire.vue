<template>
    <div class="question">
      <el-container v-if="seen" style="background-color: rgba(242,242,242,1)">
          <el-main>
           <h1 id="title">{{title}}</h1>
           <p class="description">{{description}}</p>
           <el-col style="background-color: #ffffff; margin-top: 100px; padding: 30px" :xs="{span:22, offset: 1}" :sm="{span:20, offset: 2}" :md="{span: 18, offset: 3}" :lg="{span: 12, offset: 6}" :xl="{span: 12, offset: 6}">
              <el-progress :percentage="percentage" :color="customColor" style="margin-top: 10px" :show-text="showText"></el-progress>
              <div v-for="(questItem,order) in questionnaireData" :key=order class="questItem">
                  <div v-if="questItem.questionType=='0'">
                      <p class="questItem-title">
                          <span style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span><span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-radio-group v-model="answerSet[order].ans" @change="computerPercentage">
                          <div v-for="(choiceItem,index) in questItem.content.choice" :key=index class="choiceItem">
                              <el-radio :label=index+1>{{choiceItem}}</el-radio>
                          </div>
                      </el-radio-group>
                  </div>
                  <div v-else-if="questItem.questionType=='1'">
                      <p class="questItem-title">
                          <span style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-radio-group v-model="answerSet[order].ans" @change="computerPercentage">
                          <div v-for="(choiceItem,index) in questItem.content.choice" :key=index class="choiceItem">
                              <el-radio :label=index+1>{{choiceItem}}</el-radio>
                          </div>
                      </el-radio-group>
                  </div>
                  <div v-else-if="questItem.questionType=='2'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span><span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-checkbox-group v-model="answerSet[order].ans" @change="computerPercentage">
                          <div v-for="(choiceItem,index) in questItem.content.choice" :key=index class="choiceItem">
                              <el-checkbox :label="choiceItem">{{choiceItem}}</el-checkbox>
                          </div>
                      </el-checkbox-group>
                  </div>
                  <div v-else-if="questItem.questionType=='3'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-checkbox-group v-model="answerSet[order].ans" @change="computerPercentage">
                          <div v-for="(choiceItem,index) in questItem.content.choice" :key=index class="choiceItem">
                              <el-checkbox :label="choiceItem">{{choiceItem}}</el-checkbox>
                          </div>
                      </el-checkbox-group>
                  </div>
                  <div v-else-if="questItem.questionType=='4'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span><span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-input v-model="answerSet[order].ans" placeholder="请输入内容" @change="computerPercentage"></el-input>
                  </div>
                  <div v-else-if="questItem.questionType=='5'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-input v-model="answerSet[order].ans" placeholder="请输入内容" @change="computerPercentage"></el-input>
                  </div>
                  <div v-else-if="questItem.questionType=='6'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span><span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-input v-model="answerSet[order].ans" placeholder="请输入内容" type="textarea" :rows="5" @change="computerPercentage"></el-input>
                  </div>
                  <div v-else-if="questItem.questionType=='7'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-input v-model="answerSet[order].ans" placeholder="请输入内容" type="textarea" :rows="5" @change="computerPercentage"></el-input>
                  </div>
                  <div v-else-if="questItem.questionType=='8'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span><span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-rate v-model="answerSet[order].ans" @change="computerPercentage"></el-rate>
                  </div>
                  <div v-else-if="questItem.questionType=='9'">
                      <p class="questItem-title">
                          <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}} </span><span>{{questItem.content.title}}</span>
                          <span v-text="questItem.title"></span>
                      </p>
                      <el-rate v-model="answerSet[order].ans" @change="computerPercentage"></el-rate>
                  </div>
                  <div v-else-if="questItem.questionType=='10'">
                      <p class="questItem-title">
                          <span>{{questItem.order+1}}、</span>
                          <span v-for="(titleBlank,index) in questItem.content.title" :key=index class="titleBlank">
                              <span v-if="index!=questItem.content.title.length-1">
                                  <span>{{titleBlank}}<el-input v-model="answerSet[order].ans[index]" placeholder="" class="blank"></el-input></span>
                              </span>
                              <span v-else>
                                  <span>{{titleBlank}}(必填)<br></span>
                              </span>
                          </span>
                      </p>
                  </div>
                  <div v-else-if="questItem.questionType=='11'">
                      <p class="questItem-title">
                          <span>{{questItem.order+1}}、</span>
                          <span v-for="(titleBlank,index) in questItem.content.title" :key=index class="titleBlank">
                              <span v-if="index!=questItem.content.title.length-1">
                                  <span>{{titleBlank}}<el-input v-model="answerSet[order].ans[index]" placeholder="" class="blank"></el-input></span>
                              </span>
                              <span v-else>
                                  <span>{{titleBlank}}(选填)</span>
                              </span>
                          </span>
                      </p>
                  </div>
              </div>
              <el-button type="primary" @click="commited" id="commitedButton" >确认提交</el-button>
           </el-col>
         </el-main>
      </el-container>
    </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      questionnaireID: this.$route.params.questionnaireID,
      ip: '',
      title: '',
      description: '',
      questionnaireData: '',
      radio: '',
      answerSet: [],
      answerUID: this.$md5(localStorage.getItem('Ip')).substring(0, 24),
      questionID: [],
      customColor: '#409eff',
      percentage: 0,
      showText: false,
      seen: false
    }
  },
  methods: {
    computerPercentage: function () {
      let cnt = 0
      for (let i = 0; i < this.answerSet.length; i++) {
        let answer = this.answerSet[i]
        if (answer.ans !== '' && answer.ans != null & answer.ans !== [] && answer.ans !== 0 && answer.ans.length !== 0) {
          // console.log(answer.ans)
          cnt += 1
        }
      }
      console.log(cnt, this.questionID.length)
      this.percentage = (cnt / this.questionID.length) * 100
    },
    toIndex: function (array1, array2) {
      let rs = []
      for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
          if (array1[i] === array2[j]) {
            rs.push(j)
          }
        }
      }
      return rs
    },
    commited: function () {
      console.log(this.answerUID)
      let rs = JSON.parse(JSON.stringify(this.answerSet))
      for (let i = 0; i < this.answerSet.length; i++) {
        switch (this.answerSet[i].type) {
          case 0:
            if (this.answerSet[i].ans === '') {
              this.$message({
                showClose: true,
                message: '第' + (i + 1) + '题为必填',
                type: 'error'
              })
              return
            }
            break
          case 2:
            if (this.answerSet[i].ans.length === 0) {
              this.$message({
                showClose: true,
                message: '第' + (i + 1) + '题为必填',
                type: 'error'
              })
              return
            }
            rs[i].ans = this.toIndex(rs[i].ans, this.questionnaireData[i].content.choice)
            break
          case 3:
            rs[i].ans = this.toIndex(rs[i].ans, this.questionnaireData[i].content.choice)
            break
          case 4:
            if (this.answerSet[i].ans === '') {
              this.$message({
                showClose: true,
                message: '第' + (i + 1) + '题为必填',
                type: 'error'
              })
              return
            }
            break
          case 6:
            if (this.answerSet[i].ans === '') {
              this.$message({
                showClose: true,
                message: '第' + (i + 1) + '题为必填',
                type: 'error'
              })
              return
            }
            break
          case 8:
            if (this.answerSet[i].ans === 0) {
              this.$message({
                showClose: true,
                message: '第' + (i + 1) + '题为必填',
                type: 'error'
              })
              return
            }
            break
          default:
            break
        }
      }
      for (let i = 0; i < this.questionID.length; i++) {
        rs[i] = {'questionID': this.questionID[i], 'content': rs[i].ans, 'answerUID': this.answerUID}
      }
      let url = 'https://afo3wm.toutiao15.com/createAnswer'
      this.$axios.post(url, {answers: rs}).then(response => {
        for (let i = 0; i < response.data.results.length; i++) {
          if (response.data.results[i].success === 0) {
            this.$message({
              showClose: true,
              message: '此IP已经填写过该问卷了',
              type: 'warning'
            })
            return
          }
          this.$message({
            showClose: true,
            message: '填写成功',
            type: 'success'
          })
        }
      })
        .catch((error) => {
          console.log(error)
          this.seen = false
          this.$message({
            showClose: true,
            message: '与远程服务器的连接发生致命错误，提交失败',
            type: 'error'
          })
        })
    }
  },
  created: function () {
    // let qid = this.getqid()
    // let qid = this.questionnaireID
    // ? questionnairedID returned might not always be 24-bit
    // if (qid.length !== 24) {
    //   const loading = this.$loading({
    //     lock: true,
    //     text: 'Loading',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0.7)'
    //   })
    //   this.$message({
    //     showClose: true,
    //     message: '问卷不存在1',
    //     type: 'error'
    //   })
    //   console.log(loading)
    //   return
    // }
    let request = {
      questionnaireID: this.questionnaireID
    }
    let url = 'https://afo3wm.toutiao15.com/getQuesnaire'
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.$axios.post(url, request).then(response => {
      if (response.data.Questionnaire === undefined || response.data.Questionnaire === null) {
        this.$message({
          showClose: true,
          message: '问卷不存在',
          type: 'error'
        })
        loading.close()
        this.$router.push('/non-existing')
        return
      }
      let startTime = response.data.Questionnaire.startAt
      if (Date.parse(new Date()) < new Date(startTime).getTime()) {
        // ? route to another page would be better
        this.$message({
          showClose: true,
          message: '问卷未发布',
          type: 'warning'
        })
        loading.close()
        this.$router.push('/non-existing')
        return
      }
      let endTime = response.data.Questionnaire.endAt
      if (Date.parse(new Date()) > new Date(endTime).getTime()) {
        // ? route to another page would be better
        this.$message({
          showClose: true,
          message: '问卷已经到期',
          type: 'warning'
        })
        loading.close()
        this.$router.push('/non-existing')
        return
      }
      this.seen = true
      this.title = response.data.Questionnaire.title
      this.description = response.data.Questionnaire.description
      this.questionnaireData = response.data.Questions
      for (let i = 0; i < this.questionnaireData.length; i++) {
        this.questionID.push(this.questionnaireData[i]._id)
        switch (this.questionnaireData[i].questionType) {
          case 0:
            this.answerSet.push({ans: '', mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 1:
            this.answerSet.push({ans: '', mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          case 2:
            this.answerSet.push({ans: [], mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 3:
            this.answerSet.push({ans: [], mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          case 4:
            this.answerSet.push({ans: '', mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 5:
            this.answerSet.push({ans: '', mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          case 6:
            this.answerSet.push({ans: '', mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 7:
            this.answerSet.push({ans: '', mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          case 8:
            this.answerSet.push({ans: null, mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 9:
            this.answerSet.push({ans: null, mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          case 10:
            this.answerSet.push({ans: new Array(this.questionnaireData[i].content.title.length - 1), mustfill: 'true', type: this.questionnaireData[i].questionType})
            break
          case 11:
            this.answerSet.push({ans: new Array(this.questionnaireData[i].content.title.length - 1), mustfill: 'false', type: this.questionnaireData[i].questionType})
            break
          default:
            break
        }
        loading.close()
      }
    })
      .catch((error) => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '与远程服务器的连接发生致命错误，加载失败',
          type: 'error'
        })
        loading.close()
        this.$router.push('/non-existing')
      })
  }
}
</script>
<style scoped>
    .titleBlank{
    }
    .blank {
        width:50px;
        border-top-width: 0px;
        border-left-width: 0px;
        border-right-width: 0px;
        border-bottom-width: 1px;
    }
    .question{
    }
    .description {
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        text-align: center;
        font-size: 18px;
    }
    .questItem{
        margin-top: 50px;
        margin-left: auto;
        margin-right: auto;
        width: 90%;
        text-align: left;
    }
    .choiceItem{
    }
    #commitedButton{
        font-size: 20px;
        width: 50%;
    }
    .el-radio {
      margin-bottom: 20px;
    }
    .el-checkbox {
      margin-bottom: 20px;
    }
    .el-rate {
    }
</style>
