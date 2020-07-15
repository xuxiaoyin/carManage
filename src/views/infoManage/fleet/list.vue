<template>
  <div class="app-container">
    <div class="topSearch">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增车队')">新增</el-button>
      <div class="searchBox">
        <el-form inline :model="form">
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
          <el-form-item label="车队名称" prop="fleetName">
            <el-input v-model="form.fleetName" size="mini" placeholder="请输入车队名称" />
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
        <el-table-column label="车队名称" prop="fleetName" show-overflow-tooltip />
        <el-table-column label="联系人" prop="contact" show-overflow-tooltip />
        <el-table-column label="联系方式" prop="contactNumber" show-overflow-tooltip />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑车队信息',scope.row)"><i class="el-icon-edit" /></el-button>
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
import { queryFleetList, fleetDelete } from '@/api/infoManage'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        'fleetName': '',
        'fleetType': 2,
        'pageNum': 1,
        'pageSize': 10
      },
      total: 10,
      fleetTypeList: [
        { label: '挂靠车队', value: 1 },
        { label: '外系统车队', value: 2 }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 跳转新增, 编辑,详情
    gotoEdite(text, row) {
      this.$router.push({
        name: 'fleet-add',
        params: {
          title: text,
          currentRow: row.fleetId ? { fleetType: this.form.fleetType, ...row } : {}
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
        fleetDelete({ fleetId: rows[index].fleetId, fleetType: this.form.fleetType }).then(res => {
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
      queryFleetList(this.form).then(res => {
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
