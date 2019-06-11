<template>
  <div>
    <page>
    <div>
      <p>我是页面二</p>
      <button class="btn" @click="goBack">返回</button>
    </div>
  </page>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$nav.back()
    }
  },
  mounted() {
    this.$nav.listen('two', 'back', ()=> {
      console.log('i am back event');
    })
  }
}
</script>

