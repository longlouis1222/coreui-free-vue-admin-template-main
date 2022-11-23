import axios from 'axios'

export default () => {
  // Set config defaults when creating the instance
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API,
  });

  // Alter defaults after instance has been created
  instance.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('Token');

  return instance;
}
