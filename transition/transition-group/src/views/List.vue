<template>
  <div>
    <input type="text" v-model="newContact" placeholder="Name" />
    <button @click="addContact">Add Contact</button>

    <transition-group name="up" tag="ul" appear>
      <li v-for="contact in contacts" :key="contact">
        {{ contact }}
        <button @click="remove(contact)">remove</button>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newContact: '',
      contacts: ['Beau Thabeast', 'Cindy Rella', 'Alice Vunderlind']
    }
  },
  methods: {
    addContact() {
      this.contacts.push(this.newContact)
      this.newContact = ''
    },
    remove(text) {
      this.contacts = this.contacts.filter(t => t !== text)
    }
  }
}
</script>

<style lang="css">
.up-enter {
  transform: translateY(10px);
}

.up-enter-active,
.up-leave-active {
  transition: all 0.2s ease-in;
}

.up-leaver-to {
  transform: translateY(-10px);
}
</style>