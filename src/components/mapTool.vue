<template>
  <div class="coord-picker">
    <div class="map-title">地图选择</div>
    <div class="map-container">
      <!-- 地图对象 -->
      <amap
        cache-key="coord-picker-map"
        mmap-style="amap://styles/whitesmoke"
        async
        :center.sync="center"
        :zoom.sync="zoom"
        is-hotspot
        @click="onClickMapAddress"
      >
        <!-- 地图工具控件,控制地图缩放级别 -->
        <amap-tool-bar />

        <!-- marker标记点 -->
        <amap-marker v-if="position" :position.sync="position" draggable />

        <el-card class="result-panel">
          <div style="display: flex;">
            <el-autocomplete
              v-model="query"
              placeholder="输入关键词"
              style="flex: 1"
              value-key="name"
              :fetch-suggestions="autoComplete"
              @select="onSelectLocation"
              id="searchInput"
              :hide-loading="false"
              ref="searchInput"
              :debounce="0"
              :highlight-first-item="true"
            />
            <el-button @click="onClickShowAutoComplete(query)" :disabled="!query" type="primary">
              搜索
            </el-button>
          </div>
        </el-card>
      </amap>
    </div>
    <!-- 地理信息 -->
    <div class="info">
      <el-form :inline="true">
        <el-row>
          <el-col :span="7">
            <el-form-item label="经纬度:" label-position="left">
              <el-input size="medium" v-model="positionText" :disabled="!editStatus"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" class="confirmBtn" @click="editPositionAndCancel(editStatus)">{{ editStatus ? '取消' : '编辑' }}</el-button>
              <el-button type="primary" class="confirmBtn" @click="editPosition" v-show="editStatus">确定</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="地址值:" label-position="left">
              <el-input size="medium" v-model="query" class="noneBorderInput" disabled> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="confirmBTNContainer">
      <el-button slot="append" type="primary" class="confirmBtn" @click="onCanclePosition">取消</el-button>
      <el-button slot="append" type="primary" class="confirmBtn" @click="onConfirmPosition">确定</el-button>
    </div>
  </div>
</template>

<script>
// 引用第三组件amap,可以将高德地图以标签的形式去编程，属性可以双向绑定
import { loadAmap, loadPlugins } from '@amap/amap-vue'

