<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="form.userName" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系电话" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证" prop="cardId">
            <el-input v-model="form.cardId" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属角色" prop="roleId">
            <el-select v-model="form.roleId" class="inp" multiple collapse-tags>
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">职位信息</h1>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="入职时间" prop="onboardingDate">
            <el-date-picker
              v-model="form.onboardingDate"
              type="date"
              placeholder="选择日期"
              class="inp"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职位" prop="office">
            <el-input v-model="form.office" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="margin-top: 20px;">
          <el-form-item>
            <div v-if="$route.params.title && $route.params.title === '新增员工'">
              <el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>
              <el-button type="primary" size="small" @click="sureAdd('ruleForm')">添 加</el-button>
            </div>
            <div v-if="$route.params.title && $route.params.title === '编辑员工信息'">
              <el-button type="warning" size="small" @click="sureEdite">修 改</el-button>
              <el-button type="primary" size="small" @click="invite('ruleForm')">邀请员工</el-button>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { addUserInfo, updateUserInfo } from '@/api/infoManage'
export default {
  name: 'AddStaff',
  data() {
    return {
      form: {
        userName: '',
        cardId: '',
        phoneNumber: '',
        address: '',
        // onboardingDate: '',
        office: '',
        roleId: [],
        password: ''
      },
      roleList: [
        { name: '角色1', value: 1 },
        { name: '角色2', value: 2 },
        { name: '角色3', value: 3 },
        { name: '角色4', value: 4 },
        { name: '角色5', value: 5 },
        { name: '角色6', value: 6 },
        { name: '角色7', value: 7 }
      ],
      rules: {
        userName: [
          { required: true, message: '请输员工姓名', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      }
    }
  },
  beforeCreate() {
    if (!this.$route.params.title) {
      this.$router.push({ path: '/infoManage/staff' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑员工信息') {
      this.form = this.$route.params.currentRow
    }
  },
  methods: {
    // 点击修改
    sureEdite() {
      updateUserInfo(this.form).then(res => {
        console.log(res)
      })
    },
    // 点击添加
    sureAdd() {
      console.log(this.form)
      addUserInfo(this.form).then(res => {
        console.log(res)
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
