<template>
  <div id="app" class="app">
     <el-container>
        <el-header style="height:124px ">
            <el-row>
                <el-col :span="2"><div class="grid-content logo">LOGO</div></el-col>
                <el-col :span="16">
                  <div class="grid-content ">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-menu-item index="1">创建问卷</el-menu-item>
                        <el-menu-item index="2">我的问卷</el-menu-item>
                        <el-menu-item index="3">消息中心</el-menu-item>
                </el-menu></div></el-col>
                    <el-col :span="6"><div class="grid-content">
                        <el-col :span="12"><div class="grid-content"></div></el-col>
                        <el-col :span="12"><div class="grid-content">
                        <el-popover
                        placement="bottom"
                        title="蜡笔小新"
                        width="150"
                        trigger="hover"
                        >
            <div class="line"></div>
            <el-button type="text" icon="el-icon-question
        ">帮助</el-button>
            <div class="line"></div>
                <el-button type="text" icon="el-icon-back" @click="logout">退出</el-button>
            <el-image slot="reference"
            style="border-radius: 100%;width: 60px;height: 60px;"
            :src="url"
            :fit="fill">
            </el-image>
        </el-popover>
            </div>
            </el-col>
            </div></el-col>
        </el-row>
        <div class="line"></div>
        <div class="sub-header"><el-row>
            <el-col :span="2"><div class="grid-content share">发布问卷</div></el-col>
            <el-col :span="19">
  <div class="test">
  <el-steps :active="2" simple>
  <el-step title="编辑" icon="el-icon-edit"></el-step>
  <el-step title="发布" icon="el-icon-upload"></el-step>
  <el-step title="分析" icon="el-icon-picture"></el-step>
</el-steps>
    </div>
       </el-col>
  <el-col :span="3" style="margin-top:10px"><el-button type="primary" plain icon="el-icon-view" @click="preview"> 预 览</el-button></el-col>
</el-row>
    </div>
    </el-header>
    <el-main>
    <div class="main">
    <div class="line"></div>
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
  data () {
    return {
      activeIndex: '1',
      UID: this.$router.history.current.params.UID,
      QID: this.$router.history.current.params.QID,
      url: '123',
      input: '1321871406@qq.com'
    }
  },
  methods: {
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
      console.log(clipboard)
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
  }
  .el-main{
    padding-left:0px;
    padding-right:0px;
    padding-top:0px;
    padding-bottom: 0px;
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
  height: 20%;
  line-height: 20px;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(187, 187, 187, 1);
  margin: auto;
  position: absolute;
  top:0;
  bottom:0;
  right:0;
  left:0;
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
</style>
