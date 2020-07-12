<template>
  <div class="app-container">
    <div class="topSearch">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增车辆')">新增</el-button>
      <div class="searchBox">
        <el-form inline :model="form">
          <el-form-item label="座位数" prop="seatId">
            <el-input v-model="form.seatId" size="mini" placeholder="请输入座位数" />
          </el-form-item>
          <el-form-item label="品牌" prop="brandName">
            <el-input v-model="form.brandName" size="mini" placeholder="请输入品牌名称" />
          </el-form-item>
          <el-form-item label="车系" prop="seriesName">
            <el-input v-model="form.seriesName" size="mini" placeholder="请输入车系名称" />
          </el-form-item>
          <el-form-item label="车牌号" prop="carLicense">
            <el-input v-model="form.carLicense" size="mini" placeholder="请输入车牌号" />
          </el-form-item>
          <el-form-item label="司机" prop="driver">
            <el-input v-model="form.driver" size="mini" placeholder="请输司机姓名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="listLoading" @click="fetchData">查询</el-button>
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
        <el-table-column label="品牌车系" prop="brandYear" min-width="120" show-overflow-tooltip />
        <el-table-column label="车牌号" prop="carLicense" min-width="100" show-overflow-tooltip />
        <el-table-column label="上牌时间" prop="licenseTime" show-overflow-tooltip />
        <el-table-column label="座位数" prop="seatNum" show-overflow-tooltip />
        <el-table-column label="颜色" prop="carColor" show-overflow-tooltip />
        <el-table-column label="租赁方式" prop="rentType" show-overflow-tooltip />
        <el-table-column label="双牌照" prop="is2license" show-overflow-tooltip />
        <el-table-column label="司机姓名" prop="driver" show-overflow-tooltip />
        <el-table-column label="联系方式" prop="phoneNumber" show-overflow-tooltip />
        <el-table-column label="上次保养" prop="carServiceRecord" show-overflow-tooltip />
        <el-table-column label="保险到期" prop="safeEndTime" show-overflow-tooltip />
        <el-table-column label="年审时间" prop="nextReviewTime" show-overflow-tooltip />
        <el-table-column label="公里数" prop="kilometers" show-overflow-tooltip />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑车辆信息',scope.row)"><i class="el-icon-edit" /></el-button>
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
import { queryCarList, deleteCarInfo } from '@/api/infoManage'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        pageNum: 1,
        pageSize: 10,
        seatId: '',
        brandName: '',
        seriesName: '',
        carLicense: '',
        driver: ''
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
        name: 'carlist-add',
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
        deleteCarInfo({ carId: rows[index].carId }).then(res => {
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
      queryCarList(this.form).then(res => {
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

<style lang="scss" scoped>
  .topSearch {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .tableWrap {
    margin-top: 10px;
    height: calc(100% - 80px);
  }
</style>
