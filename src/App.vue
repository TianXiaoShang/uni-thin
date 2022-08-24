<script>
import { callGetUserInfo } from '@/util/index'
import store from './store'
import { login, getGlobals, getLayout } from '@/apis/index'

export default {
  onLaunch: async function () {
    await new Promise((resolve, rej) => {
      uni.login({
        provider: 'weixin',
        success: (loginRes) => {
          login(loginRes.code).then((res) => {
            store.commit('SET_TOKEN', res.data.member.token)
            resolve(res.data)
            this.$isResolve()
          }, rej)
        },
        fail: rej
      })
    }).then((res) => {
      store.commit('UPDATE_USERINFO', res.member)
      // callGetUserInfo()
      // getLayout()
      // getGlobals()
    })
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show1')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="less">
/*每个页面公共css */
@import './styles/index.less';
@import './wxcomponents/common/index.wxss';
</style>
