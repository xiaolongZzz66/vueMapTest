<template>
  <div class="home">
    <div>叔叔家</div>
    <el-row>
      <el-button @click="touncle">点击去home</el-button>
    </el-row>
    <!-- :searchFns="searchFns" -->
    <childer
      :roleLists="roleList"
      @searchListClik="searchList"
      @refchongzhi="chongzhi"
    ></childer>
    <el-button @click="tableHeaderSetClick">表头设置</el-button>

    <el-row class="home-content">
      <el-table :data="formData">
        <!-- <el-table-column label="用户名：" prop="username"></el-table-column>
        <el-table-column label="角色：" prop="role"></el-table-column>
        <el-table-column label="邮箱：" prop="email"></el-table-column>
        <el-table-column label="电话：" prop="mobile"></el-table-column>
        <el-table-column label="创建时间：" prop="createTime"></el-table-column> -->
        <!-- 遍历表头 key的值对应其数据的字段名 -->
        <!-- ["用户名", "角色", "邮箱", "电话", "创建时间"] -->
        <!-- username，role......let item = {lale:"用户名",prop:"username"} -->
        <!-- [{label:"用户名",prop:"username"},{lale:"角色",prop:"role"},{lale:"邮箱",prop:"email"},{lale:"电话",prop:"mobile"},{lale:"创建时间",prop:"createTime"}] -->
        <el-table-column
          v-for="item in cities"
          :key="item.label"
          :prop="item.prop"
          align="center"
          :label="item.label"
        >
        </el-table-column>
      </el-table>
    </el-row>

    <!-- 表头设置弹框 -->
    <el-dialog title="表头设置" :visible.sync="dialogTableVisible">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        >全选</el-checkbox
      >
      <div style="margin: 15px 0"></div>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
      >
        <!-- cities: [{label:"用户名",prop:"username"},{label:"角色",prop:"role"},{label:"邮箱",prop:"email"},{label:"电话",prop:"mobile"},{label:"创建时间",prop:"createTime"}], -->
        <el-checkbox
          v-for="city in cities"
          :label="city.label"
          :key="city.prop"
          >{{ city.label }}</el-checkbox
        >
      </el-checkbox-group>
      <!-- 复选框 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmTableHeaderClick"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import childer from "@/view/home/childer.vue";
import { loginAndUserApi } from "@/apiController/loginAndUser.js";
export default {
  data() {
    return {
      formData: [], //列表数据
      roleList: [], //角色下拉列表
      searchFns: {
        //   searchClick:this.searchClick
      },
      dialogTableVisible: false, //弹框显示与否
      checkAll: false,
      checkedCities: ["用户名"],
      cities: [//所有表头项
        { label: "用户名", prop: "username" },
        { label: "角色", prop: "role" },
        { label: "邮箱", prop: "email" },
        { label: "电话", prop: "mobile" },
        { label: "创建时间", prop: "createTime" },
      ],
      isIndeterminate: true,
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
      if (this.userForm.role) {
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
    touncle() {
      this.$router.push("/home");
    },
    // 表头设置对话框
    tableHeaderSetClick() {
      this.dialogTableVisible = true;
    },
    // 设置表头确认按钮
    confirmTableHeaderClick() {
      this.dialogTableVisible=false
      this.cities = checkedCities
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
  },
};
</script>
<style scoped>
</style>