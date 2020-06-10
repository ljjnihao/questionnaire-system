<template>
  <div class="issue">
    <el-container>
      <div>
        <Header logged="true" v-bind:uid="this.UID" activeindex="1"></Header>
      </div>
      <el-header>
        <Subheader funcname="发布问卷" step="2" v-bind:uid="this.UID" v-bind:qid="this.QID"></Subheader>
      </el-header>
      <el-main style="padding: 0px; text-align: center">
        <el-row class="content" style="background-color: rgba(242,242,242,1)">
          <el-col  :xs="12" :sm="12" :md="12" :lg="20" :xl="20" class="btn-area">
            <div style="font-size: 40px">开启发布后,即可分享问卷</div>
            <el-button type="primary" icon="el-icon-check" style="height: 70px;width: 500px;font-size: 40px;margin-top: 30px" @click="publish">获得问卷链接</el-button>
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
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default
  },
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
      UID: this.$route.params.UID,
      link: ''
    }
  },
  methods: {
    preview () {
      this.$router.push({path: `/fillQuestionnaire/${this.QID}`})
    },
    publish () {
      this.loading = true
      if (this.startDate === '' && this.endDate === '') {
        this.$alert('必须要填写发布或结束时间哟')
      } else {
        this.$axios
          .post('https://afo3wm.toutiao15.com/publishWithDate', {
            questionnaireID: this.QID,
            startDate: this.startDate,
            endDate: this.endDate
          })
          .then(response => {
            this.loading = false
            console.log(response.data)
            if (response.data.state === 'success') {
              console.log('success')
              this.$router.push({ path: `/ShareQuestionnaire/${this.QID}/${this.UID}` })
            } else {
              this.$message('发布失败,问卷不存在')
            }
          })
          .catch(function (error) {
            console.log(error)
            this.$router.push('/non-existing')
          })
      }
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
.btn-area {
  /* background-color: white; */
  margin-top: 300px;
  /* padding: 100px; */
}
</style>
