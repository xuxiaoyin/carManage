<template>
  <div class="mainWrap staff-add">
    <h1 class="topTitle">基本信息</h1>
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" class="ruleForm" inline>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="车牌号" prop="name1">
            <el-input v-model="form.name1" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌" prop="name2">
            <el-input v-model="form.name2" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="挂靠人" prop="name3">
            <el-input v-model="form.name3" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系方式" prop="name4">
            <el-input v-model="form.name4" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始时间" prop="name5">
            <el-input v-model="form.name5" class="inp" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="name6">
            <el-input v-model="form.name6" class="inp" />
          </el-form-item>
        </el-col>
      </el-row>

      <h1 class="topTitle">其他信息</h1>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="相关协议" prop="name7">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
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
      fileList: [],
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
      this.$router.push({ path: '/infoManage/car/longTermList' })
    } else {
      this.$route.meta.title = this.$route.params.title
    }
  },
  mounted() {
    if (this.$route.params.title && this.$route.params.title === '编辑挂靠车辆信息') {
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
