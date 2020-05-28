<template>
  <div>
    <div class="title">
      <div>题目：</div>
      <el-input v-model="input1" placeholder="请输入题目" style="width:30vw"></el-input>
    </div>
    <div class="title">
      <div>备注：</div>
      <el-input v-model="input2" placeholder="请输入题目" style="width:30vw"></el-input>
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
      <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        style="width:20vw"
        effect="plain"
      >{{tag}}</el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
        effect="plain"
        style="width:20vw"
      ></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput" style="width:20vw" effect="plain">+输入选项</el-button>
    </div>
    <div class="title">
        <el-button type="primary">确认提交</el-button>
         <el-button type="info">取消提交</el-button>
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
      value: '下拉题',
      UID: this.$router.history.current.params.UID,
      options: [
        {
          value: '单选题',
          label: '单选题'
        },
        {
          value: '下拉题',
          label: '下拉题'
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
          value: '矩阵单选题',
          label: '矩阵单选题'
        },

        {
          value: '矩阵多选题',
          label: '矩阵多选题'
        },

        {
          value: '排序题',
          label: '排序题'
        },

        {
          value: '联动题',
          label: '联动题'
        },

        {
          value: '附件题',
          label: '附件题'
        },
        {
          value: '文件描述',
          label: '文件描述'
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
        this.$router.push({path: `/create/${this.UID}/one`})
      }
      if (newvalue === '下拉题') {
        this.$router.push({path: `/create/${this.UID}/two`})
      }
      if (newvalue === '多选题') {
        this.$router.push({path: `/create/${this.UID}/three`})
      }
      if (newvalue === '单行题') {
        this.$router.push({path: `/create/${this.UID}/four`})
      }
      if (newvalue === '多行题') {
        this.$router.push({path: `/create/${this.UID}/five`})
      }
      if (newvalue === '量表题') {
        this.$router.push({path: `/create/${this.UID}/six`})
      }
      if (newvalue === '矩阵单选题') {
        this.$router.push({path: `/create/${this.UID}/seven`})
      }
      if (newvalue === '矩阵多选题') {
        this.$router.push({path: `/create/${this.UID}/eight`})
      }
      if (newvalue === '排序题') {
        this.$router.push({path: `/create/${this.UID}/nine`})
      }
      if (newvalue === '联动题') {
        this.$router.push({path: `/create/${this.UID}/ten`})
      }
      if (newvalue === '附件题') {
        this.$router.push({path: `/create/${this.UID}/eleven`})
      }
      if (newvalue === '文件描述') {
        this.$router.push({path: `/create/${this.UID}/twelve`})
      }
      if (newvalue === '填空题') {
        this.$router.push({path: `/create/${this.UID}/thirteen`})
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
