<template>
<transition name="fade">
  <div class="load" v-if="showLoading" :style="{background: bgWrap}">
    <div class="load_contain" :style="{background: bg, color: color}">
      <div class="preLoading_pane">
        <svg class="circular" viewBox="25 25 50 50">
	        <circle class="path" :style="{stroke: stroke}" cx="50" cy="50" r="20" fill="none"/>
        </svg>
        <p class="title_pane_loading" v-if="(title!='')">{{title}}</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'load',
  data: () => ({
    title: '',
    showLoading: false,
    bg: 'rgba(0,0,0,0.3)',
    color: '#fff',
    stroke: '#fff',
		bgWrap: 'rgba(0,0,0,0)'
  })
}
</script>

<style scoped lang="less">
.load {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0);
  z-index: 99999;
}
.load_contain {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 12px;
  width: 80px;
  height: 80px;
  overflow: hidden;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 10px;
  color: #fff;
  font-size: 14px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  z-index: 99999;
}
.title_pane_loading {
  margin-top: 5px;
  text-align: center;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.preLoading_pane {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
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
