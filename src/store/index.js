import { createStore } from 'vuex'
import AuthService from '../moduleApi/modules/auth'
import VueJwtDecode from 'vue-jwt-decode'
import router from '../router/index'

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
    SET_CURRENT_USER(state, payload) {
      console.log('From Mutation')
      state.user = payload
      console.log('User state change: ', state.user)
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log(
          'Log in from Action store ...',
          credentials.username,
          credentials.password,
        )
        const res = await AuthService.login(credentials)
        if (res.status == 200) {
          console.log('login RES', res)
          console.log(
            'this.$jwtDec("<your jwt>")',
            VueJwtDecode.decode(res.data.token),
          )
          commit('SET_CURRENT_USER', VueJwtDecode.decode(res.data.token))
          localStorage.setItem('Token', res.data.token)
          router.push({ name: 'Home' })
        }
      } catch (error) {
        console.log(error)
      }
    },

    async logout({ commit }) {
      try {
        console.log('Log out from Action store ...')
        localStorage.removeItem('Token')
        commit('SET_CURRENT_USER', null)
        router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    },

    async register({ commit }, credentials) {
      try {
        console.log('Sign up from Action store ...', credentials)
        const res = await AuthService.register(credentials)
        if (res.status) {
          console.log('register RES', res)
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
      }
    },

    async forgotPassword({ commit }, credentials) {
      try {
        console.log('Forgot PW from Action store...')
        const res = await AuthService.forgotPassword(credentials)
        if (res.status) {
          console.log('forgotPassword RES', res)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async updatePassword({ commit }, credentials) {
      try {
        console.log('Update PW from Action store...')
        const res = await AuthService.updatePassword(credentials)
        if (res.status) {
          console.log('updatePassword RES', res)
          router.push({ name: 'Login' })
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {},
  // modules,
})
