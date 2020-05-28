<template>
  <div>
    <div class="title">
      <div>题目：</div>
      <el-input v-model="input1" placeholder="请输入题目" style="width:30vw"></el-input>
    </div>
    <div class="title">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="title">
        <el-button type="primary" @click="createquestion('input1')">提交</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dynamicTags: [], // 提供的选项
      inputVisible: false,
      inputValue: '',
      input1: '',
      input2: '',
      value: '多行题',
      UID: this.$router.history.current.params.UID,
      options: [
        {
          value: '单选题',
          label: '单选题'
        },
        {
          value: '多选题',
          label: '多选题'
        },
        {
          value: '单行题',
          label: '单行题'
        },
        {
          value: '多行题',
          label: '多行题'
        },
        {
          value: '量表题',
          label: '量表题'
        },
        {
          value: '填空题',
          label: '填空题'
        }
      ]
    }
  },
  watch: {
    value (newvalue, oldvalue) {
      if (newvalue === '单选题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/one`})
      }
      if (newvalue === '多选题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/three`})
      }
      if (newvalue === '单行题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/four`})
      }
      if (newvalue === '多行题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/five`})
      }
      if (newvalue === '量表题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/six`})
      }
      if (newvalue === '填空题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/thirteen`})
      }
    }
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    createquestion (form) {
      var order = parseInt(window.parent.document.getElementById('order').value)
      this.loading = true
      this.$axios
        .post('https://afo3wm.toutiao15.com/createQuestion', {
          title: this.input1,
          order: order,
          questionnaireID: this.$router.history.current.params.questionnaireID,
          type: 4
        })
        .then(response => {
          this.loading = false
          console.log(response)
          if (response.data.success) {
            this.$alert('第' + order + '题提交成功')
            order = order + 1
            window.parent.document.getElementById('order').value = order
          } else {
            this.$alert(response.data.msg)
          }
        })
    }
  }
}
</script>
<style scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
