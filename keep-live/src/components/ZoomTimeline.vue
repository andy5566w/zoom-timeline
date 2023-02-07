<template>
  <div>
    <div class="flex justify-start gap-4">
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

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="handleSplit"
      >
        split
      </button>
    </div>
    <section class="overflow-x-auto py-10 relative" v-on="v_on_container">
      <ZoomCurrentTimeThumb
        ref="ZoomCurrentTimeThumb"
        :offsetLeftDistance="offsetLeftDistance"
        :currentUnit="currentUnit"
      />

      <ZoomRuler :currentUnit="currentUnit" />

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
    <div>
      {{ JSON.stringify(clipItems) }}
    </div>
  </div>
</template>

<script>
import ZoomCurrentTimeThumb from './ZoomCurrentTimeThumb.vue'
import ZoomRuler from '@/components/ZoomRuler.vue'
// import ZoomVideoClip from './ZoomVideoClip.vue'
import { floor } from 'lodash'
export default {
  name: 'ZoomTimeline',
  components: { ZoomCurrentTimeThumb, ZoomRuler },
  data() {
    const timeLineData = {
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
      timeLineData,
      videoData,
      box,
      splitsArray: [],
      offsetLeftDistance: 200,
    }
  },
  computed: {
    currentUnit() {
      return this.timeLineData.breakpoints[this.timeLineData.currentIndex]
    },
    boxStyle() {
      return {
        width:
          this.currentUnit.width *
            (this.videoData.originalDuration / this.currentUnit.time) +
          'px',
      }
    },
    clipItems() {
      if (this.videoData.originalDuration === 0) return []
      else {
        return this.splitsArray.reduce((a, c, index) => {
          if (index === 0) return a.concat({ startTime: 0, endTime: c })
          else if (index === this.splitsArray.length - 1)
            return a.concat({
              startTime: a[index - 1].endTime,
              endTime: this.videoData.originalDuration,
            })
          return a.concat({ startTime: a[index - 1].endTime, endTime: c })
        }, [])
      }
    },
    v_on_container() {
      return {
        mousemove: this.handleMouseMove,
        mousedown: () => {
          this.timeLineData.isClickCurrentTimeThumb = true
        },
        mouseup: () => (this.timeLineData.isClickCurrentTimeThumb = false),
        click: (event) => {
          if (event.target.hasAttribute('js-zoom-ruler')) {
            this.offsetLeftDistance = event.offsetX <= 0 ? 0 : event.offsetX
          }
        },
      }
    },
    // Maybe delete after implementing
    showDate() {
      return {
        ...this.currentUnit,
        ...this.videoData,
        splitsArray: this.splitsArray,
        ISOStringTime: new Date(this.videoData.originalDuration * 1000)
          .toISOString()
          .substring(11, 19),
      }
    },
  },
  watch: {
    'timeLineData.currentIndex'() {},
  },
  methods: {
    async handleLoadVideo(e) {
      const file = e.target.files[0]
      this.videoData.originalDuration = await this.getDuration(
        new Audio(URL.createObjectURL(file))
      )
    },
    convertTimeIntoWidth(time) {
      return this.currentUnit.width * (time / this.currentUnit.time)
    },
    convertOffsetLeftDistanceIntoTime(width) {
      return this.currentUnit.time * (width / this.currentUnit.width)
    },
    handleMouseMove(event) {
      if (
        this.timeLineData.isClickCurrentTimeThumb &&
        event.target.hasAttribute('js-zoom-ruler')
      ) {
        this.offsetLeftDistance = event.offsetX <= 0 ? 0 : event.offsetX
      }
    },
    handleSplit() {
      const splitPoint = floor(
        this.convertOffsetLeftDistanceIntoTime(this.offsetLeftDistance),
        2
      )
      if (!this.splitsArray.find((n) => n === splitPoint)) {
        this.splitsArray.push(splitPoint)
        this.splitsArray.sort()
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
