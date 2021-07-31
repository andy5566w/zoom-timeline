<script>
export default {
  props: ['name'],
  name: 'TestChildren',
  render() {
    return (
      <div>
        <h1>children</h1>
        {this.name}
      </div>
    )
  }
}
</script>