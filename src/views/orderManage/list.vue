<template>
  <div class="app-container">
    <div class="topSearch">
      <div class="searchBox">
        <el-form inline :model="form">
          <el-form-item label="订单状态" prop="state">
            <el-select v-model="form.state" size="mini" placeholder="请选择订单状态">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="客户名称" prop="custName">
            <el-input v-model="form.custName" size="mini" placeholder="请输入客户名称" />
          </el-form-item>
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker
              v-model="form.startDate"
              style="width: 176px;"
              size="mini"
              class="inp"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker
              v-model="form.endDate"
              style="width: 176px;"
              size="mini"
              class="inp"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" :loading="listLoading" @click="fetchData">查询</el-button>
            <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增订单')">新增</el-button>
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
        <el-table-column label="企业客户名称" prop="custName" show-overflow-tooltip min-width="120" />
        <el-table-column label="企业客户联系人" prop="contactPerson" show-overflow-tooltip min-width="120" />
        <el-table-column label="用车方式" prop="useWay" show-overflow-tooltip min-width="80" />
        <el-table-column label="车系名称" prop="seriesName" show-overflow-tooltip min-width="100" />
        <el-table-column label="开始用车时间" prop="startDate" show-overflow-tooltip min-width="150" />
        <el-table-column label="预计结束时间" prop="preEndDate" show-overflow-tooltip min-width="150" />
        <el-table-column label="用车数量" prop="carCount" show-overflow-tooltip min-width="80" />
        <el-table-column label="订车人" prop="booker" show-overflow-tooltip min-width="80" />
        <el-table-column label="订车人电话" prop="bookerTel" show-overflow-tooltip min-width="100" />
        <el-table-column label="详细行程" prop="travelDetail" show-overflow-tooltip min-width="120" />
        <el-table-column label="用车审批文件" prop="approveDoc" show-overflow-tooltip min-width="120" />
        <el-table-column label="备注" prop="remark" show-overflow-tooltip min-width="100" />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" title="费用上报" @click="gotoReporting(scope.row)"><i class="el-icon-printer" /></el-button>
            <el-button type="text" size="small" title="编辑订单信息" @click="gotoEdite('编辑订单信息',scope.row)"><i class="el-icon-edit" /></el-button>
            <el-button type="text" size="small" title="删除订单" @click="delectRow(scope.$index, list)"><i class="el-icon-delete" /></el-button>
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
import { queryOrderListForPC, deleteOrder } from '@/api/orderManage'
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        'state': '',
        'startDate': '',
        'endDate': '',
        'custName': '',
        'pageNum': 1,
        'pageSize': 10
      },
      total: 10,
      stateList: [
        { label: '待处理', value: 1 },
        { label: '进行中', value: 2 },
        { label: '已完成', value: 3 }
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
        name: 'order-add',
        params: {
          title: text,
          currentRow: row
        }
      })
    },
    gotoReporting(row) {
      // 跳转费用上报
      this.$router.push({
        name: 'order-add',
        params: {
          currentRow: row
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
        deleteOrder({ orderId: rows[index].orderId }).then(res => {
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
      queryOrderListForPC(this.form).then(res => {
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
