<template>
  <div class="container">
    <div class="loginDiv">
      <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
        <el-form-item label="用户" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            type="password"
            @keyup.enter.native="loginClick"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <!-- @keyup.enter="loginClick" -->
          <el-button type="primary" size="medium" @click="loginClick"
            >登录</el-button
          >
          <el-button type="primary" size="medium" @click="register"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";
export default {
  data() {
    let checkPasswordConten = (rules, value, callback) => {
      if (!value) return callback(new Error("不能为空"));
      //   let res = //.test(value)
      let res = String(value).trim().length >= 6;
      if (res) {
        return callback();
      } else {
        return callback(new Error("6位及以上密码"));
      }
    };
    return {
      loginForm: {}, //登录表单
      loginFormRules: {
        //登录表单校验
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: checkPasswordConten,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    register(){
      this.$router.push({path:'/register',params:{}})
    },
    // 登录方法
    loginClick() {
      this.$refs.loginFormRef.validate(valid => {
        debugger;
        if (valid) {
          let params = {
            ...this.loginForm
          };
          loginAndUserApi.login(params).then(res => {
            debugger;
            console.log(res);
            let { code, data, msg } = res.data;
            if (code == 200) {
              this.$message({ type: "success", message: msg });
              this.$router.push({ path: "/home" });
            } else {
              this.$message({ type: "error", message: msg });
            }
          });
        } else {
          return this.$message({
            type: "error",
            message: "请输入用户名或者正确密码"
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login.jpeg");
  width: 100%;
  height: 100%;
  background-size: cover;
  .loginDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 300px;
    height: 350px;
    background-color: rgba(0, 255, 106, 0.5);
    border: 1px solid rgb(0, 255, 106);
  }
}
</style>
