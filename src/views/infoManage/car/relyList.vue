<template>
  <div class="app-container">
    <div class="topSearch">
      <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('添加挂靠车辆')">新增</el-button>
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
        <el-table-column label="车牌号" prop="name1" show-overflow-tooltip />
        <el-table-column label="品牌" prop="name2" show-overflow-tooltip />
        <el-table-column label="挂靠人" prop="name3" show-overflow-tooltip />
        <el-table-column label="联系方式" prop="name4" show-overflow-tooltip />
        <el-table-column label="开始时间" prop="name5" show-overflow-tooltip />
        <el-table-column label="结束时间" prop="name6" show-overflow-tooltip />
        <el-table-column label="挂靠费用" prop="name7" show-overflow-tooltip />
        <el-table-column label="相关协议" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑长租车辆信息',scope.row)">下载</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="gotoEdite('编辑挂靠车辆信息',scope.row)"><i class="el-icon-edit" /></el-button>
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
        { name1: '粤A100AS', name2: '宝马X5', name3: '王三', name4: '15458775546', name5: '20100101', name6: '20100801', name7: '10000元/月' }
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
