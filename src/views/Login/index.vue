<template>
    <div class="login">
      <div class="dologin">
        <h2>后台管理系统</h2>
        <el-form :model="loginForm" :rules="rules" ref="loginForms">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input show-password type="password" placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import { loginApi } from "@/http/api";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", tigger: blur },
          { min: 5, max: 12, message: "请输入5到12位的用户名", tigger: blur },
        ],
        password: [
          { required: true, message: "请输入密码", tigger: blur },
          { min: 5, max: 12, message: "请输入5到12位的密码", tigger: blur },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForms.validate(async (valid) => {
        if (!valid) return false;
        const res = await loginApi(this.loginForm);
        console.log("res1:", res);
        this.$router.push('/home')
      });
    },
  },
  mounted() {},
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .dologin {
    width: 30%;
    min-width: 500px;
    height: 300px;
    background-color: #fff;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    padding: 0 30px;
    box-sizing: border-box;
    .el-form {
      margin-top: 40px;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>