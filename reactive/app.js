class Dep {
    constructor() {
        this.substribers = []
    }

    depend() {
        if (target && !this.substribers.includes(target))
            this.substribers.push(target)
    }

    notify() {
        this.substribers.forEach(fn => fn())
    }
}

let total = 0
const data = {price: 5, quantity: 10}
Object.keys(data).forEach(key => {
    const dep = new Dep()
    let initialValue = data[key]
    Object.defineProperty(data, key, {
        get() {
            console.log(`access ${key}: ` + initialValue)
            dep.depend()
            return initialValue
        },
        set(newValue) {
            console.log('setting price', newValue)
            initialValue = newValue
            dep.notify()
        }
    })
})
const target = () => {
    console.log('ddd')
    total = data.price * data.quantity
}
target()

console.log('before reactive: ', total);

data.price = 3

console.log('after reactive: ', total);