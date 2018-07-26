<template>
  <div>
    <img class="c-failPage__img" src="../assets/error-page.png" alt="">
    <p class="c-failPage__p">{{tip}}</p>
  </div>
</template>


<script>
export default {
  name: 'fail-page',
  props: {
    tip: {
      type: [String, Number],
      default: '一定是哪里出错了，才让我们错过！'
    }
  }
}
</script>

<style lang="less" scoped>
.c-failPage__img {
  width: 200px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  margin-top: 80px;
}
.c-failPage__p {
  font-size: 13px;
  text-align: center;
  color: #999;
  margin-top: 10px;
}
</style>



