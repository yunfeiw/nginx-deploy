/**
* @description:顶部
*/
<template>
  <Affix>
    <span class="demo-affix">
      <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-paper" />内容管理
        </MenuItem>
        <MenuItem name="2">
          <Icon type="ios-people" />用户管理
        </MenuItem>
      </Menu>
    </span>
  </Affix>
</template>

<script>
export default {
  name: "yfhead",
  data() {
    return {
      theme: "light"
    };
  }
};
</script>

<style>
</style>