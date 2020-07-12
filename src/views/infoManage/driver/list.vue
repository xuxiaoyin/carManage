<template>
  <div class="app-container">
    <div class="topSearch">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增司机')">新增</el-button>
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
        <el-table-column label="姓名" prop="name1" show-overflow-tooltip />
        <el-table-column label="电话" prop="name2" />
        <el-table-column label="驾驶证" prop="name3" />
        <el-table-column label="性别" prop="name4" show-overflow-tooltip />
        <el-table-column label="身份证" prop="name5" show-overflow-tooltip />
        <el-table-column label="住址" prop="name6" show-overflow-tooltip />
        <el-table-column label="入职时间" prop="name7" show-overflow-tooltip />
        <el-table-column label="紧急联系人" prop="name8" show-overflow-tooltip />
        <el-table-column label="紧急联系方式" prop="name9" show-overflow-tooltip />
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑司机信息',scope.row)"><i class="el-icon-edit" /></el-button>
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
      list: [
        { name1: '雷子', name2: '1322112233', name3: 'ASDF1123112', name4: '男', name5: '1302258862111233547', name6: '广州市天河区塘厦街道唐德花园101房', name7: '20190812', name8: '海民', name9: '1322112111' }
      ],
      listLoading: false,
      form: {
        pageNum: 1,
        pageSize: 0
      },
      total: 10
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    // 跳转新增, 编辑,详情
    gotoEdite(text, row) {
      this.$router.push({
        name: 'driver-add',
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
      queryClientList().then(response => {
        console.log(response)
        // this.list = response.data.items
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
