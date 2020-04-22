<template>
  <div class="Create">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000000">
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">消息中心</el-menu-item>
          <el-menu-item index="4" style="font-size: 20px">个人信息</el-menu-item>
            <div class="demo-image">
              <div class="block">
                {{ fit }}
                <el-image
                  style="border-radius: 100%;width: 60px;height: 60px;position: absolute;left: 1050px;"
                  :src="url"
                  ></el-image>
              </div>
            </div>
          <!-- </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-container>
        <el-header style="position: relative;top: 10px">
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 22px;position: relative;left: 28px;top: 7px">编辑问卷</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light" style="position: relative;left: 150px">
              <el-steps :active="1">
                <el-step title="编辑" icon="el-icon-edit"></el-step>
                <el-step title="发布" icon="el-icon-upload"></el-step>
                <el-step title="分析" icon="el-icon-s-data"></el-step>
              </el-steps>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" style="position: relative;left: 350px">
              <el-button type="primary" plain icon="el-icon-view">预览</el-button>
              <el-button type="primary" icon="el-icon-check">完成编辑</el-button>
              <el-button type="primary" @click="logout">logout test</el-button>
            </div></el-col>
          </el-row>
        </el-header>
        <!-- <el-container style="height: 100%">
          <el-aside width="200px" style="background-color: #F2F6FC">
            <el-tag effect="dark" style="position: relative;top: 70px;left: 55px">题目控件</el-tag>
          </el-aside>
          <el-main style="background-color: #EBEEF5">
            <el-container>
              <el-header>Header</el-header>
              <el-main>Main</el-main>
              <el-footer>Footer</el-footer>
            </el-container>
          </el-main>
        </el-container> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      UID: this.$router.params.uid
    }
  },
  methods: {
    logout () {
      //! don't use arrow function here
      console.log(this.$router)
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    }
  }
}
</script>

<style scoped>

</style>
