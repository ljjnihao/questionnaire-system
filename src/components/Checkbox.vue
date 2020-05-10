<template>
  <div class="checkbox">
      <div>
        <input type="checkbox" v-model="all" name="all">
        <label for="all">全选</label>
      </div>
      <div v-for="(item,order) in items" :key=order>
        <input  type="checkbox" v-model="item.checked" name="item.title">
        <label for="item.title">{{item.title}}</label>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      all: false,
      items: [
        {
          title: 'item1',
          checked: false,
          order: 1
        },
        {
          title: 'item2',
          checked: true,
          order: 2
        }
      ]
    }
  },
  watch: {
    all: function (val) {
      console.log(val)
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].checked = val
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
