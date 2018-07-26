<template>
  <div class="c-loadPage--wrap">
    <div class="circular_wrap">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" :style="{stroke: stroke}" cx="50" cy="50" r="20" fill="none"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'load-page',
  props: {
    stroke: {
      type: String,
      default: '#409eff'
    }
  }
}
</script>

<style scoped lang="less">
.c-loadPage--wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
// loading
.circular_wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}
.circular {
  height: 42px;
  width: 42px;
  -webkit-animation: loading-rotate 2s linear infinite;
          animation: loading-rotate 2s linear infinite;
}
.path {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
          animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #409eff;
  stroke-linecap: round;
}
@-webkit-keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}
@keyframes loading-rotate {
  100% {
    -webkit-transform: rotate(1turn);
            transform: rotate(1turn);
  }
}
@-webkit-keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
@keyframes loading-dash {
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90,150;
    stroke-dashoffset: -120px;
  }
}
</style>
