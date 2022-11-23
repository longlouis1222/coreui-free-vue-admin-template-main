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
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    })
  },
}
