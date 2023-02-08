<template>
  <div class="p-3">
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

      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="handleDelete"
      >
        delete
      </button>
    </div>
    <section class="overflow-x-auto py-10 relative" v-on="v_on_container">
      <ZoomCurrentTimeThumb
        ref="ZoomCurrentTimeThumb"
        :offsetLeftDistance="offsetLeftDistance"
        :currentUnit="currentUnit"
      />

      <ZoomRuler :currentUnit="currentUnit" />

      <div>
        <ZoomVideoClipItem
          v-for="(item, index) in clipItems"
          v-bind="item"
          :current-unit="currentUnit"
          :video-end-time="videoData.originalDuration"
          :key="item.key"
          :class="{ selected: timeLineData.selectedIndex === index }"
          @click="handleSelectClipItem(index)"
        />
      </div>
    </section>
    {{ JSON.stringify(showDate) }}
    <div class="w-20">
      {{ JSON.stringify(clipItems) }}
    </div>
  </div>
</template>

<script>
import ZoomCurrentTimeThumb from './ZoomCurrentTimeThumb.vue'
import ZoomRuler from '@/components/ZoomRuler.vue'
import ZoomVideoClipItem from '@/components/ZoomVideoClipItem.vue'
import { floor } from 'lodash'
export default {
  name: 'ZoomTimeline',
  components: { ZoomCurrentTimeThumb, ZoomRuler, ZoomVideoClipItem },
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
      selectedIndex: -1,
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
    clipItems() {
      return this.splitsArray.reduce((a, c, index) => {
        const key = Math.random().toString(16).slice(2)
        if (index === 0) return a.concat({ startTime: 0, endTime: c, key })
        else if (index === this.splitsArray.length - 1)
          return a.concat({
            startTime: a[index - 1].endTime,
            endTime: floor(this.videoData.originalDuration, 2),
            key,
          })
        return a.concat({ startTime: a[index - 1].endTime, endTime: c, key })
      }, [])
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
        selectedIndex: this.timeLineData.selectedIndex,
        ISOStringTime: new Date(this.videoData.originalDuration * 1000)
          .toISOString()
          .substring(11, 19),
      }
    },
  },
  methods: {
    async handleLoadVideo(e) {
      const file = e.target.files[0]
      this.videoData.originalDuration = await this.getDuration(
        new Audio(URL.createObjectURL(file))
      )
      if (this.videoData.originalDuration > 3600) {
        this.timeLineData.currentIndex = 11
      } else if (this.videoData.originalDuration > 1800) {
        this.timeLineData.currentIndex = 10
      } else if (this.videoData.originalDuration > 1200) {
        this.timeLineData.currentIndex = 9
      } else if (this.videoData.originalDuration > 600) {
        this.timeLineData.currentIndex = 8
      } else if (this.videoData.originalDuration > 300) {
        this.timeLineData.currentIndex = 7
      } else if (this.videoData.originalDuration > 170) {
        this.timeLineData.currentIndex = 6
      } else if (this.videoData.originalDuration > 120) {
        this.timeLineData.currentIndex = 5
      } else if (this.videoData.originalDuration > 60) {
        this.timeLineData.currentIndex = 4
      } else if (this.videoData.originalDuration > 30) {
        this.timeLineData.currentIndex = 3
      } else if (this.videoData.originalDuration > 20) {
        this.timeLineData.currentIndex = 2
      } else if (this.videoData.originalDuration > 10) {
        this.timeLineData.currentIndex = 1
      }
      this.splitsArray = [this.videoData.originalDuration]
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
    handleSelectClipItem(index) {
      this.timeLineData.selectedIndex = index
    },
    handleDelete() {
      this.splitsArray.splice(this.timeLineData.selectedIndex, 1)
      this.timeLineData.selectedIndex = -1
      // TODO 需要計算後續的變化
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
