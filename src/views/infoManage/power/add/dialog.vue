<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    append-to-body
    width="30%">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" size="small">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="角色描述" prop="remark">
        <el-input v-model="form.remark" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="close">取 消</el-button>
      <el-button type="primary" size="small" @click="sureAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addRoleInfo } from '@/api/infoManage'
export default {
  props: {
    title: String,
    editeRow: Object
  },
  data() {
    return {
      isShow: false,
      form: {
        roleName: '',
        remark: '',
        authId: []
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    show() {
      this.isShow = true
      if (this.title === '编辑角色') {
        this.$nextTick(() => {
          this.form.roleName = this.editeRow.roleName
          this.form.remark = this.editeRow.remark
        })
      } else {
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields()
        })
      }
    },
    close() {
      this.isShow = false
    },
    // 点击确定
    sureAdd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.title === '新增角色') {
            addRoleInfo(this.form).then(res => {
              console.log(res)
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
