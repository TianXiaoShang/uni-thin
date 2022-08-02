import { getScrollViewHeight, checkAuth, getSelfInfo } from "@/util/index.js";
import request from "@/services/request.service";
import Toast from "@/wxcomponents/toast/toast";
import Dialog from "@/wxcomponents/dialog/dialog";
import { mapGetters } from "vuex";
import { BASE_URL, ASSETS_BASE_URL } from '@/services/environment.service';
import { getToken } from '@/util/index'


export default {
    install(Vue) {
        Vue.mixin({
            data() {
                return {
                    ASSETS_BASE_URL,
                    BASE_URL,
                    getToken,
                    getScrollViewHeight,
                    checkAuth,
                    request,
                    triggered: true,
                    currentPage: 0,
                    pageSize: 20,
                    loadDataLoading: false,
                    loading: false,
                    toast: Toast,
                    dialog: Dialog,
                    getSelfInfo,
                    showMode: false
                };
            },
            computed: {
                ...mapGetters(["userInfo"]),
            },
            methods: {
                goHome(delay = 800) {
                    setTimeout(() => {
                        uni.reLaunch({ url: `/pages/index/index` });
                    }, delay);
                },
                onRestore() {
                    this.triggered = true; // 需要重置
                },
                onScrolltolower() {
                    if (this.loadDataLoading) {
                        return;
                    }
                    this.loadDataLoading = true;
                    this.currentPage++;
                },
                back(lazy = 0) {
                    setTimeout(() => {
                        uni.navigateBack();
                    }, lazy)
                },
            },
        })
    }
};