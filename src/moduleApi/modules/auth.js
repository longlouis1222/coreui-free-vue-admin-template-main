import Api from '../../moduleApi'

export default {
  login(credentials) {
    return Api().post('login', {
      username: credentials.username,
      password: credentials.password,
    })
  },

  register(credentials) {
    return Api().post('sign-up', {
      // firstName: credentials.firstName,
      // lastName: credentials.lastName,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    })
  },

  forgotPassword(credentials) {
    return Api().post('forgot-password', {
      email: credentials.email,
    })
  },

  updatePassword(credentials) {
    return Api().post('update-password', {
      email: credentials.email,
      oldPassword: credentials.oldPassword,
      newPassword: credentials.newPassword,
      token: credentials.token,
    })
  },

  activeAccount(credentials) {
    return Api().get(`activation?code=${credentials.code}`)
  }
}
