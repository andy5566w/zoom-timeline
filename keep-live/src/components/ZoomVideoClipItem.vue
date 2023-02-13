<template>
  <div
    v-on="$listeners"
    class="zoom-clip-wrap select-none"
    :style="zoomClipWrapStyle"
  ></div>
</template>

<script>
export default {
  name: 'ZoomVideoClipItem',
  props: {
    videoEndTime: Number,
    currentUnit: Object,
    startTime: Number,
    endTime: Number,
    deleteDistance: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    zoomClipWrapStyle() {
      const { time, width } = this.currentUnit
      console.log(this.deleteDistance)
      return {
        width: width * ((this.endTime - this.startTime) / time) + 'px',
        transform: `translateX(${
          (this.startTime / time) * width - this.deleteDistance
        }px)`,
      }
    },
  },
}
</script>

<style scoped>
.zoom-clip-wrap {
  position: absolute;
  border: 2px solid #fff0f1;
  height: 2.5rem;
  background-color: #ccc;
  cursor: pointer;
  border-radius: 5px;
}

.zoom-clip-wrap.selected {
  border-color: #4103ef;
}
</style>
