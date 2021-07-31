<template>
  <form action="">
    <label for="check">check</label>
    <input type="radio" id="check" name="check" />
    <label for="check2">check</label>
    <input type="radio" id="check2" name="check" />
    <label for="check3">check</label>
    <input type="radio" id="check3" name="check" />

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
  name: 'FormThree',
  created() {
    console.log('FormThree created')
  },
  mounted() {
    console.log('FormThree mounted')
  },
  activated() {
    console.log('FormThree activated')
  },
  deactivated() {
    console.log('FormThree deactivated')
  },
}
</script>

<style scoped></style>
