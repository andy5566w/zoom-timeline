<template>
  <form action="">
    <label for="name">name</label>
    <input type="text" id="name" />
    <label for="age">age</label>
    <input type="text" id="age" />
    <label for="address">address</label>
    <input type="text" id="address" />

    <label for="country">country</label>
    <select name="" id="country">
      <option value="Taiwan">Taiwan</option>
      <option value="China">China</option>
      <option value="Japan">Japan</option>
      <option value="USA">USA</option>
    </select>
  </form>
</template>

<script>
export default {
  name: 'FormTwo',
  created() {
    console.log('FormTwo created')
  },
  mounted() {
    console.log('FormTwo mounted')
  },
  activated() {
    console.log('FormTwo activated')
  },
  deactivated() {
    console.log('FormTwo deactivated')
  },
}
</script>

<style scoped></style>
