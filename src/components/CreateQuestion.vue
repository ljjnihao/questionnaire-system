<template>
  <div>
    <div class="head">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        style="width:100vw"
      >
        <el-menu-item index="0">
          <div class="logo">LOGO</div>
        </el-menu-item>
        <el-menu-item index="1" class="title">创建问卷</el-menu-item>
        <el-menu-item index="2" class="title">我的问卷</el-menu-item>
        <el-menu-item index="3" class="title">消息中心</el-menu-item>
        <el-menu-item index="4" class="title">个人信息</el-menu-item>
        <el-menu-item index="4" style="float: right;">
          <img style="border-radius: 100%;width: 50px;height: 50px" :src="url" alt class="imgs" />
        </el-menu-item>
        <el-menu-item style="float: right;">
          <el-button type="text" @click="logout">退出</el-button>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <el-container>
        <el-header>
          <div class="tou">
            <div style="font-size:1vw">编辑问卷</div>
            <div style="width:50vw">
              <el-steps :active="1">
                <el-step title="编辑" icon="el-icon-edit"></el-step>
                <el-step title="发布" icon="el-icon-upload"></el-step>
                <el-step title="分析" icon="el-icon-picture"></el-step>
              </el-steps>
            </div>
            <div>
              <el-button type="primary" plain icon="el-icon-view" @click="preview">预览</el-button>
              <el-button type="primary" icon="el-icon-check" @click="gotoissue">完成编辑</el-button>
            </div>
          </div>
        </el-header>
        <el-container style="padding-top: 1.5vw;">
          <el-aside width="15vw" style="background-color: #d3dce6;text-align: center;">
              <h5>题目控件</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo" @select="choose"
              >
                <el-menu-item index="1">
                  <span slot="title">单选题</span>
                </el-menu-item>

                <el-menu-item index="3">
                  <span slot="title">多选题</span>
                </el-menu-item>

                <el-menu-item index="4">
                  <span slot="title">单行题</span>
                </el-menu-item>

                <el-menu-item index="5">
                  <span slot="title">多行题</span>
                </el-menu-item>

                <el-menu-item index="6">
                  <span slot="title">量表题</span>
                </el-menu-item>

                <el-menu-item index="13">
                  <span slot="title">填空题</span>
                </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main style="background-color: #e9eef3;height: 77.2vh">
            <div>
              <!-- 显示题目 -->
            </div>
            <router-view/>
          </el-main>
          <input type="hidden" id="order" value=0>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      input0: '',
      input1: '',
      value: '',
      UID: this.$router.history.current.params.UID,
      order: this.$router.history.current.params.order,
      questionnaireID: this.$router.history.current.params.questionnaireID,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      //! don't use arrow function here
      console.log(this.$router)
      localStorage.setItem('user-token', '')
      localStorage.setItem('user-id', '')
      this.$router.push({path: `/login`})
    },
    choose (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/one`})
      }
      if (key === '3') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/three`})
      }
      if (key === '4') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/four`})
      }
      if (key === '5') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/five`})
      }
      if (key === '6') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/six`})
      }
      if (key === '13') {
        this.$router.push({path: `/CreateQuestion/${this.UID}/${this.questionnaireID}/thirteen`})
      }
    },
    preview () {
      console.log(this.$router)
      this.$router.push({ path: `/preview/${this.questionnaireID}` })
    },
    gotoissue () {
      console.log(this.$router)
      this.$router.push({ path: `/issue/${this.questionnaireID}` })
    }
  }
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.head ul {
  width: 100vw;
}
.logo {
  color: #409eff;
  font-size: 2vw;
}
.imgs {
  width: 3vw;
  border-radius: 50%;
}
.title {
  font-size: 1vw;
}
.tou {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1vw;
}
.hyc {
  text-decoration:none;
  color: black;
}
</style>
