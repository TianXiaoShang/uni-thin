<template>
  <div class="loading-wrap">
    <div class="cotent">
      <div class="bg">
        <van-loading vertical color="#fff">加载中...</van-loading>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="less" scoped>
.loading-wrap {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  .bg {
    padding: 20px;
    background: rgba(0, 0, 0, 0.75);
    border-radius: 10px;
  }
}

</style>