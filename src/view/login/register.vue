<template>
  <div class="formData">
    <el-form :model="user" class="register">
      <el-form-item label="用户名：">
        <el-input v-model="user.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-input v-model="user.role" placeholder="角色"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="user.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="user.mobile" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- 测试提交 -->
</template>

<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    register() {
      loginAndUserApi
        .register(this.user)
        .then(res => {})
        .catch(err => {});
    }
  }
};
</script>

<style lang="less" scoped>
.formData{
    height: 100%;
        display: flex;
    justify-content: center;
    align-items: center;
    .register{
     border: 1px solid #333333;
    padding: 20px;
    width: 500px;
    height: 550px;
    }
    }
</style>
