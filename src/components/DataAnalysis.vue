<template>
  <div class="Create">
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
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu default-active="1">
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
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: null,
      UID: this.$router.params.uid
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
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
