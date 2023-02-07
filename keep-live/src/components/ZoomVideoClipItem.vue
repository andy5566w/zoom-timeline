<template>
  <div class="zoom-clip-wrap select-none" :style="zoomClipWrapStyle">
    <div class="border border-sky-500 transition duration-150 ease-in-out">
      video
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZoomVideoClipItem',
  props: {
    videoEndTime: Number,
    currentUnit: Object,
    startTime: Number,
    endTime: Number,
  },
  computed: {
    zoomClipWrapStyle() {
      const { time, width } = this.currentUnit
      const randomColor = Math.floor(Math.random() * 16777215).toString(16)
      // const unit = 15
      return {
        width: width * ((this.endTime - this.startTime) / time) + 'px',
        transform: `translateX(${(this.startTime / time) * width}px)`,
        'background-color': '#' + randomColor,
      }
    },
  },
}
</script>

<style scoped>
.zoom-clip-wrap {
  position: absolute;
}
</style>
