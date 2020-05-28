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
      量表类型：<el-select v-model="value1" placeholder="请选择">
    <el-option
      v-for="item1 in options1"
      :key="item1.value"
      :label="item1.label"
      :value="item1.value">
    </el-option>
  </el-select>
  量表范围：<el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
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
      num: 1,
      dynamicTags: [], // 提供的选项
      inputVisible: false,
      inputValue: '',
      input1: '',
      input2: '',
      UID: this.$router.history.current.params.UID,
      options1: [
        {
          value: '满意度',
          label: '满意度'
        },
        {
          value: '认同度',
          label: '认同度'
        },
        {
          value: '重要度',
          label: '重要度'
        },
        {
          value: '愿意度',
          label: '愿意度'
        },
        {
          value: '符合度',
          label: '符合度'
        }
      ],
      value1: '满意度',
      value: '量表题',
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
      let obj = {'title': this.input1, 'scaletype': this.value1, 'scalerange': this.num}
      console.log(obj)
      var order = parseInt(window.parent.document.getElementById('order').value)
      this.loading = true
      this.$axios
        .post('https://afo3wm.toutiao15.com/createQuestion', {
          title: obj,
          order: order,
          questionnaireID: this.$router.history.current.params.questionnaireID,
          type: 5
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
