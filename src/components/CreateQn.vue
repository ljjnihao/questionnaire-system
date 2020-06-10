<template>
  <div class="Relative">
    <el-container class="content">
      <div>
        <Header logged="true" v-bind:uid="this.UID" activeindex="1"></Header>
      </div>
      <el-header height="60px">
        <Subheader
          funcname="创建问卷"
          step="1"
          v-bind:uid="this.UID"
          v-bind:qid="this.QID"
          createBtn="true"
          previewBtn="true"
          v-bind:uploadData="this.questions"
        ></Subheader>
      </el-header>
      <el-container>
        <el-aside>
          <QuestionsBar v-on:getType="getType" v-bind:warning="this.warning"></QuestionsBar>
        </el-aside>
        <el-main>
          <el-card class="box-card">
            <div style="margin-top: 50px; font-weight: bold; font-size: 20px;">{{title}}</div>
            <div style="font-size: 16px; margin-top: 30px">{{description}}</div>
            <draggable v-model="questions" group="" @start="drag=true" @end="drag=false" style="text-align: left">
                <div v-for="(questItem, index) in questions" :key="questItem.order" class="item">
                    <div  v-if="showEdit === index">
                      <Question
                          v-bind:uid="UID"
                          v-bind:qid="QID"
                          v-bind:propType=questItem.type
                          v-bind:quesOrder=questItem.order
                          v-bind:propQues=questItem
                          v-on:getQues="getQues"
                          v-on:getEditMode="getEditMode"
                          editAndSave=true
                          class="question"
                      ></Question>
                    </div>
                    <div v-else-if="questItem.questionType=='0'" class="quesItem">
                        <p class="questItem-title">
                          <span style="font-weight: bold">{{questItem.order+1}}</span>
                          <span>{{questItem.content.title}}</span>
                          <span style="color: red">*</span>
                          <span v-text="questItem.title"></span>
                        </p>
                        <el-radio-group>
                          <div
                            v-for="(choiceItem,index) in questItem.content.choice"
                            :key="index"
                            class="choiceItem"
                          >
                            <el-radio :label="index">{{choiceItem}}</el-radio>
                          </div>
                        </el-radio-group>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else-if="questItem.questionType=='1'" class="quesItem">
                      <p class="questItem-title">
                        <span style="font-weight: bold">{{questItem.order+1}}</span>
                        <span>{{questItem.content.title}}</span>
                        <span v-text="questItem.title"></span>
                      </p>
                      <el-radio-group>
                        <div
                          v-for="(choiceItem,index) in questItem.content.choice"
                          :key="index"
                          class="choiceItem"
                        >
                          <el-radio :label="index">{{choiceItem}}</el-radio>
                        </div>
                      </el-radio-group>
                       <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else-if="questItem.questionType=='2'" class="quesItem">
                      <p class="questItem-title">
                        <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                        <span>{{questItem.content.title}}</span>
                        <span style="color: red">*</span>
                        <span v-text="questItem.title"></span>
                      </p>
                      <el-radio-group>
                        <div
                          v-for="(choiceItem,index) in questItem.content.choice"
                          :key="index"
                          class="choiceItem"
                        >
                          <el-checkbox :label="index">{{choiceItem}}</el-checkbox>
                        </div>
                      </el-radio-group>
                       <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else-if="questItem.questionType=='3'" class="quesItem">
                      <p class="questItem-title">
                        <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                        <span>{{questItem.content.title}}</span>
                        <span v-text="questItem.title"></span>
                      </p>
                      <el-radio-group>
                        <div
                          v-for="(choiceItem,index) in questItem.content.choice"
                          :key="index"
                          class="choiceItem"
                        >
                          <el-checkbox :label="choiceItem[index]">{{choiceItem}}</el-checkbox>
                        </div>
                      </el-radio-group>
                       <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else-if="questItem.questionType=='4'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span style="color: red">*</span>
                      <span v-text="questItem.title"></span>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      <el-input placeholder="请输入内容"></el-input>
                    </div>
                    <div v-else-if="questItem.questionType=='5'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span v-text="questItem.title"></span>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                        <i class="el-icon-edit-outline"></i>
                      </el-button>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                      <el-input placeholder="请输入内容"></el-input>
                    </div>
                    <div v-else-if="questItem.questionType=='6'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span style="color: red">*</span>
                      <span v-text="questItem.title"></span>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                        <i class="el-icon-edit-outline"></i>
                      </el-button>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                      <el-input placeholder="请输入内容"
                                type="textarea"
                                :rows="5">
                      </el-input>
                    </div>
                    <div v-else-if="questItem.questionType=='7'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span v-text="questItem.title"></span>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                        <i class="el-icon-edit-outline"></i>
                      </el-button>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                      <el-input placeholder="请输入内容"
                            type="textarea"
                            :rows="5">
                      </el-input>
                    </div>
                    <div v-else-if="questItem.questionType=='8'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span style="color: red">*</span>
                      <span v-text="questItem.title"></span>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                      <el-rate></el-rate>
                    </div>
                    <div v-else-if="questItem.questionType=='9'" class="quesItem">
                      <span class="questionTitle" style="font-weight: bold">{{questItem.order+1}}</span>
                      <span>{{questItem.content.title}}</span>
                      <span v-text="questItem.title"></span>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                        <i class="el-icon-edit-outline"></i>
                      </el-button>
                      <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                        <i class="el-icon-delete"></i>
                      </el-button>
                      <el-rate></el-rate>
                    </div>
                    <div v-else-if="questItem.questionType=='10'" class="quesItem">                    
                      <span style="font-weight:bold">{{questItem.order+1}}</span>
                      <span
                        v-for="(titleBlank,index) in questItem.content.title"
                        :key="index"
                        class="titleBlank"
                      >
                        <span v-if="index!=questItem.content.title.length-1">
                          <span>
                            {{titleBlank}}
                            <el-input class="blank"></el-input>
                          </span>
                        </span>
                        <span v-else>
                          <span>{{titleBlank}}</span>
                          <span style="color: red">*</span>
                        </span>
                      </span>
                       <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                    <div v-else-if="questItem.questionType=='11'" class="quesItem">
                      <span style="font-weight:bold">{{questItem.order+1}}</span>
                      <span
                        v-for="(titleBlank,index) in questItem.content.title"
                        :key="index"
                        class="titleBlank"
                      >
                        <span v-if="index!=questItem.content.title.length-1">
                          <span>
                            {{titleBlank}}
                            <el-input class="blank"></el-input>
                          </span>
                        </span>
                        <span v-else>
                          <span>{{titleBlank}}</span>
                        </span>
                      </span>
                       <el-button class="edit" type="text" style="float: right; font-size:30px" @click="editQues(index)">
                          <i class="el-icon-edit-outline"></i>
                        </el-button>
                        <el-button class="edit" type="text" style="float: right; font-size:30px" @click="delQues(index)">
                          <i class="el-icon-delete"></i>
                        </el-button>
                    </div>
                </div>
            </draggable>
            <Question
                  v-if="editMode"
                  v-bind:uid="this.UID"
                  v-bind:qid="this.QID"
                  v-bind:propType="newQuesType"
                  v-bind:quesOrder="newQuesOrder"
                  v-on:getQues="getQues"
                  v-on:getEditMode="getEditMode"
                  class="question"
            >
            </Question>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default,
    QuestionsBar: require('./QuestionsBar.vue').default,
    Question: require('./Question.vue').default,
    draggable
  },
  data () {
    return {
      title: '问卷标题',
      description: '',
      QID: this.$route.params.QID,
      UID: this.$route.params.UID,
      questions: [],
      newQuesType: '',
      showEdit: '',
      editMode: false
    }
  },
  methods: {
    getType: function (type) {
      this.newQuesType = type
    },
    getQues: function (question) {
      this.questions.push(question)
    },
    getEditMode: function (val) {
      this.editMode = val
      this.showEdit = ''
    },
    editQues: function (index) {
      this.showEdit = index
    },
    delQues: function (index) {
      var url = 'https://afo3wm.toutiao15.com/deleteQuestion'
      var request = {
        'questionID': this.questions[index].questionID
      }
      this.$axios
        .post(url, request)
        .then(response => {
          if (response.data.result.deletedCount === 1) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.questions.splice(index, 1)
          } else {
            this.$alert('不明原因，删除失败')
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
  },
  computed: {
    newQuesOrder: function () {
      if (this.questions === []) {
        return 0
      } else {
        return this.questions.length
      }
    },
    warning: function () {
      return this.editMode || this.showEdit !== ''
    }
  },
  watch: {
    questions: function () {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].order !== i) {
          this.questions[i].order = i
          // this.$refs.Question.$emit('orderEdit');
        }
      }
    },
    newQuesType: function () {
      if (this.newQuesType !== '') {
        this.editMode = true
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
    const url = 'https://afo3wm.toutiao15.com/getQuesnaire'
    const request = {
      questionnaireID: this.QID
    }
    this.$axios
      .post(url, request)
      .then(response => {
        this.title = response.data.Questionnaire.title
        this.description = response.data.Questionnaire.description
        this.questions = []
        for (let i = 0; i < response.data.Questions.length; i++) {
          var content = {
            title: response.data.Questions[i].content.title,
            choice: response.data.Questions[i].content.choice
          }
          this.questions.push({
            questionType: response.data.Questions[i].questionType,
            type: Math.floor(response.data.Questions[i].questionType / 2),
            order: response.data.Questions[i].order,
            content: content,
            questionID: response.data.Questions[i]._id
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
.question {
  margin-top: 20px;
  border-bottom: 2px solid rgba(168, 168, 168, 0.5);
  border-top: 2px solid rgba(168, 168, 168, 0.5);
}
.item {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  width: 90%;
  text-align: left;
}
.quesItem > .edit {
  opacity: 0
}
.quesItem:hover {
  opacity: 0.5;
  cursor: move
}
.quesItem:hover > .edit{
  opacity: 1;
}
.choiceItem {
  margin-bottom: 20px
}
.blank {
  width: 50px !important;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}
</style>
