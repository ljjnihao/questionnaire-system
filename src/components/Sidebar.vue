<template>
  <div id="header">
    <el-menu  v-bind:default-active="active"
                class="el-menu-vertical-demo" @select="handleSelect2">
          <el-menu-item index="1" class="sidebar-item">
            <span class="icon">
                <i class="el-icon-pie-chart" style="font-size:40px; position: relative; width:100%;display:block"></i>
                <span slot="title" class="hyc icon-name" style="position: relative;">回收概况</span>
            </span>
          </el-menu-item>
          <el-menu-item index="2" class="sidebar-item">
            <i class="el-icon-odometer" style="font-size:40px; position: relative; width:100%;display:block"></i>
            <span slot="title" class="hyc icon-name">查看问卷</span>
          </el-menu-item>
          <el-menu-item index="3" class="sidebar-item">
            <i class="el-icon-tickets" style="font-size:40px; position: relative; width:100%;display:block"></i>
            <span slot="title" class="hyc icon-name">数据分析</span>
          </el-menu-item>
          <el-menu-item index="4" class="sidebar-item">
            <i class="el-icon-s-data" style="font-size:40px; position: relative; width:100%;display:block"></i>
            <span slot="title" class="hyc icon-name">关联分析</span>
          </el-menu-item>
          <el-menu-item index="5" class="sidebar-item">
            <i class="el-icon-data-line" style="font-size:40px; position: relative; width:100%;display:block"></i>
            <span slot="title" class="hyc icon-name">交叉分析</span>
          </el-menu-item>
        </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['activeindex'],
  data () {
    return {
      active: this.activeindex,
      QID: this.$route.params.QID,
      UID: this.$route.params.UID
    }
  },
  methods: {
    handleSelect2 (key, keyPath) {
      if (key === '1') {
        this.$router.push({path: `/RecoveryProfile/${this.UID}/${this.QID}`})
      }
      if (key === '2') {
        this.$router.push({path: `/CheckQuestionnaire/${this.UID}/${this.QID}`})
      }
      if (key === '3') {
        this.$router.push({path: `/Statistic/${this.UID}/${this.QID}`})
      }
      if (key === '4') {
        this.$router.push({path: `/relative/${this.UID}/${this.QID}`})
      }
      if (key === '5') {
        this.$router.push({path: `/cross/${this.UID}/${this.QID}`})
      }
    }
  }
}
</script>

<style scoped>
.sidebar-item {
    height: 110px;
    display: block;
    padding: 20px
}
.icon {
    display: block
}
</style>
