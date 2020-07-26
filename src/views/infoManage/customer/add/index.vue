<template>
  <div class="mainWrap customer-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="单位名称" prop="clientWayName">
            <!-- <span slot="label">
              <span class="el-icon-office-building icon" /> <label>单位名称</label>
            </span> -->
            <el-input v-model="ruleForm.clientWayName" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系人" prop="contactPerson">
            <el-input v-model="ruleForm.contactPerson" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式" prop="contactNumber">
            <el-input v-model="ruleForm.contactNumber" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位地址" prop="contactAddress">
            <el-input v-model="ruleForm.contactAddress" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户身份" prop="clientWayId">
            <el-input v-model="ruleForm.clientWayId" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部门" prop="clientWayType">
            <el-input v-model="ruleForm.clientWayType" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">发票信息</h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="发票抬头" prop="invoice">
            <el-input v-model="ruleForm.invoice" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="纳税人识别号" prop="taxpayerId">
            <el-input v-model="ruleForm.taxpayerId" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item>
            <div v-if="$route.params.title && $route.params.title === '新增客户'">
              <el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" size="small" @click="sureAdd('ruleForm')">添 加</el-button>
            </div>
            <div v-if="$route.params.title && $route.params.title === '编辑客户'">
              <el-button type="warning" size="small" @click="sureEdite">修 改</el-button>
              <el-button type="primary" size="small" @click="invite('ruleForm')">邀请客户</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addClientInfo, queryClientInfo, updateClientInfo } from '@/api/infoManage'
export default {
  data() {
    return {
      ruleForm: {
        clientWayName: '',
        clientWayType: '',
        contactPerson: '',
        contactNumber: '',
        contactAddress: '',
        invoice: '',
        taxpayerId: ''
      },
      rules: {
        clientWayName: [
          { required: true, message: '请输入单位名称', trigger: 'blur' }
        ],
        contactPerson: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/customer' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑客户') {
      // this.ruleForm = this.$route.params.currentRow
      this.queryClientInfo()
    }
  },
  methods: {
    // 获取编辑信息
    queryClientInfo() {
      queryClientInfo({ clientWayId: this.$route.params.currentRow.clientWayId }).then(res => {
        console.log(res)
        this.ruleForm = res.body
      })
    },
    // 点击添加
    sureAdd() {
      addClientInfo(this.ruleForm).then(res => {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.$router.push({ path: '/infoManage/customer/list' })
      })
    },
    // 点击修改
    sureEdite() {
      updateClientInfo(this.ruleForm).then(res => {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
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
  .customer-add {
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
