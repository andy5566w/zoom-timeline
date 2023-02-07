class Vector {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  set(x, y) {
    this.x = x
    this.y = y
  }
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y)
  }
  sub(v) {
    return this.add(v.mul(-1))
  }
  mul(s) {
    return new Vector(this.x * s, this.y * s)
  }
  move(x, y) {
    this.x += x
    this.y += y
    return this
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
  clone() {
    return new Vector(this.x, this.y)
  }
  toString() {
    return `(${this.x},${this.y})`
  }
  equal(v) {
    return this.x == v.x && this.y == v.y
  }
  get angle() {
    return Math.atan2(this.y, this.x)
  }
  get degree() {
    return (360 * this.angle) / 2 / Math.PI
  }
  get unit() {
    return this.mul(1 / this.length)
  }
}

export default Vector
