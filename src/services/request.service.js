import { BASE_URL } from '@/services/environment.service'
import Toast from '@/wxcomponents/toast/toast'
import { getToken } from '@/util/index'

const request = function (path, data, method = 'POST') {
  return new Promise((resolve, reject) => {
    let token = getToken() || ''
    let url = BASE_URL + `${path}`
    uni.request({
      url,
      method,
      data,
      header: {
        cookie: token
      },
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else if (res.statusCode == 401) {
          Toast('登录失效，请重试!');
        } else if (res.statusCode == 403) {
          Toast((res.data.error && res.data.error.message) || '登陆失败!')
          reject(res)
        } else {
          console.log('请求失败:', res)
          Toast('请求失败!')
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
