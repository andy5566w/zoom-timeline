<template>
  <div class="currentTimeThumb" :style="currentStyle"></div>
</template>

<script>
export default {
  name: 'ZoomCurrentTimeThumb',
  props: {
    offsetLeftDistance: Number,
    currentUnit: Object,
  },
  computed: {
    currentStyle() {
      return {
        transform: `translateX(${this.offsetLeftDistance}px)`,
      }
    },
    v_on_currentTimeThumb() {
      return {
        mousedown: this.handleMouseDown,
        mousemove: this.handleMouseMove,
        mouseup: this.handleMouseUp,
      }
    },
  },
  methods: {
    handleMouseDown(e) {
      console.log(e)
    },
    handleMouseMove(e) {
      console.log(e)
    },
    handleMouseUp(e) {
      console.log(e)
    },
  },
}
</script>

<style>
.currentTimeThumb {
  width: 4px;
  height: 100%;
  background-color: red;
  position: absolute;
  top: 0;
  z-index: 5;
}
</style>
