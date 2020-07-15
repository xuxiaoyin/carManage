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
          <el-form-item label="车主姓名" prop="ownerName">
            <el-input v-model="form.ownerName" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车主联系方式" prop="ownerTel">
            <el-input v-model="form.ownerTel" class="inp" />
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
        <el-col :span="8">
          <el-form-item label="租赁费用" prop="rentFee">
            <el-input v-model="form.rentFee" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">其他信息</h1>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="相关协议" prop="protocol">
            <el-upload
              ref="upload"
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
import { addOutRent, updateOutRent, queryOutRent } from '@/api/infoManage'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        'carId': '',
        'ownerName': '',
        'ownerTel': '',
        'startDate': '',
        'endDate': '',
        'rentFee': '',
        'protocol': ''
      },
      fileList: [],
      rules: {
        userName: [
          { required: true, message: '请输员工姓名', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      btnLoading: false,
      carList: [
        { label: '粤A123', value: 1 },
        { label: '粤A456', value: 2 },
        { label: '粤A789', value: 3 }
      ]
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/car/relyList' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑外租车辆信息') {
      this.getEditeInfo()
      // this.form = this.$route.params.currentRow
    }
  },
  methods: {
    // 获取编辑车辆信息
    getEditeInfo() {
      queryOutRent({ rentId: this.$route.params.currentRow.rentId }).then(res => {
        this.form = res.body
      })
    },
    // 点击添加
    sureAdd() {
      this.btnLoading = true
      if (this.$route.params.title === '添加外租车辆') {
        addOutRent(this.form).then(res => {
          this.btnLoading = false
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push({ path: '/infoManage/car/relyList' })
        }).catch(() => {
          this.btnLoading = false
        })
      } else {
        updateOutRent(this.form).then(res => {
          this.btnLoading = false
          this.$message({
            message: '编辑成功',
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
    invite() {},
    handlePreview() {},
    handleRemove() {},
    submitUpload() {}
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
