import { BASE_URL } from '@/services/environment.service'
import Toast from '@/wxcomponents/toast/toast'
import { getToken } from '@/util/index'

const request = function (path, data = {}, method = 'POST') {
  return new Promise((resolve, reject) => {
    let token = getToken() || ''
    let url = BASE_URL + `${path}`
    if (token) data.token = token
    uni.request({
      url,
      method,
      data,
      header: {
        'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        if (res.data.errno == 1 && res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else if (res.statusCode == 401) {
          Toast('登录失效，请重试!')
        } else if (res.statusCode == 403) {
          Toast((res.data.error && res.data.error.message) || '登陆失败!')
          reject(res)
        } else {
          console.log('请求失败:', res)
          Toast.fail(res.data.message || '请求失败!')
          reject(res)
        }
      },
      fail: (err) => {
        console.log('接口请求失败:', err)
        reject(err)
      },
      complete: () => {}
    })
  })
}

export default request
