<template>
  <div class="home">
    <div>爸爸家</div>
    <el-row>
      <el-button @click="toExc">点击去home</el-button>
    </el-row>
    <!-- :searchFns="searchFns" -->
    <childer
      :roleLists="roleList"
      @searchListClik="searchList"
      @refchongzhi="chongzhi"
    ></childer>
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
import childer from "@/view/home/childer.vue";
import { loginAndUserApi } from "@/apiController/loginAndUser.js";

export default {
  // 1、提交测试1

  data() {
    return {
      formData: [], //列表数据
      roleList: [], //角色下拉列表
      searchFns: {
        //   searchClick:this.searchClick
      },
    };
  },
  components: { childer },
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
      loginAndUserApi.userList().then((res) => {
        if (res.data.code == 200) {
          this.formData = res.data.data;
        }
      });
    },
    // 获取角色列表
    getRoleList() {
      loginAndUserApi.getRoleList().then((res) => {
        if (res.data.code == 200) {
          this.roleList = res.data.data;
        }
      });
    },
    // 搜索
    searchList(data) {
      this.formData = data;
    },
    // 重置
    chongzhi(form) {
      console.log();
      this.searchClick(form);
    },
    // 搜索用户
    searchClick(form) {
      debugger;
      // 参数转换
      let params = {
        mobile: form.phone,
        username: form.name,
      };
      if (!params.phone) {
        //如果电话为空，就不传电话这个字段
        delete params.mobile;
      }
      if (form.role) {
        params.role = form.role;
      }

      loginAndUserApi.searchUserList(params).then((res) => {
        let { data, code, message } = res.data;
        if (code == 200) {
          this.formData = data; //父组件不能直接给子组件
        }
      });
    },
    // 路由跳转
    toExc() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  width: 80%;
  border: 2px solid red;
  .home-top {
    display: inline-flex;
    margin-top: 20px;
  }
  .home-content {
  }
}
</style>
