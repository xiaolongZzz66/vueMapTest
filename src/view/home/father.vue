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
    <fathername :editDialogVisible="editDialogVisibleAAAAAAAA"></fathername>
    <!-- 你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西你学的什么东西 -->
    <el-row class="home-content">
      <el-table :data="formData">
        <el-table-column label="用户名：" prop="username"></el-table-column>
        <el-table-column label="角色：" prop="role"></el-table-column>
        <el-table-column label="邮箱：" prop="email"></el-table-column>
        <el-table-column label="电话：" prop="mobile"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="操作">
          <!-- <template slot="scope">这里不是你自己定义插槽，你在el-tabel里面，是使用的elementui提供的插槽 -->
          <!-- slot-scope="scope"  slot="name"这里不是一个东西。前面的是作用域插槽且只是用来传值的，后面是具名插槽且后面绑定的是这个插槽的名字 -->
          <template slot-scope="scope">
            <!-- {{scope.row}}这个可以拿到当前行的数据，这就是具名插槽的作用 -->
            <!-- {{ scope.row }} -->
            <!-- <el-button size="mini" type="text" @click="xiangQingButton"
              >详情</el-button
            > -->
            <el-button
              size="mini"
              type="text"
              @click="administrationButton(scope.row)"
              >前往管理</el-button
            >
            <!-- 命名注意，要能大概看出来你这个含义 -->
            <!-- <el-button size="mini" type="primary" @click="primaryButton"
              >删除</el-button
            > -->
            <!-- type="primary用来控制按钮类型的。 -->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import childer from "@/view/home/childer.vue";
import { loginAndUserApi } from "@/apiController/loginAndUser.js";
// 看到没有，重命名后，ctrl+c复制，这样不容易出错，不然很容易写错
import fathername from "@/view/home/fathername.vue";

export default {
  // 1、提交测试1

  data() {
    return {
      formData: [], //列表数据
      roleList: [], //角色下拉列表
      searchFns: {
        //   searchClick:this.searchClick
      },
      // editForm:[],
      // 控制修改前往管理的显示与隐藏
      //  editDialogVisible: false,
      // 控制修改前往管理的显示与隐藏
      editDialogVisibleAAAAAAAA: false,
    };
  },
  components: { childer, fathername },
  // editDialogVisible: false,？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？放到拿了？不要老是范这种错误，改写到哪里？
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
    // 前往管理的对话框
    administrationButton(user) {
      debugger;
      //  你写错单词了
      this.editDialogVisibleAAAAAAAA = true; //弹框出来，你这个定义了吗？然后呢，你控制dialog显示隐藏的那个属性，在那？是不是在fathername里面。接下来该怎么办
      // 父子组件传值会吗？是不是该把你想要的值传进入，你想让fathername里面的:visible.sync="editDialogVisible"为ture,该怎么办啊，是不是要传值进去是类，写写啊？？？？不知道咋写不知道从那写，
      console.log(user);
    },
  },
};

// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
// 周梦蝶，你再范这种错误，？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？下次就自己排除错误
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
