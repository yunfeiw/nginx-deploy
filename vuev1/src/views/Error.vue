/**
* @description: 错误界面
*/
<template>
  <div class="err_container">
    <img :src="err" alt="404" srcset />
  </div>
</template>

<script>
import err404 from "@/assets/404.gif";
export default {
  data() {
    return {
      err: err404
    };
  }
};
</script>

<style>
.err_container {
  width: 100%;
  height: 100%;
  display: flex;
  background: #7fbeed;
  align-items: center;
  justify-content: center;
}
</style>