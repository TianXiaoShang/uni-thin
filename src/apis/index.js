import request from '@/services/request.service'
import store from '../store'

/**
 * login
 * @param {string} code
 */
export function login(code) {
  return request('member.login', { code }, 'GET')
}

/**
 * 更新用户信息
 * @param {string} avatarUrl
 * @param {string} nickName
 * @returns
 */
export function updateMemberInfo(avatarUrl, nickName) {
  return request('member.update', { avatarUrl, nickName })
}

/**
 * 板块
 * @returns
 */
export function getPlate() {
  return request('message.plate', {}, 'GET')
}

/**
 * 布局设置
 * @returns
 */
export function getLayout() {
  return request('set.layout', {}, 'GET')
}

/**
 * 全局设置
 * @returns
 */
export function getGlobals() {
  return request('set.globals', {}, 'GET')
}

/**
 * 待评价
 * @returns
 */
export function getCommentTask(keyword = '', page = 1) {
  return request('member.comment_task', { page, keyword, openid: store.getters.openId }, 'GET')
}
/**
 * 我的关注
 * @returns
 */
export function getAttention(keyword = '', page = 1) {
  return request('member.attention', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 我的历史
 * @returns
 */
export function getHistory(keyword = '', page = 1) {
  return request('member.attention', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 我的收藏
 * @returns
 */
export function getCollect(keyword = '', page = 1) {
  return request('member.collect', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 添加收藏
 * @returns
 */
export function addCollect(article_id) {
  return request('member.add_collect', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 取消收藏
 * @returns
 */
export function removeCollect(article_id) {
  return request('member.cancel_collect', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 添加浏览记录
 * @returns
 */
export function addVisit(article_id ) {
  return request('member.add_visit', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 清空浏览记录
 * @returns
 */
export function clearVisit( ) {
  return request('member.empty_visit', {  openid: store.getters.openId }, 'GET')
}
