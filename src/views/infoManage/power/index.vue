<template>
  <div class="mainWrap powerWrap">
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card header="角色维护" shadow="never" class="card">
          <div class="topSearch">
            <div class="searchBox">
              <el-input v-model="form.roleName" placeholder="请输入内容" size="mini">
                <el-button slot="append" icon="el-icon-search" type="primarry" size="mini" />
              </el-input>
            </div>
            <el-button type="success" size="mini" icon="el-icon-plus" @click="gotoEdite('新增角色')">新增</el-button>
          </div>
          <div class="tableWrap">
            <el-table
              v-loading="listLoading"
              :data="list"
              height="100%"
              element-loading-text="Loading"
              style="width: 100%"
              highlight-current-row
              @row-click="rowClick"
            >
              <el-table-column label="角色名称" prop="roleName" width="80" show-overflow-tooltip />
              <el-table-column label="备注" align="center" prop="remark" show-overflow-tooltip />
              <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="gotoEdite('编辑角色',scope.row)"><i class="el-icon-edit" /></el-button>
                  <el-button type="text" size="small" @click="delectRow(scope.$index, list)"><i class="el-icon-delete" /></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <p class="total">共{{ total }}条数据</p>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="never" class="card">
          <div slot="header">
            <span>{{ currentRow.name }}权限</span>
          </div>
          <div>
            <div class="topSearch">
              <div class="searchBox">
                <el-button size="mini" @click="queryAll">全选</el-button>
                <el-button size="mini" @click="clearAll">取消全选</el-button>
              </div>
              <el-button type="success" size="mini" :disabled="!currentRow.roleId">保存</el-button>
            </div>
            <el-tree
              ref="menuTree"
              :data="data"
              show-checkbox
              node-key="menuId"
              :props="defaultProps"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <add-dialog ref="dialog" :title="title" :edite-row="editeRow" />
  </div>
</template>

<script>
import AddDialog from './add/dialog'
import { queryRoleList, queryRoleInfo, addRoleInfo, updateRoleInfo, queryMenuTree, deleteRoleInfo } from '@/api/infoManage'
export default {
  components: { AddDialog },
  data() {
    return {
      currentRow: {},
      title: '',
      editeRow: {},
      listLoading: false,
      form: {
        'pageNum': '1',
        'pageSize': '10',
        'orderBy': '',
        'roleName': ''
      },
      list: [],
      total: 5,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'menuName'
      }
    }
  },
  mounted() {
    this.getRoleList()
    this.getMenuList()
  },
  methods: {
    // 获取角色列表
    getRoleList() {
      this.listLoading = true
      queryRoleList(this.form).then(res => {
        this.listLoading = false
        this.list = res.body
      }).catch(() => {
        this.listLoading = false
      })
    },
    // 获取菜单列表
    getMenuList() {
      queryMenuTree({}).then(res => {
        this.data = res.body
        console.log(res)
      })
    },
    // 点击全选
    queryAll() {
      this.$refs.menuTree.setCheckedKeys(this.data.map(item => item.menuId))
    },
    // 取消全选
    clearAll() {
      this.$refs.menuTree.setCheckedKeys([])
    },
    rowClick(row) {
      this.currentRow = row
      queryRoleInfo({ roleId: row.roleId }).then(res => {
        console.log(res)
      })
    },
    gotoEdite(text, row) {
      this.title = text
      if (row && row.roleName) {
        this.editeRow = row
      }
      this.$nextTick(() => {
        this.$refs.dialog.show()
      })
    },
    delectRow(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoleInfo({ roleId: rows[index].roleId }).then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.powerWrap {
  padding: 18px;
  .card {
    height: calc(100vh - 102px);
    >>>.el-card__header {
      padding: 12px 20px;
      font-size: 16px;
      font-weight: normal;
    }
    >>>.el-card__body {
       height: calc(100% - 43px);
    }
    .topSearch {
       margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tableWrap {
      height: calc(100% - 70px);
    }
    .total {
      line-height: 24px;
      font-size: 14px;
      color: #333333
    }
  }
}
</style>
