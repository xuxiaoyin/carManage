<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="车队名称" prop="fleetName">
            <el-input v-model="form.fleetName" class="inp" placeholder="请输入车队名称" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="form.contact" class="inp" placeholder="请输入联系人" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式" prop="contactNumber">
            <el-input v-model="form.contactNumber" class="inp" placeholder="请输入联系方式" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车队类型" prop="fleetType">
            <el-select v-model="form.fleetType" class="inp" placeholder="请选择车队类型">
              <el-option
                v-for="item in fleetTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { addFleetList, fleetQueryDetail, fleetUpdate } from '@/api/infoManage'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        'fleetName': '',
        'contact': '',
        'contactNumber': '',
        'fleetType': ''
      },
      rules: {
        fleetName: [
          { required: true, message: '请输入车队名称', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        fleetType: [
          { required: true, message: '请选择车队类型', trigger: 'change' }
        ]
      },
      fleetTypeList: [
        { label: '挂靠车队', value: 1 },
        { label: '外系统车队', value: 2 }
      ],
      btnLoading: false
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/fleet/list' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑车队信息') {
      // this.form = this.$route.params.currentRow
      this.getEditeInfo()
    }
  },
  methods: {
    // 获取编辑初始信息
    getEditeInfo() {
      const currentRow = this.$route.params.currentRow
      // queryCarInfo({ carId: this.$route.params.currentRow.carId }).then(res => {
      fleetQueryDetail({ fleetId: currentRow.fleetId, fleetType: currentRow.fleetType }).then(res => {
        this.form = res.body
        this.form.fleetType = currentRow.fleetType
      })
    },
    // 点击添加
    sureAdd(form) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.btnLoading = true
          if (this.$route.params.title === '新增车队') {
            addFleetList(this.form).then(res => {
              this.btnLoading = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ path: '/infoManage/fleet/list' })
            }).catch(() => {
              this.btnLoading = false
            })
          } else {
            fleetUpdate(this.form).then(res => {
              this.btnLoading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch(() => {
              this.btnLoading = false
            })
          }
        } else {
          return false
        }
      })
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
