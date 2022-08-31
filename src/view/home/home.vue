<template>
  <div class="home">
    <el-row>
      <el-button @click="toExc">点击去父亲家</el-button>
      <el-button @click="touncle">点击去叔叔家</el-button>
    </el-row>
    <el-row class="home-top" :gutter="1">
      <el-form :model="userForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="userForm.name" placeholder="用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="角色">
            <el-select v-model="userForm.role" placeholder="角色">
              <el-option
                v-for="(item, index) in roleList"
                :key="index"
                :value="item"
                :label="item"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="电话">
            <el-input v-model="userForm.phone" placeholder="电话"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button @click="searchClick">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="home-content">
      <el-table :data="formData">
        <el-table-column label="用户名：" prop="username"></el-table-column>
        <el-table-column label="角色：" prop="role"></el-table-column>
        <el-table-column label="邮箱：" prop="email"></el-table-column>
        <el-table-column label="电话：" prop="mobile"></el-table-column>
        <el-table-column label="创建时间：" prop="createTime"></el-table-column>
        
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";
export default {
  // 1、提交测试1

  data() {
    return {
      formData: [], //列表数据
      userForm: {}, //表单数据
      roleList: [] //角色下拉列表
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化函数
    init() {
      this.getUserList();
      this.getRoleList();
    },
    // 获取用户列表
    getUserList() {
      loginAndUserApi.userList().then(res => {
        if (res.data.code == 200) {
          this.formData = res.data.data;
        }
      });
    },
    // 获取角色列表
    getRoleList() {
      loginAndUserApi.getRoleList().then(res => {
        if (res.data.code == 200) {
          this.roleList = res.data.data;
        }
      });
    },
    // 搜索用户
    searchClick() {
      debugger
      // 参数转换
      let params = {
        mobile: this.userForm.phone,
        username: this.userForm.name
      };
      if (!params.phone) {
        //如果电话为空，就不传电话这个字段
        delete params.mobile;
      }
      if (this.userForm.role) {
        params.role = this.userForm.role;
      }
      loginAndUserApi.searchUserList(params).then(res => {
        let { data, code, message } = res.data;
        if (code == 200) {
          this.formData = data;
        }
      });
    },
    // 路由跳转
    toExc(){
      this.$router.push("/father")
    },
    touncle(){
      this.$router.push("/uncle")
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 80%;
  .home-top {
    display: inline-flex;
    margin-top: 20px;
  }
  .home-content {
  }
}
</style>
