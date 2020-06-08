<template>
  <div class="information">
     <div>
      <Header v-bind:logged="true" v-bind:uid=this.UID  v-bind:activeindex=1></Header>
    </div>
    <div>
      <el-header>
          <div class="">
                <el-col :span="7"><div class="edit_questionnaire">注册信息</div></el-col>
                <el-col :span="17"></el-col>
          </div>
        </el-header>
      <el-main>
<el-card class="box-card1">
  <div class="wrap">
    <div class="left">
      <img src="../assets/imgs/1.png" width="400px" height="400px"/>
                </div>
                <div class="center">
                </div>
                <div class="right">
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
        <el-col :span="6"><div class="text2">{{createdAt.substring(0,19).replace('T',' ')}}</div></el-col>
    </el-row>
    <el-row class="item">
        <el-col :span="6"><div class="text1">更新日期</div></el-col>
        <el-col :span="6"><div class="text2">{{createdAt.substring(0,19).replace('T',' ')}}</div></el-col>
    </el-row>
                </div>
            </div>
</el-card>

      </el-main>
    </div>
  </div>
</template>
<script>
export default {
  name: 'information',
  components: {
    Header: require('./Header.vue').default
  },
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
<style scoped>
  .text1 {
    font-size: 26px;
    text-align: left;
    color:#AAAAAA;
  }
  .text2 {
    font-size: 26px;
    text-align: left;
    margin-left: 5%;
    width:300px;
  }

  .item {
    margin-bottom: 10%;
    margin-left: 2%;
  }

  .box-card1 {
    margin-left: 10%;
    margin-top: 3%;
    margin-right: 10%;
    width: 80%;
    border-radius: 10px;
  }
  .subtitle {
      margin-bottom: 3%;
      margin-left:3%;
      text-align: left;
  }
  .edit_questionnaire{
  padding-top: 20px;
  text-align: left;
  padding-left:10%;
}
.information{
  height: 100%;
    width:100%;
    margin:0;
    padding:0;
}
.el-main{
  background-color: rgba(244, 243, 243, 0.97);
    width:100%;
    position: absolute;
    top:120px;
    left: 0;
    bottom:0;
    padding:20px;
}
.wrap{
  display:flex;
  flex-direction:row;
  margin:20px;
  }
.center{
width:2px;
text-align:center;
background:#ccc;
}
.left,.right{
flex-grow: 1;
line-height: 30px;
}
.right{
  margin-left:20px;
}
</style>
