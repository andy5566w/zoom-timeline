<template>
  <div class="about">
    <ul data-ul>
      <li draggable="true">1</li>
      <li draggable="true">2</li>
      <li draggable="true">3</li>
      <li draggable="true">4</li>
      <li draggable="true">5</li>
      <li draggable="true">6</li>
      <li draggable="true">7</li>
      <li draggable="true">8</li>
      <li draggable="true">9</li>
      <li draggable="true">10</li>
    </ul>
    <ul data-ul>
      <li draggable="true">1</li>
      <li draggable="true">2</li>
      <li draggable="true">3</li>
      <li draggable="true">4</li>
      <li draggable="true">5</li>
      <li draggable="true">6</li>
      <li draggable="true">7</li>
      <li draggable="true">8</li>
      <li draggable="true">9</li>
      <li draggable="true">10</li>
    </ul>
    <ul data-ul>
      <li draggable="true" ref="lis">1</li>
      <li draggable="true" ref="lis">2</li>
      <li draggable="true">3</li>
      <li draggable="true">4</li>
      <li draggable="true">5</li>
      <li draggable="true">6</li>
      <li draggable="true">7</li>
      <li draggable="true">8</li>
      <li draggable="true">9</li>
      <li draggable="true">10</li>
    </ul>
  </div>
</template>

<script>
import { onMounted } from 'vue'
export default {
  setup() {
    // const dragFn = (e) => {
    //   console.log(e)
    // }
    const dragEnter = (e) => {
      e.target.classList.add('over')
      console.log(e)
    }
    const dragLeave = (e) => {
      e.target.classList.remove('over')
    }

    const dragover = (e) => e.preventDefault()
    onMounted(() => {
      const lis = document.querySelectorAll('li')
      console.log(lis)
      lis.forEach((li) => {
        // li.addEventListener('drag', dragFn)
        li.addEventListener('dragenter', dragEnter)
        li.addEventListener('dragleave', dragLeave)
        li.addEventListener('dragover', dragover)
      })
    })
  },
}
</script>

<style>
ul[data-ul] {
  padding: 20px;
}
li {
  background-color: #ccc;
  padding: 10px;
  margin: 10px;
}

li.over {
  background-color: chartreuse;
}
</style>
