<template>
  <div id="subheader">
    <el-row class="header-row">
      <el-col :span="4">
        <div style="font-size:20px;margin-top:10px">{{ funcname }}</div>
      </el-col>
      <el-col :span="15">
              <el-steps :active="currentstep" simple>
                  <el-step title="编辑" icon="el-icon-edit"></el-step>
                  <el-step title="发布" icon="el-icon-upload"></el-step>
                  <el-step title="分析" icon="el-icon-picture"></el-step>
              </el-steps>
      </el-col>
      <el-col :span="5" style="margin-top:10px">
        <el-button type="primary" plain icon="el-icon-view" @click="preview">预 览</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Subheader',
  props: ['funcname', 'step'],
  data () {
    return {
      url: '../assets/imgs/9a8bd34cafb4a6eab0307a88eeb109ba.jpg',
      seem: this.logged,
      currentstep: this.step,
      QID: this.$route.params.QID
    }
  },
  methods: {
    logout () {
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({ path: `/login` })
    },
    preview () {
      let routeData = this.$router.resolve({path: `/preview/${this.QID}`})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
.header-row {
    height: 80px;
    background-color: white;
    padding: 15px;
    border-bottom: 3px solid rgba(240,240,240,1)
}
.el-steps--simple {
    padding: 13px 8%;
    border-radius: 4px;
    background: #FFFFFF;
}
</style>
