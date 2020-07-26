<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="品牌车系" prop="seriesId">
            <el-select v-model="form.carDetail.seriesId" class="inp" placeholder="请选择品牌车系">
              <el-option
                v-for="item in seriesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="carYear">
            <el-select v-model="form.carDetail.carYear" class="inp" placeholder="请选择年份">
              <el-option
                v-for="item in yearList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="座位数" prop="seatNum">
            <el-select v-model="form.carDetail.seatNum" class="inp" placeholder="请选择座位数">
              <el-option
                v-for="item in seatList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="颜色" prop="carColor">
            <el-select v-model="form.carDetail.carColor" class="inp" placeholder="请选择颜色">
              <el-option
                v-for="item in colorList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车系级别" prop="carLevel">
            <el-select v-model="form.carDetail.carLevel" class="inp" placeholder="请选择车系级别">
              <el-option
                v-for="item in levelList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!-- is2license -->
        <el-col :span="8">
          <el-form-item label="是否双牌照" prop="is2license">
            <el-select v-model="form.carDetail.is2license" class="inp" placeholder="请选择是否双牌照">
              <el-option
                v-for="item in radioList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="默认租赁方式" prop="rentType">
            <el-select v-model="form.carRentDefault.rentType" class="inp" placeholder="请选择默认租赁方式">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="购置价格" prop="price">
            <el-input v-model="form.carDetail.price" class="inp" placeholder="请输入购置价格" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌号" prop="carLicense">
            <el-input v-model="form.carDetail.carLicense" class="inp" placeholder="请输入车牌号" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="上牌时间" prop="licenseTime">
            <el-date-picker
              v-model="form.carDetail.licenseTime"
              class="inp"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">其他信息</h1>

      <el-row :gutter="20">
        <el-col v-if="form.carDriverRel" :span="8">
          <el-form-item label="司机姓名" prop="driverId">
            <el-select v-model="form.carDriverRel.driverId" class="inp" filterable placeholder="请输入关键字查询">
              <el-option
                v-for="item in driverList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.carDriverRel" :span="8">
          <el-form-item label="联系方式" prop="phoneNumber">
            <el-input v-model="form.carDriverRel.phoneNumber" class="inp" />
          </el-form-item>
        </el-col>
        <el-col v-if="form.carServiceRecord" :span="8">
          <el-form-item label="上次保养时间" prop="preCareTime">
            <el-date-picker
              v-model="form.carServiceRecord.preCareTime"
              class="inp"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="form.carServiceRecord" :span="8">
          <el-form-item label="保险到期时间" prop="safeEndTime">
            <el-date-picker
              v-model="form.carServiceRecord.safeEndTime"
              class="inp"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="form.carServiceRecord" :span="8">
          <el-form-item label="下次年审时间" prop="nextReviewTime">
            <el-date-picker
              v-model="form.carServiceRecord.nextReviewTime"
              class="inp"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="form.carServiceRecord" :span="8">
          <el-form-item label="公里数" prop="kilometers">
            <el-input v-model="form.carServiceRecord.kilometers" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <div>
              <el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" size="small" :loading="btnLoading" @click="sureAdd('ruleForm')">确 定</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addCarInfo, queryCarInfo, updateCarInfo } from '@/api/infoManage'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        'carDetail': {
          'seriesId': '',
          'carYear': '',
          'carColor': '',
          'carLevel': '',
          'seatNum': '',
          'carLicense': '',
          'licenseTime': '',
          'is2license': '',
          'yzLicense': '',
          'price': ''
        },
        'carServiceRecord': {
          'preCareTime': '',
          'safeEndTime': '',
          'nextReviewTime': '',
          'kilometers': ''
        },
        'carRentDefault': {
          'rentType': 1,
          'rentStartDate': '',
          'rentEndDate': '',
          'tdStartTime': '',
          'tdEndTime': ''
        },
        'carDriverRel': {
          'driverId': ''
        }
      },
      rules: {
        name1: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请选择上牌时间', trigger: 'change' }
        ]
      },
      seriesList: [
        { label: '车系名称', value: 3 }
      ],
      yearList: [
        { label: '2019款', value: 2019 }
      ],
      seatList: [
        { label: '5座', value: 1 }
      ],
      colorList: [
        { label: '白色', value: 1 }
      ],
      driverList: [
        { label: '张三', value: 1 }
      ],
      levelList: [
        { label: '经济型', value: 1 }
      ],
      radioList: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      typeList: [
        { label: '短租', value: 1 },
        { label: '长租', value: 2 },
        { label: '班车', value: 3 },
      ],
      btnLoading: false
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/car/list' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑车辆信息') {
      // this.form = this.$route.params.currentRow
      this.getEditeInfo()
    }
  },
  methods: {
    // 获取编辑初始信息
    getEditeInfo() {
      // queryCarInfo({ carId: this.$route.params.currentRow.carId }).then(res => {
      queryCarInfo({ carId: 1 }).then(res => {
        // this.form = res.body
        this.form.carDriverRel = res.body.carDriver
        this.form.carDetail = res.body.carDetail
        this.form.carServiceRecord = res.body.carServiceRecord
        this.form.carRentDefault = res.body.carRentDefault
      })
    },
    // 点击修改
    sureEdite() {},
    // 点击添加
    sureAdd(form) {
      this.btnLoading = true
      if (this.$route.params.title === '新增车辆') {
        addCarInfo(this.form).then(res => {
          this.btnLoading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push({ path: '/infoManage/car/list' })
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        updateCarInfo(this.form).then(res => {
          this.btnLoading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }).catch(() => {
          this.btnLoading = false
        })
      }
    },
    // 点击取消
    resetForm() {},
    // 点击邀请客户
    invite() {}
  }
}
</script>

<style lang="scss" scoped>
  .staff-add {
    padding: 18px;
    .topTitle {
      line-height: 32px;
      margin: 0;
      padding: 0;
      padding-left: 12px;
      margin-bottom: 20px;
      border-left: 3px solid #5C7CE1;
      font-weight: normal;
      font-size: 14px;
      color: #5C7CE1;
      background: rgba(244,247,250,1);
      border-radius: 4px 0 0 4px;
    }
    .ruleForm {
      .icon {
        margin-right: 5px;
        color: #F39800;
      }
      .inp {
        width: 200px;
      }
    }
  }
</style>
