<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="订单编号">
            <el-input v-model="currentRow.orderId" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用车单位">
            <el-input v-model="currentRow.custName" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订车人">
            <el-input v-model="currentRow.booker" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-input v-model="currentRow.startDate" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-input v-model="currentRow.preEndDate" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用车数量">
            <el-input v-model="currentRow.carCount" class="inp" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌">
            <el-input v-model="currentRow.carCount" class="inp" disabled />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">上报信息</h1>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="上报阶段">
            <el-date-picker
              v-model="daterange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="计费方式" prop="billType">
            <el-radio-group v-model="form.billType">
              <el-radio v-for="item in billTypeList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用车级别" prop="useStyle">
            <el-select v-model="form.useStyle" class="inp" placeholder="请选择品牌车系">
              <el-option
                v-for="item in useStyleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌" prop="seriesId">
            <el-select v-model="form.seriesId" class="inp" placeholder="请选择车系级别">
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
          <el-form-item label="座位数" prop="seatNum">
            <el-select v-model="form.seatNum" class="inp" placeholder="请选择座位数">
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
          <el-form-item label="开始用车时间" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              class="inp"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预计结束时间" prop="preEndDate">
            <el-date-picker
              v-model="form.preEndDate"
              class="inp"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订车天数">
            <el-input v-model="form.useDays" class="inp" placeholder="自动计算" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用车数量" prop="carCount">
            <el-input v-model="form.carCount" class="inp" placeholder="请输入用车数量" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行程信息" prop="travelDetail">
            <el-input v-model="form.travelDetail" class="inp" placeholder="请填写行程信息" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用车单位" prop="custId">
            <el-select v-model="form.custId" class="inp" placeholder="请选择座位数">
              <el-option
                v-for="item in custList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订车人" prop="booker">
            <el-input v-model="form.booker" class="inp" placeholder="请输入订车人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="订车人电话" prop="bookerTel">
            <el-input v-model="form.bookerTel" class="inp" placeholder="请输入订车人电话" />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: right;">
          <el-form><el-button type="success" size="small" :loading="btnLoading" @click="addRider">添加乘车人</el-button></el-form>
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
import { addOrder } from '@/api/orderManage'
import { dataArea } from '@/utils/area'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
      },
      daterange: '',
      rules: {
        name1: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请选择上牌时间', trigger: 'change' }
        ]
      },
      billTypeList: [
        { label: '全包价', value: 1 },
        { label: '日租价', value: 2 },
        { label: '自定义', value: 3 }
      ],
      // orderWayList: [
      //   { label: '客户小程序下单', value: 1 },
      //   { label: '公司端下单', value: 2 }
      // ],
      useStyleList: [
        { label: '经济型', value: '经济型' },
        { label: '舒适型', value: '舒适型' },
        { label: '商务型', value: '商务型' },
        { label: '豪华型', value: '豪华型' },
        { label: '巴士', value: '巴士' },
        { label: '超豪华', value: '超豪华' },
        { label: '双牌照', value: '双牌照' }
      ],
      seriesList: [
        { label: '任意经济型', value: 1 },
        { label: '本田', value: 2 },
        { label: '丰田', value: 3 },
        { label: '比亚迪', value: 4 }
      ],
      dataArea: dataArea,
      seatList: [
        { label: '5座', value: 1 }
      ],
      custList: [
        { label: '单位1', value: 1 },
        { label: '单位2', value: 2 }
      ],
      btnLoading: false,
      currentRow: {}
    }
  },
  mounted() {
    this.currentRow = this.$route.params.currentRow
    if (!this.currentRow || !this.currentRow.orderId) {
      this.$router.push({ path: '/orderManage/list/listOrder' })
    }
  },
  methods: {
    // 点击添加乘车人
    addRider() {
      const len = this.form.orderRidersList.length
      if (!len) {
        this.form.orderRidersList.push({ rider: '', riderTel: '' })
      } else {
        if (this.form.orderRidersList[len - 1].rider) {
          this.form.orderRidersList.push({ rider: '', riderTel: '' })
        }
      }
    },
    // 点击添加
    sureAdd(form) {
      this.btnLoading = true
      addOrder(this.form).then(res => {
        this.btnLoading = false
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$router.push({ path: '/orderManage/list/listOrder' })
      }).catch(() => {
        this.btnLoading = false
      })
    },
    // 点击取消
    resetForm() {}
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
