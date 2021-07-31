export const namespaced = true
export const state = {
  msg: 'Welcome to Your Vue.js App',
  msg2: 'Welcome to Your Vue.js App 2',
  msg3: 'Welcome to Your Vue.js App 3',
  msg4: 'Welcome to Your Vue.js App 4',
  lists: [
    { id: 1, msg: 'ID: 1' },
    { id: 2, msg: 'ID: 2' },
    { id: 3, msg: 'ID: 3' },
    { id: 4, msg: 'ID: 4' },
    { id: 5, msg: 'ID: 5' },
  ],
}
export const getters = {
  fetchIDLists: (state) => (id) => state.lists.find((list) => list.id === id),
  getter_msg4: (state) => state.msg4,
}
export const mutations = {
  MUTATION_ADD_LISTS(state, list) {
    state.lists.push(list)
  },
  MUTATION_ADD_LISTS2(state, list) {
    state.lists.push(list)
  },
}
export const actions = {}
