<template>
  <div id="app">
    <!-- <keep-alive :include="/^Form/">
      <component :is="current"></component>
    </keep-alive>

    <button v-if="currentIndex !== 0" @click="currentIndex--">previous</button>
    <button
      v-if="currentIndex !== components.length - 1"
      @click="currentIndex++"
    >
      next
    </button>

    <nextTick v-model="nextTick" />
    <p>nextTick {{ nextTick}}</p>

    <DropdownMenu /> -->
    <ZoomTimeline />
  </div>
</template>

<script>
// import FormTwo from '@/components/FormTwo'
// import FormThree from '@/components/FormThree'
// import FormOne from '@/components/FormOne'
// import nextTick from '@/components/nextTick'
// import DropdownMenu from '@/components/DropdownMenu'
import ZoomTimeline from './components/ZoomTimeline.vue'
export default {
  name: 'App',
  // components: { FormOne, FormTwo, FormThree, nextTick, DropdownMenu },
  components: { ZoomTimeline },
  data() {
    return {
      components: ['FormOne', 'FormTwo', 'FormThree'],
      currentIndex: 0,
      nextTick: 'default',
    }
  },
  computed: {
    current() {
      return this.components[this.currentIndex]
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 5rem auto;

  /* max-width: 1000px; */
}
input {
  /* width: 100%; */
}
</style>
