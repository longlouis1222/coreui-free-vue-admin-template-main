import { createStore } from 'vuex'
import AuthService from '../moduleApi/modules/auth'

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
    async login({ commit }, credentials) {
      try {
        console.log('Log in from Action store ...', credentials.username, credentials.password)
        const res = await AuthService.login(credentials);
        console.log('RES', res);
        commit('SET_CURRENT_USER')
        localStorage.setItem('Token', res.data.refreshToken)
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {},
  // modules,
})
