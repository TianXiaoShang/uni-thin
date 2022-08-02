let BASE_URL = ''
let ASSETS_BASE_URL = 'https://yueshixi-wx-1257888251.cos.ap-guangzhou.myqcloud.com/student'

let env = uni.getAccountInfoSync()

if (env.miniProgram.envVersion === 'release') {
  BASE_URL = 'https://student.yueshixi.com'
} else {
  BASE_URL = 'https://student-dev.yueshixi.com'
}

export { ASSETS_BASE_URL, BASE_URL }
