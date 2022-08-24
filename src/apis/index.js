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
 * @returns {Promise}
 */
export function updateMemberInfo(avatarUrl, nickName) {
  return request('member.update', { avatarUrl, nickName, openid: store.getters.openId }, 'GET')
}

/**
 * 板块
 * @returns {Promise}
 */
export function getPlate() {
  return request('message.plate', { openid: store.getters.openId }, 'GET')
}

/**
 * 布局设置
 * @returns {Promise}
 */
export function getLayout() {
  return request('set.layout', { openid: store.getters.openId }, 'GET')
}

/**
 * 全局设置
 * @returns {Promise}
 */
export function getGlobals() {
  return request('set.globals', { openid: store.getters.openId }, 'GET')
}

/**
 * 角标
 * @returns {Promise}
 */
export function getMark(plate_id) {
  return request('message.mark', { plate_id, openid: store.getters.openId }, 'GET')
}

/**
 * 标签
 * @returns {Promise}
 */
export function getGroup(plate_id) {
  return request('message.group', { plate_id, openid: store.getters.openId }, 'GET')
}

/**
 * 文章其他数据
 * @returns {Promise}
 */
export function getArticleExtra(plate_id) {
  return request('message.article_else', { plate_id, openid: store.getters.openId }, 'GET')
}

/**
 * 文章列表
 * @param {{plate_id:string, page:number, keyword: string, group_id: string}} params
 * @returns {Promise}
 */
export function getArticleList(params) {
  params.openid = store.getters.openId
  return request('message.article', params, 'GET')
}

/**
 * 文章详情
 * @param {string} id 文章id
 * @returns {Promise}
 */
export function getArticleDetail(id) {
  return request('message.article', { id, openid: store.getters.openId }, 'GET')
}

// ========================  用户操作/列表  =============================
/**
 * 待评价
 * @returns {Promise}
 */
export function getCommentTask(keyword = '', page = 1) {
  return request('member.comment_task', { page, keyword, openid: store.getters.openId }, 'GET')
}
/**
 * 我的关注
 * @returns {Promise}
 */
export function getAttention(keyword = '', page = 1) {
  return request('member.attention', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 我的历史
 * @returns {Promise}
 */
export function getHistory(keyword = '', page = 1) {
  return request('member.history', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 我的收藏
 * @returns {Promise}
 */
export function getCollect(keyword = '', page = 1) {
  return request('member.collect', { page, keyword, openid: store.getters.openId }, 'GET')
}

/**
 * 添加收藏
 * @returns {Promise}
 */
export function addCollect(article_id) {
  return request('member.add_collect', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 取消收藏
 * @returns {Promise}
 */
export function removeCollect(article_id) {
  return request('member.cancel_collect', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 添加浏览记录
 * @returns {Promise}
 */
export function addVisit(article_id) {
  return request('member.add_visit', { article_id, openid: store.getters.openId }, 'GET')
}

/**
 * 清空浏览记录
 * @returns {Promise}
 */
export function clearVisit() {
  return request('member.empty_visit', { openid: store.getters.openId }, 'GET')
}
/**
 * 点赞列表
 * @returns {Promise}
 */
export function getLikeList(keyword = '', page = 1) {
  return request('member.like', { page, keyword, openid: store.getters.openId }, 'GET')
}
/**
 * 点赞
 * @returns {Promise}
 */
export function addLike(article_id = '') {
  return request('member.add_like', { article_id, openid: store.getters.openId }, 'GET')
}
/**
 * 取消点赞
 * @returns {Promise}
 */
export function removeLike(article_id = '') {
  return request('member.cancel_like', { article_id, openid: store.getters.openId }, 'GET')
}
/**
 * 转发文章
 * @returns {Promise}
 */
export function transmitArticle(article_id = '') {
  return request('member.transmit', { article_id, openid: store.getters.openId }, 'GET')
}
/**
 * 我的评论
 * @returns {Promise}
 */
export function getCommentList(keyword = '', page = 1) {
  return request('member.comment', { keyword, page, openid: store.getters.openId }, 'GET')
}
/**
 * 我的评论详情
 * @returns {Promise}
 */
export function getCommentDetail(id) {
  return request('member.comment_detail', { id, openid: store.getters.openId }, 'GET')
}
/**
 * 评价
 * @returns {Promise}
 */
export function getEvaluate(task_id) {
  return request('member.evaluate', { task_id, openid: store.getters.openId }, 'GET')
}

/**
 * 评价
 * @param {string} task_id
 * @param {number} grade 评分
 * @param {string} content 评价内容
 * @returns {Promise}
 */
export function toEvaluate(task_id, grade, content) {
  return request('member.evaluate', { task_id, grade, content, openid: store.getters.openId }, 'GET')
}
