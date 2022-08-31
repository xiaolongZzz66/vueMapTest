<template>
  <!-- 修改前往管理对话框 -->
  <el-dialog title="修改" :visible.sync="editDialogVisible" width="30%">
    <el-form ref="editFormRef" :model="editForm" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="editForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色：">
        <el-input v-model="editForm.role"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="editForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="创建时间:">
        <el-input v-model="editForm.createTime"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="visibleBoolean = false"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      editForm: {},
      visibleBoolean: false, //el-dialog关闭或者开启属性
      // 控制修改前往管理的显示与隐藏
      //   这个地方，你传进来 是为true。但是在点击<el-button @click="editDialogVisible = false">取 消</el-button>取消按钮的时候，是不是该关掉弹框，怎么关，是不是要在点击取消的时候。这个取消按钮在子组件里面吧。
      //   editDialogVisible: false,
    };
  },
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  //   监听值得变化
//   watch: {
//     editDialogVisible: {
//       handler(val) {
//         debugger;
//         this.visibleBoolean = val;
//       },
//       immediate:true
//     },
//   },
  methods: {
    //   取消
    cancelClick() {
      debugger;
    //   this.visibleBoolean = false;
      editDialogVisible=false
      this.cancelClick
    },
  },
};
</script>
<style scoped>
</style>
