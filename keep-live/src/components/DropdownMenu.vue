<template>
  <div>
    <label for="ss">select me</label
    ><select v-focus ref="select" name="" id="ss">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
    </select>

    <label for="input"></label>
    <input type="text" id="input" />
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  mounted() {
    // this.$refs.select.focus()
    // console.log()
  },
}
</script>

<style scoped>
select:focus {
  width: 150px;
}
</style>
