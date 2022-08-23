let BASE_URL = ''
let ASSETS_BASE_URL = 'https://18test.djlnet.com.cn/'

let env = uni.getAccountInfoSync()

if (env.miniProgram.envVersion === 'release') {
  BASE_URL = 'https://18test.djlnet.com.cn/app/diet_api.php?i=1&r='
} else {
  BASE_URL = 'https://18test.djlnet.com.cn/app/diet_api.php?i=1&r='
}

export { ASSETS_BASE_URL, BASE_URL }
