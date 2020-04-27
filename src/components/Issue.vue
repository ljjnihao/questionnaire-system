<template>
  <div class="issue">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000000">
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px" route="">我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px" route="">消息中心</el-menu-item>
          <el-menu-item index="4" style="font-size: 20px" route="">个人信息</el-menu-item>
          <div class="demo-image">
               <el-image style="border-radius: 100%;width: 50px;height: 50px; float: right; margin-right: 100px" :src="url"></el-image>
          </div>
        </el-menu>
      </el-header>
      <el-header style="position: relative;top: 10px; border-bottom:3px solid rgba(240,240,240,1)">
        <el-col :span="3"><div class="grid-content bg-purple" style="font-size: 22px;position: relative;left: 28px;top: 7px">发布问卷</div></el-col>
        <el-col :span="12" :offset="3">
          <el-steps :active="2">
            <el-step title="编辑" icon="el-icon-edit"></el-step>
            <el-step title="发布" icon="el-icon-upload"></el-step>
            <el-step title="分析" icon="el-icon-s-data"></el-step>
          </el-steps>
        </el-col>
        <el-col :span="3" :offset="3">
          <el-button type="primary" plain icon="el-icon-view" size="medium" style="margin-top:10px" @click="preview">预览</el-button>
        </el-col>
      </el-header>
      <el-main style="padding: 0px; margin-top: 10px; text-align: center">
        <el-row class="content" style="background-color: rgba(242,242,242,1)">
          <el-col  :xs="12" :sm="12" :md="12" :lg="20" :xl="20">
            <div style="margin-top: 250px; font-size: 40px">开启发布后,即可分享问卷</div>
            <el-button type="primary" icon="el-icon-check" style="height: 80px;width: 300px;font-size: 40px;margin-top: 30px" @click="publish">发布问卷</el-button>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="4" :xl="4" style="background-color: #ffffff; height: 100%">
            <div style="border-bottom:1px solid rgba(240,240,240,1); height: 60px">
              <i class="el-icon-s-operation" style="font-size: 25px; color: #409EFF; margin-top: 20px">问卷设置</i>
            </div>
            <div style="margin-top: 30px">
              <span>设置开始时间</span>
              <el-switch
                v-model="switch1"
                active-color="#13ce66"
                inactive-color="#DCDFE6">
              </el-switch>
              <div v-if="switch1" class="clock">
                <el-row class="set-clock">
                  <el-date-picker v-model="startDate" type="date" placeholder="选择日期" style="width: 150px"></el-date-picker>
                </el-row>
                <el-row  class="set-clock">
                  <el-time-select
                    v-model="startTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30'
                    }"
                    placeholder="选择时间" style="width: 150px">
                  </el-time-select>
                </el-row>
              </div>
            </div>
            <div style="margin-top: 30px">
              <span>设置结束时间</span>
              <el-switch v-model="switch2" active-color="#13ce66" inactive-color="#DCDFE6"></el-switch>
              <div v-if="switch2" class="clock">
                <el-row class="set-clock">
                  <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期" style="width: 150px" >
                  </el-date-picker>
                </el-row>
                <el-row class="set-clock">
                  <el-time-select
                    v-model="endTime"
                    :picker-options="{
                      start: '08:30',
                      step: '00:15',
                      end: '18:30'
                    }"
                    placeholder="选择时间" style="width: 150px">
                  </el-time-select>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: 'Issue',
  data () {
    return {
      switch1: false,
      switch2: false,
      activeIndex: '1',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      QID: this.$route.params.questionnaireID,
      link: ''
    }
  },
  methods: {
    preview () {
      this.$router.push({path: `/fillQuestionnaire/${this.QID}`})
    },
    publish () {
      this.loading = true
      this.$axios
        .post('https://afo3wm.toutiao15.com/publishWithDate', {
          questionnaireID: this.QID,
          startDate: this.startDate,
          endDate: this.endDate
        })
        .then(response => {
          this.loading = false
          console.log(response.data)
          if (response.data.state) {
            console.log('success')
            // this.$router.push({ path: `/issue2/${this.QID}` })
          } else {
            this.$message('发布失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          this.$router.push('/non-existing')
        })
    }
  }
}
</script>

<style scoped>
.el-container {
  background-size: 100% 100%;
  height: 100%;
  position: absolute;
  width: 100%;
}
.content {
  height: 100%
}
.clock {
  margin-top: 10px
}
.set-clock {
  margin-top: 10px
}
</style>
