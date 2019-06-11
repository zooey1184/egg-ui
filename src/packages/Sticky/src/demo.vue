<template>
  <div>
    <sticky>hello</sticky>
    <ul>
      <li v-for='item in 100' :key='item'>{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    sticky: ()=> import ('./sticky.vue')
  }
}
</script>