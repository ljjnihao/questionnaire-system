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
          <el-main style="background-color: #e9eef3;">
            <div>
              <div>
              <el-card>
                <div style="    font-size: 1.5vw;"><el-input v-model="input0" placeholder="请输入问卷标题"></el-input></div>
                <div style="    font-size: 1vw;">感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</div>
              </el-card>
            </div>
              <!-- 显示题目 -->
            </div>
            <router-view/>
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
                  <el-input v-model="input1" placeholder="您已完成本次问卷，感谢您的帮助与支持"></el-input>
                </div>
              </el-card>
            </div>
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
      input0: '',
      input1: '',
      value: '',
      UID: this.$router.history.current.params.UID,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      options: [{
        value: '选项1',
        label: '正常完成'
      }, {
        value: '选项2',
        label: '提前结束'
      }]
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
        this.$router.push({path: `/create/${this.UID}/one`})
      }
      if (key === '3') {
        this.$router.push({path: `/create/${this.UID}/three`})
      }
      if (key === '4') {
        this.$router.push({path: `/create/${this.UID}/four`})
      }
      if (key === '5') {
        this.$router.push({path: `/create/${this.UID}/five`})
      }
      if (key === '6') {
        this.$router.push({path: `/create/${this.UID}/six`})
      }
      if (key === '13') {
        this.$router.push({path: `/create/${this.UID}/thirteen`})
      }
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
