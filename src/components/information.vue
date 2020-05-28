<template>
  <div class="information">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" text-color="#000000" @select="handleSelect">
          <el-menu-item index="0" style="font-size: 35px;color: #409EFF">LOGO</el-menu-item>
          <el-menu-item index="1" style="font-size: 20px">创建问卷</el-menu-item>
          <el-menu-item index="2" style="font-size: 20px" >我的问卷</el-menu-item>
          <el-menu-item index="3" style="font-size: 20px" >个人信息</el-menu-item>
          <div class="demo-image">
               <el-image style="border-radius: 100%;width: 50px;height: 50px; float: right; margin-right: 100px" :src="url"></el-image>
          </div>
        <el-menu-item style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </el-menu-item>
        </el-menu>
      </el-header>
      <el-main style='
background-color: rgba(243, 245, 246, 1);'>
<div class="subtitle">
<span style='font-size:3em;'>注册信息</span>
</div>
<el-card class="box-card1">
    <el-row class="item">
        <el-col :span="6"><div class="text1">注册ID</div></el-col>
        <el-col :span="6"><div class="text2">{{UID}}</div></el-col>
    </el-row>
    <el-row class="item">
        <el-col :span="6"><div class="text1">用户名</div></el-col>
        <el-col :span="6"><div class="text2">{{userName}}</div></el-col>
    </el-row>
    <el-row class="item">
        <el-col :span="6"><div class="text1">用户令牌</div></el-col>
        <el-col :span="6"><div class="text2">{{token}}</div></el-col>
    </el-row>
    <el-row class="item">
        <el-col :span="6"><div class="text1">创建日期</div></el-col>
        <el-col :span="6"><div class="text2">{{createdAt}}</div></el-col>
    </el-row>
    <el-row class="item">
        <el-col :span="6"><div class="text1">更新日期</div></el-col>
        <el-col :span="6"><div class="text2">{{createdAt}}</div></el-col>
    </el-row>
</el-card>
      </el-main>
    </el-container>

  </div>
</template>
<script>
export default {
  name: 'information',
  data () {
    return {
      activeIndex: '3',
      UID: this.$router.history.current.params.UID,
      token: '',
      userName: '',
      createdAt: '',
      updatedAt: '',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  mounted: function () {
    this.getInfo()
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
    logout () {
      //! don't use arrow function here
      console.log(this.$router)
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    },
    preview () {
      this.$router.push({path: `/information/${this.UID}`})
    },
    getInfo: function () {
      this.$axios
        .get('https://afo3wm.toutiao15.com/getUserInfo', {
          params: {
            UID: this.UID
          }
        })
        .then(response => {
          this.userName = response.data.userName
          this.token = response.data.token
          this.createdAt = response.data.createdAt
          this.updatedAt = response.data.updatedAt
        })
        .catch(function (error) {
          console.log(error)
          this.$router.push('/non-existing')
        })
    }
  }
}
</script>
<style>
  .text1 {
    font-size: 26px;
    text-align: left;
    color:#AAAAAA;
  }
  .text2 {
    font-size: 26px;
    text-align: left;
    margin-left: 5%;
  }

  .item {
    margin-bottom: 10%;
    margin-left: 2%;
  }

  .box-card1 {
    width: 38.2%;
    border-radius: 30px;
    margin-left:5%;
  }
  .subtitle {
      margin-bottom: 3%;
      margin-left:5%;
      text-align: left;
  }

</style>
