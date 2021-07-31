import Vue from 'vue'
import Vuex from 'vuex'
import * as home from './modules/home'
import * as about from './modules/about'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { home, about },
})
