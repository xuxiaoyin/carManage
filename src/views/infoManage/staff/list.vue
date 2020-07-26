<template>
  <div class="app-container">
    <div class="topSearch">
      <div class="searchBox">
        <el-form inline :model="form">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="form.userName" size="mini" placeholder="请输入用户名称" />
          </el-form-item>
          <el-form-item label="电话号码" prop="phoneNumber">
            <el-input v-model="form.phoneNumber" size="mini" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="请输入职位" prop="office">
            <el-input v-model="form.office" size="mini" placeholder="客户标识" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="listLoading" @click="fetchData">查询</el-button>
            <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增员工')">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="tableWrap">
      <el-table
        v-loading="listLoading"
        :data="list"
        height="100%"
        element-loading-text="Loading"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column label="姓名" prop="userName" width="100" show-overflow-tooltip />
        <el-table-column label="身份证" prop="cardId" min-width="150" />
        <el-table-column label="电话号码" prop="phoneNumber" min-width="110" />
        <el-table-column label="地址" prop="address" show-overflow-tooltip min-width="300" />
        <el-table-column label="入职时间" prop="onboardingDate" show-overflow-tooltip min-width="120" />
        <el-table-column label="职位" prop="office" show-overflow-tooltip width="100" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑员工信息',scope.row)"><i class="el-icon-edit" /></el-button>
            <el-button type="text" size="small" @click="delectRow(scope.$index, list)"><i class="el-icon-delete" /></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tablePage">
      <el-pagination
        background
        :current-page="form.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { queryUserList, deleteUserInfo } from '@/api/infoManage'
export default {
  data() {
    return {
      searchText: '',
      list: [],
      listLoading: false,
      form: {
        'pageNum': '1',
        'pageSize': '10',
        'orderBy': '',
        'userName': '',
        'phoneNumber': '',
        'office': ''
      },
      total: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 跳转新增
    gotoEdite(text, row) {
      this.$router.push({
        name: 'staff-add',
        params: {
          title: text,
          currentRow: row || {}
        }
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    delectRow(index, rows) {
      const row = rows[index]
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUserInfo({ userId: row.userId }).then(res => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    fetchData() {
      this.listLoading = true
      queryUserList(this.form).then(res => {
        this.list = res.body
        // this.list = response.data.items
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>
