export default {
    data: () => {
        return {
            defaultShare: {
                title: '超级优惠，超级划算，小程序下单更省钱',
                path: '/pages/index/index',
                desc: '省钱外卖、购票、美食、会员小程序',
                imageUrl: '',
                content: ''
            }
        }
    },
    // 注入该mixin会支持分享，优先为自定义配置，否则走默认配置
    onShareAppMessage() {
        // 根据当前页面自动生成分享path
        let routes = getCurrentPages();
        let curpath = routes[routes.length - 1].$page.fullPath;
        return {
            title: this.coustomShare && this.coustomShare.title || this.defaultShare.title,
            path: this.coustomShare && this.coustomShare.path || curpath || this.defaultShare.path,
            imageUrl: this.coustomShare && this.coustomShare.imageUrl || this.defaultShare.imageUrl,
            desc: this.coustomShare && this.coustomShare.desc || this.defaultShare.desc,
            content: this.coustomShare && this.coustomShare.content || this.defaultShare.content,
            success() {
                uni.showToast({
                    title: '分享成功'
                })
            },
            fail() {
                uni.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        }
    }
}