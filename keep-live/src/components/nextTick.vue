<template>
  <div>
    <p ref="text">文字{{ text }}</p>
    <button @click="send">送出</button>
  </div>
</template>

<script>
export default {
  name: 'nextTick',
  data() {
    return {
      text: '送出前',
    }
  },
  created() {
    console.log('creat', this.$refs.text)
    this.$nextTick(function () {
      console.log('create nextTick', this.$refs.text)
    })
  },
  methods: {
    send() {
      this.text = '送出後'
      this.$nextTick(function () {
        // 畫面渲染完後才會執行
        console.log('$nextTick', this.$refs.text.innerHTML)
      })
      console.log('send', this.$refs.text.innerHTML)
    },
  },
}
</script>

<style scoped></style>
