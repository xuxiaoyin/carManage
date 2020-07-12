<template>
  <div class="app-container">
    <div class="topSearch">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增客户')">新增</el-button>
      <div class="searchBox">
        <el-input v-model="searchText" placeholder="请输入内容" size="mini">
          <el-button slot="append" icon="el-icon-search" type="primarry" size="mini" />
        </el-input>
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
        <el-table-column label="单位名称" prop="clientWayName" width="110" show-overflow-tooltip />
        <el-table-column label="联系人" prop="contactPerson" width="80" />
        <el-table-column label="联系方式" prop="contactNumber" width="110" />
        <el-table-column label="地址" prop="contactAddress" show-overflow-tooltip />
        <el-table-column label="客户身份" prop="clientWayId" show-overflow-tooltip />
        <el-table-column label="部门" prop="clientWayType" width="100" show-overflow-tooltip />
        <el-table-column label="发票抬头" prop="invoice" show-overflow-tooltip />
        <el-table-column label="纳税人标识号" prop="taxpayerId" show-overflow-tooltip min-width="120" />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑客户',scope.row)"><i class="el-icon-edit" /></el-button>
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
import { queryClientList } from '@/api/infoManage'
export default {
  data() {
    return {
      searchText: '',
      list: [],
      listLoading: false,
      form: {
        pageNum: 1,
        pageSize: 10,
        clientWayId: '',
        clientWayName: ''
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
        name: 'customer-add',
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
        rows.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
      queryClientList(this.form).then(res => {
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

<style lang="scss" scoped>
  .topSearch {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tableWrap {
    margin-top: 10px;
    height: calc(100% - 80px);
  }
</style>
