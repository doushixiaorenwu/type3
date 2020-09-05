import { axios } from './axios'

export function loging (data) {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}
