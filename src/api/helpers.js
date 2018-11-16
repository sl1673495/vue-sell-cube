import axios from 'axios'

const ERR_OK = 0

export function get (url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      const { data, errno } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => {
      console.log('server error')
    })
  }
}
