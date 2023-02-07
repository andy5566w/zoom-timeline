<template>
  <div class="nextTick">
    <input type="text" name="" id="" :value="value" @input="handleInput">
    <p ref="text">文字{{ text }}</p>
    <button @click="send">送出</button>
  </div>
</template>

<script>
export default {
  name: 'nextTick',
  props:{
    value: {
      type: String
    }
  },
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
    handleInput(e){
      console.log(e)
      this.$emit('input', e.target.value)
    },
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

<style >
.nextTick{
  border:1px solid red;
}
</style>
