import Dialog from '@/wxcomponents/dialog/dialog'
import store from '../store'
import request from '@/services/request.service'
import Toast from '@/wxcomponents/toast/toast'
import moment from 'moment'
import { BASE_URL } from '@/services/environment.service'
import { updateMemberInfo } from '@/apis/index'

// 获取状态栏尺寸，用于自定义顶部导航栏
const getStatusBarInfo = (function () {
  let info
  let statusBarHeight
  let menuButtonInfo
  let navBarHeight
  let contentWidth

  return function () {
    // 实现函数缓存
    if (!info) {
      // 获取手机系统信息
      info = uni.getSystemInfoSync()
      // 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
      statusBarHeight = info.statusBarHeight
      menuButtonInfo = uni.getMenuButtonBoundingClientRect()
      // (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
      navBarHeight = menuButtonInfo.bottom - info.statusBarHeight + (menuButtonInfo.top - info.statusBarHeight)
      contentWidth = menuButtonInfo.left
    }
    return {
      statusBarHeight,
      navBarHeight,
      contentWidth
    }
  }
})()

// 计算除去顶部跟底部后的中间滚动区域高度
// 从下到上是否拥有：tab栏，导航栏，状态栏
// extra可定义额外计算要减去的高度，可为正负数
const getScrollViewHeight = function (haveTab = true, haveNav = true, haveStatusBar = true, extra = 0) {
  const { statusBarHeight, navBarHeight } = getStatusBarInfo()
  const statusHeight = haveStatusBar ? statusBarHeight : 0
  const navHeight = haveNav ? navBarHeight : 0
  const tabHeight = haveTab ? 0 : 0
  return `100vh - ${statusHeight + navHeight + tabHeight + extra}px`
}
// 登陆
const enterpriseLogin = function (tenantId) {
  return new Promise((resolve, reject) => {
    // request("/api/exercitation/account/login", {
    //     userNameOrEmailAddress: "18878855421",
    //     password: "1q2w3E*",
    //     rememberMe: true,
    // }).then((res) => {
    //     getSelfInfo().then(
    //         (res) => {
    //             resolve();
    //         },
    //         () => {
    //             Toast("个人信息获取失败");
    //             resolve();
    //         }
    //     );
    // });
    // return;
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        Toast('网络已断开')
      }
    })
    const sinfo = uni.getSystemInfoSync()
    if (sinfo.environment == 'wxwork') {
      console.log('企业微信')
      uni.navigateTo({ url: `/pages/error/index` })
      return
      wx.qy.login({
        success: function (loginRes) {
          console.log(loginRes, 96)
          // requestEnterpriseLogin(loginRes.code).then((res) => {
          //     console.log(res, 99);
          // });
        }
      })
    } else {
      //微信端逻辑处理
      console.log('微信登录')
      store.state.logining = true
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          const param = {
            code: loginRes.code,
            tenantId: tenantId
          }
          requestLogin(param).then(
            (res) => {
              getSelfInfo().then(
                (res) => {
                  store.state.logining = false
                  store.commit('LOGIN', true)
                  resolve(res)
                },
                () => {
                  Toast('个人信息获取失败')
                  store.commit('LOGIN', true)
                  store.state.logining = false
                  resolve()
                }
              )
            },
            (err) => {
              store.commit('LOGIN', false)
              store.state.logining = false
              if (err.data.error.code == 99999) {
                reject(true)
                uni.reLaunch({
                  url: `/pages/temp-login/index?tenantId=${tenantId}`
                })
              } else if (err.data.error.code === '-1') {
                uni.reLaunch({
                  url: `/pages/temp-login/index?tenantId=${tenantId}`
                })
                reject()
              } else {
                let text = (err.data.error && err.data.error.message) || '登录出错啦'
                uni.redirectTo({
                  url: `/pages/error/index?text=${text}&showBack=false`
                })
                reject(err)
              }
            }
          )
        },
        fail: () => {
          Toast('微信授权失败')
          store.commit('LOGIN', false)
          store.state.logining = false
        }
      })
    }
  })
}

