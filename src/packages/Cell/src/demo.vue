<template>
  <div>
    <cell-wrap :styleWrap="{padding: '0 20px'}" :height='68' :width='120'>
      <cell title='手机号'>
        <input type="text" placeholder="请输入身份证号" v-model='id'>
      </cell>
    </cell-wrap>
  </div>
</template>

<script>
// formList formItem 简洁版 移除不实际的属性
import cell from '../index.js'

export default {
  data: ()=> ({
    id: ''
  }),
  components: {
    cellWrap: cell.cellWrap,
    cell: cell.cell
  }
}
</script>