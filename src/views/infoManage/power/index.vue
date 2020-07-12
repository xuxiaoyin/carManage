<template>
  <div class="mainWrap powerWrap">
    <el-row :gutter="30">
      <el-col :span="12">
        <el-card header="角色维护" shadow="never" class="card">
          <div class="topSearch">
            <div class="searchBox">
              <el-input v-model="searchText" placeholder="请输入内容" size="mini">
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
              <el-table-column label="权限" align="center" prop="value" show-overflow-tooltip />
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
                <el-button size="mini">全选</el-button>
                <el-button size="mini">取消全选</el-button>
              </div>
              <el-button type="success" size="mini">保存</el-button>
            </div>
            <el-tree
              :data="data"
              show-checkbox
              node-key="id"
              :default-expanded-keys="[2, 3]"
              :default-checked-keys="[5]"
              :props="defaultProps"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    <add-dialog :title="title" :editeRow="editeRow" ref="dialog"></add-dialog>
  </div>
</template>

<script>
import AddDialog from './add/dialog'
export default {
  components: { AddDialog },
  data() {
    return {
      currentRow: {},
      title: '',
      editeRow: {},
      listLoading: false,
      searchText: '',
      list: [
        { roleName: '管理员', value: '系统默认，拥有所有模块权限', remark: '123' },
        { roleName: '调度员', value: '系统默认，拥有调度相关模块权限', remark: '123' },
        { roleName: '财务', value: '系统默认，拥有财务模块权限', remark: '123' },
        { roleName: '业务员', value: '系统默认', remark: '123' },
        { roleName: '司机', value: '系统默认', remark: '123' }
      ],
      total: 5,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    rowClick(row) {
      this.currentRow = row
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
