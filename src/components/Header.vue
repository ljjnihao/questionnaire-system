<template>
  <div id="header">
    <el-row class="header-row">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#000000"
          @select="handleSelect"
        >
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px">个人信息</el-menu-item>
          <el-menu-item v-if="seem" style="float: right; margin-right: 40px">
             <el-popover placement="bottom" title="蜡笔小新" width="150" trigger="hover">
              <el-button type="text" icon="el-icon-question
              ">帮助</el-button>
              <div class="line"></div>
              <el-button type="text" icon="el-icon-back" @click="logout">退出</el-button>
              <el-image
                slot="reference"
                style="border-radius: 100%;width: 60px;height: 50px;"
                :src="url"
                :fit="fill"
              ></el-image>
            </el-popover>
          </el-menu-item>
        </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['logged', 'uid', 'activeindex'],
  data () {
    return {
      url: '../assets/imgs/9a8bd34cafb4a6eab0307a88eeb109ba.jpg',
      seem: this.logged,
      UID: this.uid,
      activeIndex: this.activeindex
    }
  },
  methods: {
    logout () {
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    },
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/create/${this.UID}`})
      }
      if (key === '2') {
        this.$router.push({path: `/myQuestionnaire/${this.UID}`})
      }
      if (key === '3') {
        this.$router.push({path: `/information/${this.UID}`})
      }
    }
  }
}
</script>

<style scoped>
.header-row {
    /* height: 80px; */
    background-color: white;
    /* padding: 5px; */
    /* border-bottom: 5px solid rgb(94, 91, 91) */
}
</style>
