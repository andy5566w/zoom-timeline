<script>
import TestChildren from './TestChildren'
const renderSpan = (h, n) => <span>{n}</span>
export default {
  name: 'Test',
  render(h) {
    return (
      <div>
        <TestChildren name={renderSpan(h, 999)} />
      </div>
    )
  }
}
</script>