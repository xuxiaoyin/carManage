<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名" prop="name1">
            <el-input v-model="form.name1" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="电话" prop="name2">
            <el-input v-model="form.name2" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="驾驶证" prop="name3">
            <el-input v-model="form.name3" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="name4">
            <el-radio v-model="form.name4" label="1">男</el-radio>
            <el-radio v-model="form.name4" label="2">女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证" prop="name5">
            <el-input v-model="form.name5" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="住址" prop="name6">
            <el-input v-model="form.name6" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">其他信息</h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="入职时间" prop="name7">
            <el-date-picker
              v-model="form.name7"
              type="date"
              placeholder="选择日期"
              class="inp"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系人" prop="name8">
            <el-input v-model="form.name8" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="紧急联系方式" prop="name9">
            <el-input v-model="form.name9" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item>
            <div>
              <el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" size="small" @click="sureAdd('ruleForm')">确 定</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        name1: '',
        name2: '',
        name3: '',
        name4: '',
        name5: '',
        name6: '',
        name7: '',
        name8: '',
        name9: ''
      },
      rules: {
        name1: [
          { required: true, message: '请输员工姓名', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入驾驶证', trigger: 'blur' }
        ],
        name4: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/driver' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑司机信息') {
      this.form = this.$route.params.currentRow
    }
  },
  methods: {
    // 点击修改
    sureEdite() {},
    // 点击添加
    sureAdd() {},
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
