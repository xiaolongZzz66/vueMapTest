<!-- 一个新的vue模板，请在 -->
<template>
  <div>
    <el-row class="deviceall-handle">
      <el-radio-group v-model="filterName">
        <el-radio label="Temp">体温</el-radio>
      </el-radio-group>
    </el-row>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      filterName: ''
    }
  },

  // 计算属性，会监听依赖属性值随之变化
  computed: {
    ...mapGetters(['userPermissions', 'buttonType'])
  },
  // 监控data中的数据变化
  watch: {
    filterName(newVal) {
      this.$emit('changeLabel', newVal)
    }
  },
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.filterName = '1'
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang="less" scoped>
.el-radio-group {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
}
</style>