// 唤起用户授权并更新数据
const callGetUserInfo = function () {
  return new Promise((resolve, reject) => {
    Dialog.confirm({
      title: '提示',
      message: '请确认授权',
      confirmButtonText: '确认授权',
      confirmButtonOpenType: 'getUserProfile' // 该属性可以在内部按钮直接唤起授权api，官方不支持间接唤起
    }).then(
      (infoRes) => {
        updateMemberInfo(infoRes.userInfo.avatarUrl, infoRes.userInfo.nickName).then(
          (res) => {
            Toast.success('授权成功')
            store.commit('UPDATE_USERINFO',res.data.member)
          },
          (err) => {
            Toast('更新个人信息失败')
            reject()
          }
        )
      },
      (err) => {
        Toast('用户取消授权')
        reject()
      }
    )
  })
}
// 唤起用户授权
const callGet = function () {
  const sinfo = uni.getSystemInfoSync()
  return new Promise((resolve, reject) => {
    Dialog.confirm({
      title: '提示',
      message: '请确认授权',
      confirmButtonText: '确认授权',
      confirmButtonOpenType: 'getUserProfile' // 企业微信依旧用getUserInfo而非getUserProfile
    }).then(
      (infoRes) => {
        let data
        if (sinfo.environment == 'wxwork') {
          data = infoRes.detail.userInfo
        } else {
          data = infoRes.userInfo
        }
        resolve(data.avatarUrl)
        Toast.success('授权成功')
      },
      (err) => {
        Toast('用户取消授权')
        reject()
      }
    )
  })
}

// 强制检查用户登陆
// 未授权其一则阻塞敏感操作
function checkAuth() {
  return new Promise((resolve, reject) => {
    if (store.getters.userInfo.nickname && store.getters.userInfo.mobile) {
      resolve()
    } else {
      if (!store.getters.userInfo.nickname) {
        callGetUserInfo().then(
          (res) => {
            getMobile().then(
              (res) => {
                resolve()
              },
              () => reject()
            )
          },
          (err) => {
            reject()
          }
        )
      } else if (!store.getters.userInfo.mobile) {
        getMobile().then(
          (res) => {
            resolve()
          },
          () => reject()
        )
      }
    }
  })
}

// 唤起手机号授权，在每次登陆时检查手机号，授权一次以后不再唤起
function getMobile() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: function (loginRes) {
        Dialog.confirm({
          title: '提示',
          message: '请授权手机号',
          confirmButtonText: '授权',
          confirmButtonOpenType: 'getPhoneNumber'
        }).then(
          (res) => {
            if (res.detail.encryptedData) {
              //   uni.login({
              //     provider: "weixin",
              //     success: function(loginRes) {
              readyMobile({
                encryptedData: res.detail.encryptedData,
                iv: res.detail.iv,
                code: loginRes.code
              }).then(
                (res) => {
                  resolve(res)
                },
                (err) => {
                  reject(err)
                }
              )
              //     },
              //   });
            } else {
              Toast('授权失败')
            }
          },
          (err) => {
            console.log(148)
            Toast('用户拒绝授权')
            reject(err)
          }
        )
      }
    })
  })
}

// 获取个人信息接口
const getSelfInfo = function () {
  return new Promise((resolve, reject) => {
    request('/api/exercitation/mobile/students/me', {}, 'GET').then(
      (res) => {
        if (!res) {
          uni.showToast({
            title: '没有找到学生信息',
            duration: 2000,
            icon: 'none'
          })
          return
        } else {
          store.commit('UPDATE_USERINFO', res)
          resolve(res)
        }
      },
      () => {
        reject()
      }
    )
  })
}
// 微信登陆请求接口
const requestLogin = function (param) {
  return new Promise((resolve, reject) => {
    request(`/api/exercitation/mobile/accounts/wxlogin`, {
      ...param,
      loginType: 1
    }).then(
      (res) => {
        resolve(res)
      },
      (err) => reject(err)
    )
  })
}
// 更新个人信息
const updateSelfInfo = function (data) {
  return new Promise((resolve, reject) => {
    request(`/api/exercitation/mobile/accounts`, data, 'PUT').then(
      (res) => {
        resolve(res)
      },
      (err) => reject(err)
    )
  })
}

