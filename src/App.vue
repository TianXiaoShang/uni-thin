<script>
import { quietlyLogin, checkLocation, getSelfInfo } from "@/util/index";
import request from "@/services/request.service";
import { getToken } from "@/util/storage";
import store from "./store";

export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show1");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="less">
/*每个页面公共css */
@import "./styles/index.less";
@import "./wxcomponents/common/index.wxss";
</style>
