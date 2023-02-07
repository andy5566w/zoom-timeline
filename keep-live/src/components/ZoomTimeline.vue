<template>
  <div>
    <section
      class="overflow-y-auto p-10 relative"
      :style="containerStyle"
      @mousemove="handleMouseMove"
      @mousedown="timeLineData.isClickCurrentTimeThumb = true"
      @mouseup="timeLineData.isClickCurrentTimeThumb = false"
    >
      <div class="flex justify-start">
        <input
          @change="handleLoadVideo"
          class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        />

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded decrease"
          @click="timeLineData.currentIndex--"
          :class="{
            'opacity-50': timeLineData.currentIndex === 0,
          }"
          :disabled="timeLineData.currentIndex === 0"
        >
          -
        </button>

        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded increase"
          :class="{
            'opacity-50':
              timeLineData.currentIndex === timeLineData.breakpoints.length - 1,
          }"
          :disabled="
            timeLineData.currentIndex === timeLineData.breakpoints.length - 1
          "
          @click="timeLineData.currentIndex++"
        >
          +
        </button>
      </div>
      <ZoomCurrentTimeThumb
        ref="ZoomCurrentTimeThumb"
        :offsetLeftDistance="offsetLeftDistance"
        :currentUnit="currentUnit"
      />
      <canvas id="canvas" ref="canvas"></canvas>
      <div class="overflow-y-auto" :style="{ 'padding-left': '15px' }">
        <div
          class="border border-sky-500 transition duration-150 ease-in-out"
          :style="boxStyle"
        >
          video
        </div>
      </div>
    </section>
    {{ JSON.stringify(showDate) }}
  </div>
</template>

<script>
import Vector from '@/js/Vector'
import ZoomCurrentTimeThumb from './ZoomCurrentTimeThumb.vue'
// import ZoomVideoClip from './ZoomVideoClip.vue'
export default {
  name: 'ZoomTimeline',
  components: { ZoomCurrentTimeThumb },
  mounted() {
    this.initialCanvas()
    this.drawVerticalLine()
  },
  data() {
    const timeLineData = {
      lineHeigh: 10,
      breakpoints: [
        { width: 15, time: 0.1, unit: '1s' },
        { width: 15, time: 1, unit: '10s' },
        { width: 15, time: 2, unit: '20s' },
        { width: 15, time: 3, unit: '30s' },
        { width: 15, time: 6, unit: '1min' },
        { width: 15, time: 12, unit: '2min' },
        { width: 15, time: 18, unit: '3min' },
        { width: 15, time: 30, unit: '5min' },
        { width: 15, time: 60, unit: '10min' },
        { width: 15, time: 120, unit: '20min' },
        { width: 15, time: 180, unit: '30min' },
        { width: 15, time: 360, unit: '60min' },
      ],
      currentIndex: 0,
      isClickCurrentTimeThumb: false,
    }

    const videoData = {
      originalDuration: 0,
    }

    const box = {
      width: 100,
    }
    return {
      ctx: null,
      canvas: null,
      V: new Vector(15, 0),
      timeLineData,
      videoData,
      canvasHeight: 80,
      box,
      offsetLeftDistance: 200,
    }
  },
  computed: {
    currentUnit() {
      return this.timeLineData.breakpoints[this.timeLineData.currentIndex]
    },
    showDate() {
      return {
        ...this.currentUnit,
        ...this.videoData,
        ISOStringTime: new Date(this.videoData.originalDuration * 1000)
          .toISOString()
          .substring(11, 19),
      }
    },
    boxStyle() {
      return {
        width:
          this.currentUnit.width *
            (this.videoData.originalDuration / this.currentUnit.time) +
          'px',
      }
    },
    containerStyle() {
      const _width = this.convertTimeIntoWidth(this.videoData.originalDuration)
      const width =
        _width === 0 || _width < window.innerWidth ? window.innerWidth : width
      return {
        width: width + 'px',
      }
    },
  },
  watch: {
    'timeLineData.currentIndex'() {
      this.V.set(this.currentUnit.width, 0)
      this.drawVerticalLine()
    },
  },
  methods: {
    async handleLoadVideo(e) {
      const file = e.target.files[0]
      this.videoData.originalDuration = await this.getDuration(
        new Audio(URL.createObjectURL(file))
      )
    },
    initialCanvas() {
      this.canvas = this.$refs.canvas
      //   this.canvas.width = window.innerWidth
      this.canvas.width = 5000
      this.canvas.height = this.canvasHeight
      this.ctx = this.canvas.getContext('2d')
      this.ctx.strokeStyle = '#9397A6'
      this.ctx.lineWidth = 2
    },
    drawVerticalLine() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.save()
      this.ctx.translate(0, this.canvasHeight / 2)
      let H = this.timeLineData.lineHeigh
      //   const MAX =  window.innerWidth
      const MAX = 5000
      for (let i = 0; MAX >= this.V.x * i; i++) {
        this.ctx.beginPath()
        this.ctx.translate(this.V.x, this.V.y)
        if (i % 10 === 0) {
          H = this.timeLineData.lineHeigh * 1.5
          this.ctx.font = '12px Arial'
          this.ctx.fillText(this.getSecond(i), -6, H / 2 + 15)
        } else {
          H = this.timeLineData.lineHeigh
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
    convertTimeIntoWidth(time) {
      return this.currentUnit.width * (time / this.currentUnit.time)
    },
    handleMouseMove(e) {
      if (this.timeLineData.isClickCurrentTimeThumb) {
        this.offsetLeftDistance = e.clientX - 40 <= 0 ? 0 : e.clientX - 40
      }
    },
    // maybe be abandoned after implementing
    getDuration(element) {
      return new Promise((resolve) => {
        element.addEventListener(
          'durationchange',
          function () {
            if (this.duration !== Infinity) {
              const duration = this.duration
              element.remove()
              resolve(duration)
            }
          },
          false
        )
        element.currentTime = 24 * 60 * 60 //fake big time
      })
    },
  },
}
</script>
<style scoped></style>
