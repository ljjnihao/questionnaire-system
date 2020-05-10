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
        <el-menu-item style="float: right;">
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
              <el-button type="primary" plain icon="el-icon-view">预览</el-button>
              <el-button type="primary" icon="el-icon-check">完成编辑</el-button>
            </div>
          </div>
        </el-header>
        <el-container style="padding-top: 1.5vw;">
          <el-aside width="15vw" style="background-color: #d3dce6;text-align: center;">
            <h5>题目控件</h5>
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
            >
              <el-menu-item index="13">
                <span slot="title"><router-link to="/" class="hyc">单选题</router-link></span>
              </el-menu-item>
              <el-menu-item index="1">
                <span slot="title"><router-link to="/two" class="hyc">下拉题</router-link></span>
              </el-menu-item>
              <el-menu-item index="2">
                <span slot="title"><router-link to="/three" class="hyc">多选题</router-link></span>
              </el-menu-item>
              <el-menu-item index="3">
                <span slot="title"><router-link to="/four" class="hyc">单行题</router-link></span>
              </el-menu-item>
              <el-menu-item index="4">
                <span slot="title"><router-link to="/five" class="hyc">多行题</router-link></span>
              </el-menu-item>
              <el-menu-item index="5">
                <span slot="title"><router-link to="/six" class="hyc">量表题</router-link></span>
              </el-menu-item>
              <el-menu-item index="6">
                <span slot="title"><router-link to="/seven" class="hyc">矩阵单选题</router-link></span>
              </el-menu-item>
              <el-menu-item index="7">
                <span slot="title"><router-link to="/eight" class="hyc">矩阵多选题</router-link></span>
              </el-menu-item>
              <el-menu-item index="8">
                <span slot="title"><router-link to="/nine" class="hyc">排序题</router-link></span>
              </el-menu-item>
              <el-menu-item index="9">
                <span slot="title"><router-link to="/ten" class="hyc">联动题</router-link></span>
              </el-menu-item>
              <el-menu-item index="10">
                <span slot="title"><router-link to="/eleven" class="hyc">附件题</router-link></span>
              </el-menu-item>
              <el-menu-item index="11">
                <span slot="title"><router-link to="/twelve" class="hyc">文件描述</router-link></span>
              </el-menu-item>
              <el-menu-item index="12">
                <span slot="title"><router-link to="/thirteen" class="hyc">填空题</router-link></span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main style="background-color: #e9eef3;">
            <div>
              <div>
                <el-card>
                  <div style="    font-size: 1.5vw;">问卷标题</div>
                  <div style="    font-size: 1vw;">感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</div>
                </el-card>
              </div>
              <div style="border: 1px solid;margin: 1vw 0;">题目</div>
              <div>
                <el-card>
                  <div style="display:flex;    align-items: center;font-size:1vw;    justify-content: center;">
                    <div>
                      <el-select v-model="value" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div>时显示</div>
                  </div>
                  <div style="text-align: center;
    font-size: 1vw;">
                    您已完成本次问卷，感谢您的帮助与支持
                  </div>
                </el-card>
              </div>
            </div>
            <router-view/>
          </el-main>
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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      options: [{
        value: '选项1',
        label: '正常完成'
      }, {
        value: '选项2',
        label: '提前结束'
      }],
      value: ''
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
