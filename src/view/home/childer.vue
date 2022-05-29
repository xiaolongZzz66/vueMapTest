<template>
  <div class="childer">
    <el-row class="home-top" :gutter="1">
      <el-form ref="loginFormRef" :model="userForm" label-width="80px">
        <el-col :span="6">
          <el-form-item label="用户名">
            <el-input v-model="userForm.name" placeholder="用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="角色">
            <el-select v-model="userForm.role" placeholder="角色">
              <el-option
                v-for="(item, index) in roleLists"
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
            <el-button @click="resetLoginForm">重置</el-button>
            <!-- 重置功能 -->
            <!-- 1、清空表单（搜索）的数据
            2、请求Ajax，然后将返回的列表展示出来 -->
            <!-- uncle -->
            <!-- 1、创建uncle -->
            <!-- 2、home里面要有个按钮可以跳转到uncle中 -->
            <!-- 3、uncle里面增加一个按钮，“表头设置”按钮，点击按钮弹出一个弹框 -->
            <!-- <el-button @click="tableHeaderSetClick">表头设置</el-button> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";

export default {
  data() {
    return {
      userForm: {}, //表单数据
    };
  },
  props: {
    roleLists: {
      type: Array,
      default: () => {
        return [];
      },
    }, //角色下拉列表
    // searchFns:{
    //     type:Object
    // },
  },
  methods: {
    // 搜索用户
    searchClick() {
      debugger;
      // 参数转换
      let params = {
        mobile: this.userForm.phone,
        username: this.userForm.name,
      };
      if (!params.phone) {
        //如果电话为空，就不传电话这个字段
        delete params.mobile;
      }
      if (this.userForm.role) {
        params.role = this.userForm.role;
      }

      loginAndUserApi.searchUserList(params).then((res) => {
        let { data, code, message } = res.data;
        if (code == 200) {
          //   this.formData = data;//父组件不能直接给子组件
          // $emit(event: string, ...args: any[])
          this.$emit("searchListClik", data);
        }
      });
    },
    //点击重置按钮，清空表单（搜索）的数据
    resetLoginForm() {
      debugger;
      this.$refs.loginFormRef.resetFields();
      this.$emit("refchongzhi", {});
    },
  },
};
</script>

<style lang="less" scoped>
.childer {
  border: 2px solid blue;
}
</style>