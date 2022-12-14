import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/services/request.service'
import { setToken, clearToken, setTokenTemporary } from '@/util/storage'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginStatus: false, // 获取登陆状态
    token: null,
    logining: false,
    userInfo: {}, // 储存来自weixin授权的用户信息（头像信息等）
    // 文章标签
    group: [],
    // 文章角标
    markData: [],
    // 人员标签
    teamGroup: []
  },
  getters: {
    loginStatus: (state) => state.loginStatus,
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
    openId: (state) => state.userInfo.openid,
    group: (state) => state.group,
    groupMap: (state) =>
      state.group?.reduce((obj, d) => {
        obj[d.id] = d
        return obj
      }, {}),
    markMap: (state) =>
      state.markData?.reduce((obj, d) => {
        obj[d.id] = d
        return obj
      }, {}),
    teamGroupMap: (state) =>
      state.teamGroup?.reduce((obj, d) => {
        obj[d.id] = d
        return obj
      }, {})
  },
  mutations: {
    // 登陆，更新状态
    LOGIN(state, value) {
      state.loginStatus = value
    },
    SET_TOKEN(state, value) {
      state.token = value
      setToken(value)
    },
    // 登出
    LOGOUT(state) {
      state.loginStatus = false
      state.token = null
      clearToken()
    },
    UPDATE_USERINFO(state, value) {
      state.userInfo = value
    },
    UPDATE_GROUP(state, value) {
      state.group = value
    },
    UPDATE_MARK_DATA(state, value) {
      state.markData = value
    },
    UPDATE_TEAM_GROUP(state, value) {
      state.teamGroup = value
    }
  }
})

export default store