// 获取token
const getToken = function () {
  return store.getters.token
}

const readyMobile = function (data) {
  return new Promise((resolve, reject) => {
    request('/api/exercitation/mobile/wechat/phone', data, 'GET').then(
      (res) => {
        resolve(res)
      },
      (err) => {
        if (err.statusCode == 500) {
          Toast('服务器开小差了，请稍后重试！')
          return
        }
        reject(err)
      }
    )
  })
}
const reload = function () {
  let routes = getCurrentPages()
  let curpath = routes[routes.length - 1].$page.fullPath
  uni.redirectTo({ url: curpath })
}

const compareDate = function (endDate) {
  const a = moment().isBefore(moment(endDate))
  return a
}

/**
 * 获取两个经纬度之间的距离
 * @param la1 第一点的纬度
 * @param lo1 第一点的经度
 * @param la2 第二点的纬度
 * @param lo2 第二点的经度
 * @returns {Number}
 */
function getDistance(la1, lo1, la2, lo2, showUnit = true) {
  // if (!store.getters.locationPos || !la1 || !lo1) {
  //     return "未知";
  // }
  // const la2 = store.getters.locationPos.latitude;
  // const lo2 = store.getters.locationPos.longitude;
  var La1 = (la1 * Math.PI) / 180.0
  var La2 = (la2 * Math.PI) / 180.0
  var La3 = La1 - La2
  var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0
  var s =
    2 *
    Math.asin(
      Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2))
    )
  s = s * 6378.137 //地球半径
  s = Math.round(s * 10000) / 10000
  if (!showUnit) {
    return (s = s * 1000)
  }
  if (s < 1) {
    s = s * 1000
    return parseInt(s) + 'm'
  }
  s = s.toFixed(2)
  return s + 'Km'
}

// 选择本地头像上传
function uploadPhoto() {
  return new Promise((resolve, reject) => {
    const token = getToken() || ''
    uni.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        uni.uploadFile({
          url: BASE_URL + '/api/exercitation/filemanage/upload', //post请求的地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            cookie: token
          },
          formData: {
            lalalal: 'lalallal' //formData是指除了图片以外，额外加的字段
          },
          success: (uploadFileRes) => {
            //这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
            var obj = JSON.parse(uploadFileRes.data)
            console.log(obj)
            if (obj.data.value) {
              updateSelfInfo({
                headInfo: obj.data.value
              }).then(
                (res) => {
                  Toast.success('上传成功')
                  getSelfInfo().then((res) => {
                    resolve()
                  })
                },
                (err) => {
                  Toast('更新个人信息失败')
                  reject()
                }
              )
            } else {
              Toast(obj.msg)
            }
          }
        })
      }
    })
  })
}
// 选择本地头像上传返回url
function uploadPhotoImgUrl() {
  return new Promise((resolve, reject) => {
    const token = getToken() || ''
    uni.chooseImage({
      count: 1,
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        uni.uploadFile({
          url: BASE_URL + '/api/exercitation/filemanage/upload', //post请求的地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            cookie: token
          },
          formData: {
            lalalal: 'lalallal' //formData是指除了图片以外，额外加的字段
          },
          success: (uploadFileRes) => {
            //这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
            var obj = JSON.parse(uploadFileRes.data)
            console.log(obj)
            if (obj.data.value) {
              resolve(obj.data.value)
            } else {
              Toast(obj.msg)
            }
          }
        })
      }
    })
  })
}

/**
 * 获取URL中某个字符串字段
 * gup('id', 'https://www.lubanso.com/wx/home/?id=bHViYW5zb7W7DJI=&jhkfdhkjfda')
 * //===> bHViYW5zb7W7DJI=
 */
function getUrlParam(name, url) {
  console.log('url = ' + url)
  console.log('name = ' + name)
  var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
  var r = url.substr(1).match(reg)
  if (r != null) {
    console.log('r = ' + r)
    console.log('r[2] = ' + r[2])
    return r[2]
  }
  return null
}

