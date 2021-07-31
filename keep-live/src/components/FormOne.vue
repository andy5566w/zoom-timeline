<template>
  <form>
    <label for="email">Email</label>
    <input type="email" id="email" />
    <label for="password">Password</label>
    <input type="email" id="password" />
  </form>
</template>

<script>
export default {
  name: 'FormOne',
  created() {
    console.log('FormOne created')
  },
  mounted() {
    console.log('FormOne mounted')
  },
  activated() {
    console.log('FormOne activated')
  },
  deactivated() {
    console.log('FormOne deactivated')
  },
}
</script>

<style scoped></style>
