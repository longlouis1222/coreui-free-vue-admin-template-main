import AuthServices from '../../moduleApi/modules/auth'

export const state = {
  user: null,
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
    console.log('User state change: ', state.user)
  },
}

export const getters = {
  login(state) {
    return state.user
  },
}

export const actions = {
  login() {
    // AuthServices.login()
    console.log('Log in from store ...')
  },
}

export const modules = {}