function diffWorkDays(startTime, endTime) {
  if (!startTime || !endTime) {
    return 0
  }
  // 开始与结束时间所占天数，0.5或1
  let startPrefix = 0
  let endPrefix = 0
  let startDate = moment(startTime)
  let endDate = moment(endTime)
  // 默认为0
  if (endDate.isBefore(startDate)) {
    return 0
  }
  // 获取开始结束的所在周几
  let startDateWeekDay = startDate.weekday()
  let endDateWeekDay = endDate.weekday()
  // 开始结束同一天特殊处理
  if (startDate.format('YYYY-M-DD') === endDate.format('YYYY-M-DD')) {
    // 开始结束都是周末则返回0
    if (startDateWeekDay == 0 || startDateWeekDay == 6) {
      return 0
    }
    if (endDate.diff(startDate, 'minute') == 0) {
      return 0
    }
    if (startDate.hour() >= 12) {
      return 0.5
    } else if (endDate.hour() < 12 && startDate.hour() < 12) {
      return 0.5
    } else if (endDate.hour() >= 12 && startDate.hour() < 12) {
      return 1
    }
  }
  // 如果开始时间跟结束时间时同一周的周末，则返回0；
  if (
    (startDateWeekDay == 0 || startDateWeekDay == 6) &&
    (endDateWeekDay == 0 || endDateWeekDay == 6) &&
    endDate.diff(startDate, 'days') <= 2
  ) {
    return 0
  }
  let dif = 0 // 极限校准
  // 对开始与结束为休息日进行校准
  // 开始日期为休息日则设置为下周一，结束日期为休息日，则设置为上周五
  // 日期不为休息日，则计算开始与结束日期的perfix（开始与结束这两天单独拎出来计算）
  if (startDateWeekDay == 0 || startDateWeekDay == 6) {
    startDate = startDate
      .add(startDateWeekDay == 6 ? 2 : 1, 'days')
      .hour(0)
      .minute(0)
  } else {
    startPrefix =
      moment(startTime).hour() == 0 && moment(startTime).minute() == 0 ? 0 : moment(startTime).hour() <= 12 ? 1 : 0.5
    startDate = moment(startTime).add(1, 'days').hour(0).minute(0)
  }
  if (endDateWeekDay == 0 || endDateWeekDay == 6) {
    endDate = endDate
      .subtract(endDateWeekDay == 0 ? 1 : 0, 'days')
      .hour(0)
      .minute(0)
    // 这时，需要增加一天的天数，因为周五的零点去减法会少一天，但是又不能用周六去做减法，周六会计算到weekDays内
    dif += 1
  } else {
    endPrefix = moment(endTime).hour() == 0 && moment(endTime).minute() == 0 ? 0 : moment(endTime).hour() < 12 ? 0.5 : 1
    endDate = moment(endTime).hour(0).minute(0)
  }
  // 天数差
  let days = moment(endDate.format('YYYY-MM-DD HH:mm')).diff(moment(startDate.format('YYYY-MM-DD HH:mm')), 'days', true)
  days = days < 0 ? 0 : days
  let nonworkdays = 0 // 包含多少非工作日
  for (let index = 0; index <= days; index++) {
    let i = moment(startDate.format('YYYY-MM-DD')).add(index, 'days').weekday()
    if (i == 0 || i == 6) {
      nonworkdays++
    }
  }
  let newDays = moment(endDate.format('YYYY-MM-DD HH:mm')).diff(
    moment(startDate.format('YYYY-MM-DD HH:mm')),
    'days',
    true
  )
  newDays = newDays < 0 ? 0 : newDays
  let realDays = newDays + dif - nonworkdays + startPrefix + endPrefix
  return realDays
}

export {
  readyMobile,
  getStatusBarInfo,
  getScrollViewHeight,
  checkAuth,
  enterpriseLogin,
  getMobile,
  getToken,
  callGetUserInfo,
  callGet,
  getSelfInfo,
  updateSelfInfo,
  reload,
  compareDate,
  getDistance,
  uploadPhoto,
  uploadPhotoImgUrl,
  getUrlParam,
  diffWorkDays
}
