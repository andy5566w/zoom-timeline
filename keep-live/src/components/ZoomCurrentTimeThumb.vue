<template>
  <div class="currentTimeThumb" :style="currentStyle"></div>
</template>

<script>
export default {
  name: 'ZoomCurrentTimeThumb',
  props: {
    offsetLeftDistance: Number,
  },
  computed: {
    currentStyle() {
      return {
        transform: `translateX(${this.offsetLeftDistance}px)`,
      }
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
  transition: all 0.2s;
}
</style>
