<template>
  <div class="question" v-loading="loading" element-loading-text="创建题目中">
    <el-form label-width="auto">
        <el-form-item label="题目：" style="font-weight: bold; margin-top: 30px">
          <el-input v-if="!editAndSave" v-model="title" placeholder="请输入题目"></el-input>
          <el-input v-if="editAndSave" v-model="propQues.content.title"></el-input>
        </el-form-item>
        <el-form-item label="题型：" style="font-weight: bold; margin-top: 30px;text-align:left">
            <span>{{options[type].label}}</span>
            <el-checkbox v-model="checked">必选</el-checkbox>
        </el-form-item>
    </el-form>
    <div v-if="type == '0' || type == '1'" style="text-align: left">
      <draggable v-if="!editAndSave" v-model="choices" group="" @start="drag=true" @end="drag=false" style="text-align: left">
        <div v-for="(choice, index) in choices" :key="index">
          <i class="el-icon-sort icon"></i>
          <el-input v-model="choices[index]" placeholder="请输入选项" class="choiceItem"></el-input>
          <el-button type="text" v-on:click="del(index)" style=""><i class="el-icon-circle-close"></i></el-button>
        </div>
      </draggable>
      <draggable v-if="editAndSave" v-model="propQues.content.choice" group="" @start="drag=true" @end="drag=false" style="text-align: left">
        <div v-for="(choice, index) in propQues.content.choice" :key="index">
          <i class="el-icon-sort icon"></i>
          <el-input v-model="propQues.content.choice[index]" placeholder="请输入选项" class="choiceItem"></el-input>
          <el-button type="text" v-on:click="del(index)" style=""><i class="el-icon-circle-close"></i></el-button>
        </div>
      </draggable>
      <el-button type="text" v-on:click="add()" style="width: 320px; border: 1px dotted #409EFF; margin-top: 10px">+添加选项</el-button>
    </div>
    <div style="text-align: right; margin-top: 30px; margin-bottom: 20px">
        <el-button type="text" @click="cancel" style="width: 100px">取消</el-button>
        <el-button v-if="!editAndSave" type="primary" @click="submit" style="width: 100px">确认</el-button>
        <el-button v-if="editAndSave" type="primary" @click="edit" style="width: 100px">修改</el-button>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  inject: ['reload'],
  props: ['uid', 'qid', 'propType', 'quesOrder', 'editAndSave', 'propQues'],
  data () {
    return {
      loading: false,
      checked: true,
      title: '',
      type: this.propType,
      order: this.quesOrder,
      UID: this.uid,
      QID: this.qid,
      options: [
        {
          value: '0',
          label: '单选题'
        },
        {
          value: '1',
          label: '多选题'
        },
        {
          value: '2',
          label: '单行题'
        },
        {
          value: '3',
          label: '多行题'
        },
        {
          value: '4',
          label: '量表题'
        },
        {
          value: '5',
          label: '填空题'
        }
      ],
      choices: ['', '']
    }
  },
  computed: {
    questionType: function () {
      var questionType
      if ((this.type === 0 || this.type === '0') && this.checked) questionType = 0
      if ((this.type === 0 || this.type === '0') && !this.checked) questionType = 1
      if ((this.type === 1 || this.type === '1') && this.checked) questionType = 2
      if ((this.type === 1 || this.type === '1') && !this.checked) questionType = 3
      if ((this.type === 2 || this.type === '2') && this.checked) questionType = 4
      if ((this.type === 2 || this.type === '2') && !this.checked) questionType = 5
      if ((this.type === 3 || this.type === '3') && this.checked) questionType = 6
      if ((this.type === 3 || this.type === '3') && !this.checked) questionType = 7
      if ((this.type === 4 || this.type === '4') && this.checked) questionType = 8
      if ((this.type === 4 || this.type === '4') && !this.checked) questionType = 9
      if ((this.type === 5 || this.type === '5') && this.checked) questionType = 10
      if ((this.type === 5 || this.type === '5') && !this.checked) questionType = 11
      return questionType
    }
  },
  methods: {
    del: function (index) {
      if (this.choices[index] !== '') {
        if (!this.editAndSave) {
          this.choices.splice(index, 1)
        } else {
          this.propQues.content.choice.splice(index, 1)
        }
      }
    },
    add: function () {
      if (!this.editAndSave) {
        this.choices.push('')
      } else {
        this.propQues.content.choice.push('')
      }
    },
    cancel: function () {
      this.$emit('getEditMode', false)
    },
    edit: function () {
      this.loading = true
      var request
      var type = this.propQues.questionType
      if (this.checked && (type % 2 !== 0)) {
        type -= 1
      }
      if (!this.checked && (type % 2 === 0)) {
        type += 1
      }
<<<<<<< HEAD
      if (type === '0' || type === 0 || type === '1' || type === 1 || type === '2' || type === 2 || type === '3' || type === 3) {
=======
      if (type === '0' || type === '1' || type === '2' || type === '3') {
>>>>>>> 460121771cf122bcad0945bf344fded9637127d9
        request = {
          'questionType': type,
          'order': this.propQues.order,
          'content': {
            'title': this.propQues.content.title,
            'choice': this.propQues.content.choice
          },
          'questionID': this.propQues.questionID
        }
      } else {
<<<<<<< HEAD
        if (type === '10' || type === '11' || type === 10 || type === 11) {
=======
        if (type === '10' || type === '11') {
>>>>>>> 460121771cf122bcad0945bf344fded9637127d9
          let blanks = []
          let flag = false
          var temp = ''
          for (let i = 0; i < this.propQues.content.title.length; i++) {
            if (this.propQues.content.title[i] !== '_') {
              temp += this.propQues.content.title[i]
            } else {
              while (this.propQues.content.title[i] === '_') {
                flag = true
                i++
              }
              blanks.push(temp)
              temp = ''
              temp += this.propQues.content.title[i]
            }
          }
          blanks.push(temp)
          if (!flag) {
            this.$alert('填空题需要横线___哟')
          }
          request = {
            'questionType': type,
            'order': this.propQues.order,
            'content': {
              'title': blanks
            },
            'questionID': this.propQues.questionID
          }
        } else {
          request = {
            'questionType': type,
            'order': this.propQues.order,
            'content': {
              'title': this.propQues.content.title
            },
            'questionID': this.propQues.questionID
          }
        }
      }
      var url = 'https://afo3wm.toutiao15.com/editAndSaveQuestion'
      this.$axios
        .post(url, request)
        .then(response => {
          this.loading = false
          if (response.data.result.updatedCount === 0) {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
          } else {
            this.$emit('getQues', request)
            this.reload()
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
    },
    submit: function () {
      var request
      if (this.type === '0' || this.type === '1' || this.type === 0 || this.type === 1) {
        request = {
          'type': this.questionType,
          'order': this.order,
          'content': {
            'title': this.title,
            'choice': this.choices
          },
          'questionnaireID': this.QID
        }
      } else {
        if (this.type === '5' || this.type === 5) {
          let blanks = []
          var temp = ''
          for (let i = 0; i < this.title.length; i++) {
            if (this.title[i] !== '_') {
              temp += this.title[i]
            } else {
              while (this.title[i] === '_') {
                i++
              }
              blanks.push(temp)
              temp = ''
              temp += this.title[i]
            }
          }
          blanks.push(temp)
          request = {
            'type': this.questionType,
            'order': this.order,
            'content': {
              'title': blanks
            },
            'questionnaireID': this.QID
          }
        } else {
          request = {
            'type': this.questionType,
            'order': this.order,
            'content': {
              'title': this.title
            },
            'questionnaireID': this.QID
          }
        }
      }
      var url = 'https://afo3wm.toutiao15.com/createQuestion'
      this.loading = true
      this.$axios
        .post(url, request)
        .then(response => {
          this.loading = false
          if (response.data.success) {
            var order = this.order + 1
            this.$message({
              showClose: true,
              message: '第' + (order) + '题提交成功',
              type: 'success'
            })
            var ques = {
              'type': request.ype,
              'order': request.order,
              'content': request.content,
              'questionID': response.data.questionID
            }
            this.$emit('getQues', ques)
            this.reload()
          } else {
            this.$alert(response.data.msg)
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
}
</script>
<style scoped>
.choiceItem {
   width: 300px;
   margin-top: 10px
}
.choiceItem:hover {
  opacity: 0.5;
  margin-top: 10px
}
.icon:hover {
  cursor: move;
  opacity: 0.5;
  margin-top: 10px
}
</style>
