<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="用户名/昵称/手机号" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="120px" label="最后登录时间:">
          <el-date-picker
            v-model="loginTime"
            type="datetimerange"
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex === 1 ? '男' : '女' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="经验值">
        <template slot-scope="scope">
          <span>{{ scope.row.exp !== null ? parseInt(scope.row.exp) : 0 }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="积分">
        <template slot-scope="scope">
          <span>{{ scope.row.point !== null ? parseInt(scope.row.point) : 0 }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.regTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="最后登录时间">
        <template slot-scope="scope">
          <span>{{ scope.row.loginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <router-link :to="'/user/userManage/detail/'+scope.row.userId">
            <el-button type="primary" size="small">查看</el-button>
          </router-link>
          <el-button type="primary" size="small" @click="editShow(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="editFormVisible">
      <user-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import UserDetail from './components/UserDetail'
import { getUserList } from '@/api/user'

export default {
  components: { Pagination, UserDetail },
  data() {
    return {
      loginTime: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        keyword: '',
        startTime: '',
        endTime: '',
        limit: 20
      },
      editFormVisible: false,
      editData: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.loginTime !== null && this.loginTime.length > 0) {
        this.listQuery.startTime = this.loginTime[0] / 1000
        this.listQuery.endTime = this.loginTime[1] / 1000
      }else {
        this.listQuery.startTime = ""
        this.listQuery.endTime = ""
      }
      getUserList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    onSubmit() {
      console.log('submit!')
    },
    editShow(editData) {
      this.editFormVisible = true
      this.editData = editData
    },
    onRefreshData() {
      this.editFormVisible = false
      this.editId = 0
      this.getList()
    }
  }
}
</script>

<style scoped>
  .filter-container {
    margin-bottom: 15px;
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
