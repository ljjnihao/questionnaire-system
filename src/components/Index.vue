<template>
  <div class="index">
    <el-container  v-bind:style="{ 'background-image': 'url(' + require('../assets/imgs/背景.jpg') + ')' }">
      <el-header style="text-align: left; font-size: 20px">
        <el-row :gutter="20">
            <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" background-color="transparent">
                <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
                <el-menu-item index="1" style="font-size: 20px">首页</el-menu-item>
                <el-menu-item index="2" style="font-size: 20px; float: right">
                    <router-link to="/register" style="margin-right: 10px">
                        <el-button type="primary" plain>注册</el-button>
                    </router-link>
                </el-menu-item>
                <el-menu-item index="3" style="font-size: 20px; float: right">
                    <router-link to="/login" style="margin-right: 10px">
                        <el-button type="primary">登录</el-button>
                    </router-link>
                </el-menu-item>
            </el-menu>
            <!-- </el-col> -->
            <!-- <el-col :xs="24" :sm="{span:12, offset:6}" style="text-align: right; padding: 10px">
                <router-link to="/login" style="margin-right: 10px">
                    <el-button type="primary">登录</el-button>
                </router-link>
                <router-link to="/register" style="margin-right: 10px">
                    <el-button type="primary" plain>注册</el-button>
                </router-link>
            </el-col> -->
        </el-row>
      </el-header>

      <el-main>
          <el-row class="content" :gutter="20">
            <el-col :xs="24" :sm="{span: 6}">
                <router-link to="/login">
                    <el-button type="primary" class="wider-button">马上使用</el-button>
                </router-link>
            </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'Index',
  data () {
    return {
      username: '',
      password: '',
      secPassword: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container {
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position:fixed
}
.content {
  margin-top: 500px;
}
.el-button {
  width: 100px;
}
.wider-button {
  width: 200px;
  height: 50px;
}
</style>
