<template>
  <div id="QuestionsBar">
    <div class="controller">
       <span style="font-weight:bold">题目控件</span>
    </div>
    <el-menu class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="0" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-edit-outline"></i>
                <span slot="title">单选题</span>
            </span>
          </el-menu-item>
           <el-menu-item index="1" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-finished"></i>
                <span slot="title">多选题</span>
            </span>
          </el-menu-item>
          <el-menu-item index="2" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-document-remove"></i>
                <span slot="title">单行题</span>
            </span>
          </el-menu-item>
          <el-menu-item index="3" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-document"></i>
                <span slot="title">多行题</span>
            </span>
          </el-menu-item>
          <el-menu-item index="4" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-magic-stick"></i>
                <span slot="title">量表题</span>
            </span>
          </el-menu-item>
          <el-menu-item index="5" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-chat-square"></i>
                <span slot="title">填空题</span>
            </span>
          </el-menu-item>
        </el-menu>
  </div>
</template>

<script>
export default {
  name: 'QuestionsBar',
  data () {
    return {
      active: this.activeindex,
      QID: this.$route.params.QID,
      UID: this.$route.params.UID
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '0') {
      }
    }
  }
}
</script>

<style scoped>
.sidebar-item {
    height: 70px;
    display: block;
    padding: 10px;
}
.icon {
    display: block;
    height: 50px;
    border: 1px dotted rgba(212, 216, 220, 1);
    /* text-align: left; */
    text-align: center
}
.controller {
    background-color: #409EFF;
    color: white;
    height: 30px;
    margin: 20px;
    text-align: center;
    padding: 10px
}
</style>
