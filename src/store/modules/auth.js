import AuthServices from '../../moduleApi/modules/auth'

export const state = {
  user: null,
}

export const mutations = {
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
