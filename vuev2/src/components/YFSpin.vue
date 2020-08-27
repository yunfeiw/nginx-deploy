/**
* @description: 加载层
* @param{
    loading: 显示与隐藏
  }
**/
<template>
  <Spin fix v-show="loading">
    <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
    <div>Loading</div>
  </Spin>
</template>

<script>
export default {
  name: "yfloading",
  data() {
    return {};
  },
  props: ["loading"]
};
</script>

<style>
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>