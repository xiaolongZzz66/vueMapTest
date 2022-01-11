<template>
  <div>
    <div class="devInfo-head">
      <el-form label-width="120px" size="mini">
        <el-row class="device-handle">
           <el-col :span="10">
            <el-form-item label="安装位置:" >
              <el-input class="device-input" placeholder="请输入设备安装地址"  v-model="gpsLocation" />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="device-handle-col">
            <el-button class="btn-copy" type="primary" size="small"  @click="showMap()">设备地图</el-button>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备名称:">
              <el-input class="device-input"  placeholder="请输入设备名称" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 地图层 -->
    <el-dialog
      width="60%"
      title=""
      ref="mapDialog"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      class="map-dialog"
    >
      <amapTool></amapTool>
    </el-dialog>
  </div>

    
</template>

<script>
import amapTool from '@/components/mapTool.vue'
export default {
  components: {
    amapTool
  },
  data() {
    return {
      mode: 'search',
      center: null,
      zoom: 10,
      query: '',
      searching: false,
      tips: [],
      results: [],
      position: null,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      satellite: false,
      gpsLocation:'',
      dialogVisible:false
    }
  },
  methods: {
    showMap(){
      this.dialogVisible = true
    }
  },
}
</script>

<style  scoped>
.map-container {
  width: 100%;
  height: 600px;
}

.result-panel {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;

  

  
}
.info {
  position: absolute;
  right: 10px;
  top: 10px;
  padding-left: 24px;
}
</style>
