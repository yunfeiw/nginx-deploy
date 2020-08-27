<template>
  <div class="login_continer" :style="bg">
    <!-- 内容 -->
    <div class="login_form">
      <h3>(*￣︶￣) 欢迎加入</h3>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input
            type="text"
            size="small"
            placeholder="用户名"
            v-model="formInline.user"
            @on-enter="handleSubmit('formInline')"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            size="small"
            placeholder="密码"
            v-model="formInline.password"
            @on-enter="handleSubmit('formInline')"
          >
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem align="right">
          <Checkbox v-model="formInline.interest" style="color:#fff;">记住密码</Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" size="small" @click="handleSubmit('formInline')">开 始 加 入</Button>
        </FormItem>
      </Form>
    </div>
    <!-- 遮罩 -->
    <Yf-spin :loading="loading"></Yf-spin>
  </div>
</template>
<script>
import bg from "../assets/login.jpg";
import { YfSpin } from "@/components/index";
export default {
  components: { YfSpin },
  data() {
    return {
      bg: {
        "background-image": "url('" + bg + "')"
      },
      loading: false,
      formInline: {
        user: "",
        password: "",
        interest: false
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "至少是6位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            localStorage.setItem("token", "mima");
            this.$router.push({ path: "/" });
          }, 1000);
        }
      });
    }
  }
};
</script>
<style lang="less">
.login_continer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  h3 {
    color: #ffffff;
    padding: 12px 0;
    font-size: 16px;
    letter-spacing: 5px;
  }
  .login_form {
    width: 265px;
    background-color: rgba(12, 12, 12, 0.7);
    padding: 40px 30px 10px;
    border-radius: 5px;
  }
}
</style>
