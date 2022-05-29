<template>
    <div class="temp">
        <div class="map">
           <el-form ref="loginFormRef" :rules="formRules" :model="form" label-width="80px">
              <el-form-item label="用户">
                    <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                    <el-input  type="password" v-model="form.password"></el-input>
              </el-form-item>
               <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="primary" @click="register">注册</el-button>
            </el-form>

        </div>
    </div>
</template>
<script>
import { loginAndUserApi } from "@/apiController/loginAndUser.js";

  export default {
    data(){
          return{
              form:{
                  username:"admin",
                  password:"123456",

              },
              formRules:{
                   username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ]

                },
    
  }
    
     
             

    
             
         
         
    },
    methods:{
      register() {
          this.$router.push({ path: "/register", params: {} });
     },
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

         
    
  
   
  }
</script>
<style lang="less" scoped>
.temp {
    display: flex;
  justify-content: center;
  align-items: center;

}
</style>
