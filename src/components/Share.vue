<template>
  <div class="information">
     <el-container>
        <el-header>
          <div>
            <Header v-bind:logged="true" v-bind:uid=this.UID  v-bind:activeindex=1></Header>
            <el-driver></el-driver>
          </div>
    </el-header>
     <el-header>
        <Subheader funcname="分享问卷" step="2" v-bind:uid="this.UID" v-bind:qid="this.QID"></Subheader>
      </el-header>
    <el-main>
    <div class="main">
    <div class="share-box">
    <div class="share-link-word"><h2><b>分享链接</b></h2></div>
    <el-row>
    <el-col :span="18"><el-input class="change_disable_css" id="copy_link" :data-clipboard-text="input" v-model="input" :readonly="true"></el-input></el-col>
    <el-col :span="6"><el-button data-clipboard-action="copy" data-clipboard-target="#copy_link" type="primary" id="copy_button"
    @click="copy">复制链接</el-button></el-col>
    </el-row>
    </div>
    </div>
    </el-main>
  </el-container>
</div>
</template>
<script>
import Clipboard from 'clipboard'
export default {
  components: {
    Header: require('./Header.vue').default,
    Subheader: require('./Subheader.vue').default
  },
  data () {
    return {
      activeIndex: '2',
      UID: this.$router.history.current.params.UID,
      QID: this.$router.history.current.params.QID,
      url: '123',
      input: window.location.href.split('#')[0] + '#/' + 'fillQuestionnaire/' + this.$router.history.current.params.QID
    }
  },
  methods: {
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
    },
    preview () {
      this.$router.push({path: `/fillQuestionnaire/${this.QID}`})
    },
    logout () {
      //! don't use arrow function here
      localStorage.clear()
      this.$router.push('/')
    },
    copy () {
      var clipboard = new Clipboard('#copy_button')
      clipboard.on('success', e => {
        console.log('复制成功')
        this.$message({
          message: '链接已成功复制到剪贴板！',
          type: 'success'
        })
        // clipboard.destory()
      })
      clipboard.on('error', e => {
        this.$message({
          message: '复制失败，请手动选择复制！',
          type: 'error'
        })
        // clipboard.destory()
      })
    }
  }
}

</script>
<style scoped>
  .el-header{
    background-color: #ffffff;
    margin-top:1px;
    padding-left:0px;
    padding-right:0px;
  }
 .el-main {
    background-color: rgba(244, 243, 243, 0.97);
    width:100%;
    position: absolute;
    top:120px;
    left: 0;
    bottom:0;
  }
  .el-row {
      margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.line{
    border-top: 1px solid #ddd;
    text-align: center;
}
.logo{
  height:60px;
  color:#409EFF;
  font-size:25px;
  text-align:center;
  line-height:60px;
}
.el-menu.el-menu--horizontal{
  border-bottom:0px;
}
.sub-header{
  height:60px
}
.share{
  height:60px;
  line-height:60px;
  text-align:center
}
.el-steps{
  width:450px;
}
.test{
  margin-top:7px;
  margin-left:30%;
}
.share-box{
  width: 80%;
  height: 25%;
  line-height: 20px;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  margin-left: 10%;
  margin-right:10%;
  margin-top:10%;
  position: absolute;
  background-color: #ffffff;
}
.share-link{
  margin-left:10%;
  width: 90%;
  height: 40px;
  line-height: 26px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
  text-align: left;
  font-family: Roboto;
  border: 1px solid rgba(187, 187, 187, 1);
}
.share-link-word{
 margin-left:5%;
 margin-top:3%;
 margin-bottom:3%;
 width: 100px;
}
.el-steps--simple {
    background: #fff;
}
.change_disable_css{
  background-color: #ffffff;
  color:#000000;
  margin-left:8%;
}
.information{
    height: 100%;
    width:100%;
    margin:0;
    padding:0;
  }
</style>
