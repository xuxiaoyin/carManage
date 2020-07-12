<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="车牌号" prop="carId">
            <el-select v-model="form.carId" class="inp" placeholder="请选择车牌号" filterable>
              <el-option
                v-for="item in carList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车型名称" prop="brandYear">
            <el-input v-model="form.brandYear" class="inp" placeholder="请输入车型名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="承租方" prop="custId">
            <el-select v-model="form.custId" class="inp" placeholder="请选择承租方" filterable>
              <el-option
                v-for="item in customerList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              class="inp"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              class="inp"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">其他信息</h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="计费方式" prop="feeType">
            <el-select v-model="form.feeType" class="inp" placeholder="请选择车牌号" filterable>
              <el-option
                v-for="item in feeTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计费" prop="rentFee">
            <el-input v-model="form.rentFee" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top: 20px;">
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
import { addLongRent, queryLongRent, updateLongRent } from '@/api/infoManage'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        'carId': '',
        'custId': '',
        'feeType': '',
        'brandYear': '',
        'startDate': '',
        'endDate': '',
        'rentFee': ''
      },
      carList: [
        { label: '粤A123', value: 1 },
        { label: '粤A456', value: 2 },
        { label: '粤A789', value: 3 }
      ],
      customerList: [
        { label: '承租方', value: 1 },
        { label: '承租方1', value: 2 },
        { label: '承租方2', value: 3 }
      ],
      feeTypeList: [
        { label: '按天', value: 1 },
        { label: '按月', value: 2 },
        { label: '按总费用', value: 3 }
      ],
      rules: {
        name1: [
          { required: true, message: '请输入车牌号', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请选择品牌', trigger: 'change' }
        ]
      },
      btnLoading: false
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/car/longTermList' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑长租车辆信息') {
      this.getEditeInfo()
      // this.form = this.$route.params.currentRow
    }
  },
  methods: {
    // 获取编辑初始化信息
    getEditeInfo() {
      queryLongRent({ lrId: this.$route.params.currentRow.lrId }).then(res => {
        this.form = res.body
      })
    },
    // 点击修改
    sureEdite() {},
    // 点击添加
    sureAdd() {
      this.btnLoading = true
      if (this.$route.params.title === '添加长租车辆') {
        addLongRent(this.form).then(res => {
          this.btnLoading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push({ path: '/infoManage/car/longTermList' })
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        updateLongRent(this.form).then(res => {
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
