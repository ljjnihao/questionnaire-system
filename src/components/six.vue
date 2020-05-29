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
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item1 in options1"
          :key="item1.value"
          :label="item1.label"
          :value="item1.value"
        ></el-option>
      </el-select>
    </div>
    <div class="title">
  量表范围：<el-input-number v-model="num" :min="1" :max="10" label="描述文字"></el-input-number>
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
      value1: '必填',
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
      ],
      options1: [
        {
          value: '必填',
          label: '必填'
        },
        {
          value: '选填',
          label: '选填'
        }
      ]
    }
  },
  watch: {
    value (newvalue, oldvalue) {
      if (newvalue === '单选题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/one`})
      }
      if (newvalue === '多选题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/three`})
      }
      if (newvalue === '单行题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/four`})
      }
      if (newvalue === '多行题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/five`})
      }
      if (newvalue === '量表题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/six`})
      }
      if (newvalue === '填空题') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.$router.history.current.params.questionnaireID}/thirteen`})
      }
    }
  },
  methods: {
    createquestion (form) {
      var type
      if (this.value1 === '必填') {
        type = 8
      } else {
        type = 9
      }
      let obj = {'title': this.input1, 'mark': this.num}
      console.log(obj)
      var order = parseInt(window.parent.document.getElementById('order').value)
      this.loading = true
      this.$axios
        .post('https://afo3wm.toutiao15.com/createQuestion', {
          content: obj,
          order: order,
          questionnaireID: this.$router.history.current.params.questionnaireID,
          type: type
        })
        .then(response => {
          this.loading = false
          console.log(response)
          if (response.data.success) {
            this.$alert('第' + (order + 1) + '题提交成功')
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