export default {
  props: {
    //设备地址
    gpsLocation: {
      type: String,
      default: ''
    },
    //gps定位经纬度，中间逗号隔开
    gps: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      center: [116.405334, 39.90462], //地图中心坐标
      zoom: 6, //地图缩放等级;默认参数zoom可设范围：[2,20]
      query: '', //搜索输入框关键字
      position: null, //描点经纬度位置数组[1,2]
      mapResponse: {}, //地图信息对象
      editStatus: false, //是否可以编辑position
      positionTextCope: '', //编辑的时候备份position
      // positionText:''//设备地址字符串（逗号分隔开的）
    }
  },
  computed: {
    // 经纬度字符串
    positionText: {
      set(newV) {
        if (newV) {
          if (!newV.includes(',')) return this.$message({ message: '请输入包含逗号的正确格式', type: 'error' })
          newV.split(',').forEach(item => {
            if (isNaN(item)) {
              return this.$message({ message: '请输入正确格式', type: 'error' })
            }
          })
          this.position = newV.split(',')
        } else {
          this.position = null
        }
      },
      get() {
        if (!this.position) return ''
        return `${this.position[0]},${this.position[1]}`
      }
    }
  },
  // watch:{
  //   position:{

  //     immediate:true
  //   }
  // },
  created() {
    new Promise(async resolve => {
      // loadAmap()加载AMap，然后loadPlugins()去加载各个插件
      const AMap = await loadAmap()
      await loadPlugins(['AMap.AutoComplete', 'AMap.CitySearch', 'AMap.Geocoder'])

      // 输入意见提示插件
      this.autoCompletePlugin = new AMap.AutoComplete({})

      //ip定位插件。根据网络请求中ip定位（当没有位置信息的时候）
      this.citySearch = new AMap.CitySearch({})
      if (this.gpsLocation) {
        this.query = this.gpsLocation
      }
      if (this.gps) {
        this.setLocationAndMark(this.gps)
      } else {
        this.setFirstStartLocation()
      }

      //逆向地理编码插件，根据地理IP去获取对应的详情地址信息
      this.geocoder = new AMap.Geocoder({})

      resolve()
    })
  },
  mounted() {},
  methods: {
    //设置第一次进入时，没有经纬度，根据ip去定位ip所在城市
    setFirstStartLocation() {
      let that = this
      // citySearch插件中getLocalCity()方法返回ip所在城市位置
      this.citySearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 查询成功，result即为当前所在城市信息
          // 计算中心点坐标
          let topLeftX = result.rectangle.split(';')[0].split(',')[0]
          let topLeftY = result.rectangle.split(';')[0].split(',')[1]
          let bottomRightX = result.rectangle.split(';')[1].split(',')[0]
          let bottomRightY = result.rectangle.split(';')[1].split(',')[1]
          let centerLocation = [(Number(topLeftX) + Number(bottomRightX)) / 2, (Number(topLeftY) + Number(bottomRightY)) / 2]
          that.center = centerLocation
          that.zoom = 11
        }
      })
    },
    // 点击地图获取经纬度location
    onClickMapAddress(e) {
      if (e.lnglat) {
        this.position = [e.lnglat.lng, e.lnglat.lat]
        this.getAddressByLocation(this.position)
      } else {
        this.position = null
        this.center = []
      }
    },
    // 根据经纬度location获取address
    async getAddressByLocation(locations) {
      let that = this
      // Geocoder插件中getAddress方法，可以逆向地理编码获取结构化地址
      let res = await this.geocoder.getAddress(locations, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          let addressComponent = result.regeocode.addressComponent
          //省市区县信息
          let district = addressComponent.province + addressComponent.city + addressComponent.district
          //城镇街道地址
          let address = addressComponent.township + addressComponent.street + addressComponent.streetNumber
          //搜索信息
          that.query = result.regeocode.formattedAddress
          that.mapResponse = {
            adcode: result.regeocode.addressComponent.adcode,
            address: address,
            district: district,
            location: locations.join(','),
            name: that.query
          }
          that.setLocationAndMark(locations.join(','))
        } else {
          that.$message({
            message: '请输入有效经纬度',
            type: 'error'
          })
        }
      })
    },
    //意见下拉列表被选择触发
    onSelectLocation(e) {
      // 当直接搜索-省-市 时，location没有值
      if (!e.location)
        return this.$message({
          message: '请重新选择有效地址',
          type: 'error'
        })
      this.query = e.name
      // 维护响应的地理信息对象
      this.mapResponse = {
        adcode: e.adcode,
        address: e.address,
        district: e.district,
        id: e.id,
        location: e.location.lng + ',' + e.location.lat,
        name: e.name
      }

      this.setLocationAndMark(this.mapResponse.location)
    },
    // 设置标志点和中心点
    setLocationAndMark(location) {
      if (location) {
        this.position = location.split(',')
        this.center = location.split(',')
        this.zoom = 14
      } else {
        this.position = null
      }
    },
    // 确认位置信息按钮
    onConfirmPosition() {
      if (!this.query) return this.$message('请输入地址')
      if (this.position.length === 0) return this.$message('请选择详情地址')

      if (Object.keys(this.mapResponse).length > 0) {
        this.$emit('confirmPosition', {
          districtAddress: this.query,
          mapResponse: this.mapResponse
        })
        this.clearData()
      } else {
        return this.$message('请重新输入地址')
      }
    },
    //取消位置选择
    onCanclePosition() {
      this.$emit('confirmPosition')
    },
    //是否可以编辑gps和取消编辑,可以编辑时，确定需要根据gps位置获取详情地址
    editPositionAndCancel(editStatus) {
      debugger
      if (editStatus) {
        // 还原
        this.position = this.positionTextCope ? this.positionTextCope.split(',') : null
      } else {
        // 备份
        this.positionTextCope = this.positionText
      }
      this.editStatus = !editStatus
    },
    // 确定编辑,根据gps去获取对应地址值
    editPosition() {
      if (this.positionText) {
        this.getAddressByLocation(this.position)
        this.editStatus = false
      } else {
        return this.$message({ message: '请输入经纬度', type: 'error' })
      }
      // this.getAddressByLocation(this.position).then(res => {
      //   debugger
      //   if (res == 'success') {
      //     this.setLocationAndMark(this.position)
      //     this.editStatus = false
      //   }
      // })
    },
    // 清空数据数据
    clearData() {
      ;(this.position = null), (this.query = '')
    },
    // 点击展示自动提示信息
    onClickShowAutoComplete(query) {
      query && this.$refs.searchInput.focus()
    },
    // 搜索提示方法，keyWord搜索关键字，callback由element封装的回调，可以直接将数据返回
    async autoComplete(keyWord, callback) {
      let that = this
      if (!keyWord) {
        return callback([])
      }
      //tips意见列表
      let tips = []
      if (keyWord) {
        this.autoCompletePlugin.search(keyWord, (status, result) => {
          if (keyWord !== that.query) return
          if (status === 'complete' && result.tips) {
            tips = result.tips
          } else {
            tips = []
          }
          callback(tips)
        })
      }
    }
  },
  beforeDestroy() {},
  watch: {}
}
</script>

<style lang="less" scoped>
.map-title {
  width: 80px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1b1b1c;
  line-height: 28px;
  margin-bottom: 16px;
  margin-left: 4px;
}
.map-container {
  position: relative;
  width: 100%;
  height: 65vh;
}
.map-container /deep/ .amap-toolbar {
  left: 20px !important;
  bottom: 20px !important;
  right: unset !important;
  top: unset !important;
}
.confirmBtn {
  color: #fff !important;
  background-color: #409eff !important;
  border-color: #409eff !important;
}
.result-panel {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;

  & /deep/ .el-card__body {
    padding: 0px !important;
  }
}

.position-container {
  position: absolute;
  left: 10px;
  top: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;

  & /deep/ .el-card__body {
    padding: 0px !important;
  }
}

.info {
  width: 100%;
  padding-left: 6px;
  padding-top: 22px;
  & /deep/ .el-input__inner {
    outline: none;
    // border: none;
    height: 32px;
  }
  .noneBorderInput {
  }
}

.confirmBTNContainer {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

//  .amap-sug-result{
//   z-index: 2088;
//     width: 210px;
//     position: fixed;
//     top: 137px;
//     left: 332px;
// }
</style>
