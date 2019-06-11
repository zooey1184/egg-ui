<template>
  <div v-if='showForm' class="formPost--full">
    <form :action="action" ref='submit' :method="type">
      <div  v-if='paramsData.length>0'>
        <input 
        v-for='(item, index) in paramsData' 
        :key='index' 
        type="hidden" 
        :value='item.value' 
        :name='item.name'>
      </div>
      <input class="submit__form" type="submit" @click='submitFn'>
    </form>
  </div>
</template>

<script>
export default {
  name: 'form-page',
  data: ()=> ({
    action: '',
    type: 'POST',
    params: [],
    showForm: false,
  }),
  watch: {
    showForm: function(n,o) {
      if(n) {
        setTimeout(()=> {
          this.showForm = false
        }, 200)
      }
    }
  },
  computed: {
    paramsData: function() {
      let p = this.params
      if(p instanceof Array && p[0].name!=='') {
        return p
      }else if (p instanceof Object) {
        let arr = []
        for(let i in p) {
          arr.push({
            name: i,
            value: p[i]
          })
        }
        return arr
      }
    }
  },
  methods: {
    submitFn() {
      setTimeout(()=> {
        let formD = this.$refs.submit 
        formD.submit()
      }, 100)
    }
  }
}
</script>

<style lang="less">
.formPost--full {
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  z-index: -10;
  opacity: 0;
  .submit__form {
    position: absolute;
    width: 0;
    height: 0;
  }
}
</style>

