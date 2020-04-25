<template>
  <div class="creat">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" text-color="#000000">
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
        </el-menu>
      </el-header>
      <el-container>
        <el-header style="position: relative;top: 10px">
          <el-row>
            <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 22px;position: relative;left: 28px;top: 7px">发布问卷</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light" style="position: relative;left: 150px">
              <el-steps :active="2">
                <el-step title="编辑" icon="el-icon-edit"></el-step>
                <el-step title="发布" icon="el-icon-upload"></el-step>
                <el-step title="分析" icon="el-icon-s-data"></el-step>
              </el-steps>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple" style="position: relative;left: 490px">
              <el-button type="primary" plain icon="el-icon-view" size="medium">预览</el-button>
            </div></el-col>
          </el-row>
        </el-header>
      </el-container>
      <el-container style="height: 780px;position: relative;top: 10px">
        <el-aside width="1500px" style="background-color: #F2F6FC;font-size: 30px;">
          <a style="position: relative;top: 250px;left: 500px">开启发布后,即可分享问卷</a>
          <Br/>
          <el-button type="primary" icon="el-icon-check" style="height: 80px;width: 300px;font-size: 40px;position: relative;top: 350px;left: 515px">发布问卷</el-button>
        </el-aside>
        <el-main style="background-color: #EBEEF5">
          <i class="el-icon-s-operation" style="font-size: 25px;position: relative;left: 110px">问卷设置</i>
          <el-divider></el-divider>
          <div style="position: relative;left: 110px">
            <a>设置开始时间</a>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#DCDFE6">
            </el-switch>
            <br>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期" style="width: 150px" >
            </el-date-picker>
            <br>
            <br>
            <el-time-select
              v-model="value"
              :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
              placeholder="选择时间" style="width: 150px">
            </el-time-select>
            <br><br><br>
            <a>设置结束时间</a>
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#DCDFE6">
            </el-switch>
            <br>
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期" style="width: 150px" >
            </el-date-picker>
            <br>
            <br>
            <el-time-select
              v-model="value"
              :picker-options="{
    start: '08:30',
    step: '00:15',
    end: '18:30'
  }"
              placeholder="选择时间" style="width: 150px">
            </el-time-select>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }},
      activeIndex: '1',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      value: 0,
      value1: ''
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

</style>
