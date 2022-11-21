import Api from '../../moduleApi';

export default {
  login(credentials) {
    return Api().post('login', {
      username: credentials.username,
      password: credentials.password
    })
  },
  register() {
    return Api().post('users/signup')
  },
}
