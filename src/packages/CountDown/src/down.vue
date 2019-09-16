<template>
  <span>
    {{t}}s
  </span>
</template>

<script>
export default {
  data: ()=> ({
    t: 0
  }),
  props: {
    time: {
      type: Number,
      default: 60
    }
  },
  mounted() {
    this.t = this.time
    let t = setInterval(()=> {
      if(this.t<=0) {
        clearInterval(t)
      } else {
        this.t--
      }
    }, 1000)
  }
}
</script>