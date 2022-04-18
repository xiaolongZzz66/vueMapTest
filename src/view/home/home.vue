<template>
    <div class="formData">
        <el-table :data="formData">
          <el-table-column label="用户名：" prop="username"></el-table-column>
          <el-table-column label="角色：" prop="role"></el-table-column>
          <el-table-column label="邮箱：" prop="email"></el-table-column>
          <el-table-column label="电话：" prop="mobile"></el-table-column>
          <el-table-column label="创建时间：" prop="createTime"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";
export default {
// 1、提交测试3

    data() {
        return {
            formData:[]
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        // 获取用户列表
        getUserList(){
            loginAndUserApi.userList().then((res) => {
                debugger
            })
        }
    },
}
</script>


<style lang="less" scoped>
    .formData{
        display: flex;
    justify-content: center;
    align-items: center;

    }
</style>
