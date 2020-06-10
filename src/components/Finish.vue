<template>
  <div class="index">
    <el-container style="background-color: #ffffff; margin-top: 50px; padding: 30px">
      <el-main>
        <el-row class="content" :gutter="20">
          <el-col :xs="{span:12,offset:6}" :lg="{span: 10, offset: 6}" :xl="{span: 10, offset: 6}">
          <h1 style="font-weigth: bold">Congratulation！</h1>
          <h3>问卷已完成</h3>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  margin-top: 300px;
}
</style>
