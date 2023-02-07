<template>
  <div class="zoom-ruler-wrap w-full">
    <canvas id="canvas" ref="canvas" js-zoom-ruler></canvas>
  </div>
</template>

<script>
import Vector from '@/js/Vector'
export default {
  name: 'ZoomRuler',
  props: {
    currentUnit: Object,
  },
  mounted() {
    this.initialCanvas()
    this.drawVerticalLine()
  },
  data() {
    return {
      canvasHeight: 80,
      lineHeight: 10,
      lineWidth: 2,
      ctx: null,
      canvas: null,
      V: new Vector(15, 0),
    }
  },
  methods: {
    initialCanvas() {
      this.canvas = this.$refs.canvas
      //   this.canvas.width = window.innerWidth
      this.canvas.width = 5000
      this.canvas.height = this.canvasHeight
      this.ctx = this.canvas.getContext('2d')
      this.ctx.strokeStyle = '#9397A6'
      this.ctx.lineWidth = this.lineWidth
    },
    drawVerticalLine() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.save()
      this.ctx.translate(this.lineWidth / 2, this.canvasHeight / 2)
      let H = this.lineHeight
      //   const MAX =  window.innerWidth
      const MAX = 10000
      for (let i = 0; MAX >= this.V.x * i; i++) {
        this.ctx.beginPath()
        if (i !== 0) {
          this.ctx.translate(this.V.x, this.V.y)
        }
        if (i % 10 === 0) {
          H = this.lineHeight * 1.5
          this.ctx.font = '12px Arial'
          this.ctx.fillText(this.getSecond(i), 0, H / 2 + 15)
        } else {
          H = this.lineHeight
        }
        this.ctx.moveTo(0, -H / 2)
        this.ctx.lineTo(0, H / 2)
        this.ctx.stroke()
      }
      this.ctx.restore()
    },
    getSecond(i) {
      const distance = i * this.V.x
      const time = i * this.currentUnit.time
      return `${new Date(time * 1000)
        .toISOString()
        .substring(11, 19)} (${distance})`
    },
  },
  watch: {
    currentUnit: {
      handler(currentUnit) {
        this.V.set(currentUnit.width, 0)
        this.drawVerticalLine()
      },
      deep: true,
    },
  },
}
</script>

<style scoped></style>
