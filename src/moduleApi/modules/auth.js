import Api from '../../moduleApi';

export default {
  login() {
    return Api().post('users/signin')
  },
  register() {
    return Api().post('users/signup')
  },
}
