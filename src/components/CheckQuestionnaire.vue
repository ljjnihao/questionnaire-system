<template>
  <div class="CheckQuestionnaire">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#000000">
          <el-menu-item id="logo" style="color: #409EFF;">LOGO</el-menu-item>
          <el-menu-item index="1" class="title-item">创建问卷</el-menu-item>
          <el-menu-item index="2" class="title-item">我的问卷</el-menu-item>
          <el-menu-item index="3" class="title-item">消息中心</el-menu-item>
          <el-menu-item index="4" class="title-item">个人信息</el-menu-item>
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
              <el-button type="primary" plain icon="el-icon-view">预览</el-button>
            </div>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="2">
          <el-menu-item index="1">
            <span slot="title" class="asidefont">回收概况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span slot="title" class="asidefont">查看问卷</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span slot="title" class="asidefont">数据分析</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="display-flex">
          <span class="QuestionNaireTitle">{{QTitle}}       回收量：{{RecoveryNum}}</span>
          <el-table :data="tableData" max-height="590" style="width: 500px" class="QuestionNaireTable">
            <el-table-column prop="date" label="查看" width="100">
            </el-table-column>
            <el-table-column prop="name" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="address" label="提交时间" width="300">
            </el-table-column>
          </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '2',
      QTitle: '问卷标题',
      RecoveryNum: null,
      qid: this.$router.history.current.params.QID,
      UID: this.$router.history.current.params.UID,
      tableData: []
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created: function () {
  },
  mounted: function () {
  }
}
</script>

<style scoped>
  .QuestionNaireTable{
    position: relative;
    left: 10%;
  }
  .QuestionNaireTitle{
    float:left;
  }
  .display-flex{
    display: flex;
    flex-direction: column;
    float: left;
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
