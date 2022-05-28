<template>
   <div class="container">
       <div class="loginDiv">
           <el-form  :model="loginForm" ref="loginFormRef" :rules="loginFormRules">
              <el-form-item label="用户" prop="username">
                 <el-input v-model="loginForm.username" placeholder="请输入用户名">
                 </el-input>
               </el-form-item>
                <el-form-item label="密码" prop="password">
                 <el-input v-model="loginForm.password" placeholder="请输入密码" type="password">
                 </el-input>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" size="medium" @click="loginClick">登录</el-button>
                  <el-button type="primary" size="medium" @click="register">注册</el-button>
               </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
export default{
    data(){
        let checkPasswordConten =(rules,value,callback) =>{
            if(!value) return callback(new Error("不能为空"));
            let res =String(value).trim().length>=6;
            if(res){
                return callback();
                }else{
                    return callback(new Error("6位及以上密码"));
                }
        };
        return{
            loginForm:{},
            loginFormRules:{
                //登录表单校验 
              username:[
                  {
                       required: true,
                       message: "请输入用户名",
                        trigger: "blur"
                  }
              ],
               password: [
          //测试提交
                {
                   required: true,
                   validator: checkPasswordConten,
                    trigger: "blur"
                 }
              ]
            }
        }
    }
}
methods



    
</script>
<style scoped>

</style>