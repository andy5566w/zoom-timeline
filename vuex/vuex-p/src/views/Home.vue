<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg3" />
    <p>About {{ about }}</p>
    <p>list id : 2 {{ fetchIDLists(3) }}</p>
    <p>msg 4{{ getter_msg4 }}</p>
    <button @click="addLists">add</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  computed: {
    ...mapState('home', ['msg3', 'lists']),
    ...mapGetters('home', ['fetchIDLists', 'getter_msg4']),
    ...mapState('about', ['about']),
  },
  methods: {
    ...mapActions('home', ['apiStoreLists']),
    addLists() {
      this.apiStoreLists({ id: 7, msg: 'ID 7' })
    },
  },
}
</script>
