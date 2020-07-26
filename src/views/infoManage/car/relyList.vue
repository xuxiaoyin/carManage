<template>
  <div class="app-container">
    <div class="topSearch">
      <div class="searchBox">
        <el-form inline :model="form">
          <el-form-item label="品牌" prop="brandName">
            <el-input v-model="form.brandName" size="mini" placeholder="请输入品牌名称" />
          </el-form-item>
          <el-form-item label="车牌号" prop="carLicense">
            <el-input v-model="form.carLicense" size="mini" placeholder="请输入车牌号" />
          </el-form-item>
          <el-form-item label="车主" prop="ownerName">
            <el-input v-model="form.ownerName" size="mini" placeholder="请输车主姓名" />
          </el-form-item>
          <el-form-item label="车系" prop="seriesName">
            <el-input v-model="form.seriesName" size="mini" placeholder="请输入车系名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="listLoading" @click="fetchData">查询</el-button>
            <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('添加外租车辆')">新增</el-button>
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
        <el-table-column label="车牌号" prop="carLicense" show-overflow-tooltip />
        <el-table-column label="车型" prop="brandYear" show-overflow-tooltip />
        <el-table-column label="车主" prop="ownerName" show-overflow-tooltip />
        <el-table-column label="车主联系方式" prop="ownerTel" show-overflow-tooltip />
        <el-table-column label="开始时间" prop="startDate" show-overflow-tooltip />
        <el-table-column label="结束时间" prop="endDate" show-overflow-tooltip />
        <el-table-column label="费用" prop="rentFee" show-overflow-tooltip />
        <el-table-column label="相关协议" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑长租车辆信息',scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑外租车辆信息',scope.row)"><i class="el-icon-edit" /></el-button>
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
import { queryOutRentList, delOutRent } from '@/api/infoManage'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        'brandName': '',
        'carLicense': '',
        'ownerName': '',
        'seriesName': '',
        'pageNum': 1,
        'pageSize': 10
      },
      total: 10
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 跳转新增, 编辑,详情
    gotoEdite(text, row) {
      this.$router.push({
        name: 'relyList-add',
        params: {
          title: text,
          currentRow: row || {}
        }
      })
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    delectRow(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delOutRent({ rentId: rows[index].rentId }).then(res => {
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
      queryOutRentList(this.form).then(res => {
        this.list = res.body
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
  .topSearch {
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
