<template>
  <div id="subheader">
    <el-row class="header-row">
      <el-col :span="6">
        <div class="funcname">{{ funcname }}</div>
      </el-col>
      <el-col :span="12">
              <el-steps :active="currentstep" simple>
                  <el-step title="编辑" icon="el-icon-edit"></el-step>
                  <el-step title="发布" icon="el-icon-upload"></el-step>
                  <el-step title="分析" icon="el-icon-picture"></el-step>
              </el-steps>
      </el-col>
      <el-col :span="6" style="margin-top:10px">
        <el-button calss="button" type="primary" plain icon="el-icon-view" @click="preview">预 览</el-button>
      </el-col>
    </el-row>
    <el-driver></el-driver>
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
    height: 60px;
    background-color: white;
}
.el-steps--simple {
    padding: 13px 8%;
    border-radius: 4px;
    background: #FFFFFF;
    margin-top:1%;
}
.funcname{
  padding-top: 20px;
  text-align: left;
  padding-left:10%;
}
.el-button{
  margin-left: 40%;
}
</style>
