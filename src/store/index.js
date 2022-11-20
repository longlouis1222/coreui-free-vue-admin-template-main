import { createStore } from 'vuex'
import AuthStore from './modules/auth'
// import modules from './modules'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    user: null,
  },
  getters: {},
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    setUser(state, payload) {
      state.user = payload
      console.log('User state change: ', state.user)
    },
    SET_CURRENT_USER() {
      console.log('From Mutation')
    },
  },
  actions: {
    login({ commit }, credentials) {
      console.log('Log in from Action store ...', credentials.username, credentials.password)
      commit('SET_CURRENT_USER')
    },
  },
  modules: {},
  // modules,
})
