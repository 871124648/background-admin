<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="书单ID/书单名称/用户名" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="发布时间:">
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
      <el-table-column align="center" label="书单ID">
        <template slot-scope="scope">
          <span>{{ scope.row.bookListId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span>{{ scope.row.userInfo ? scope.row.userInfo.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书单简介">
        <template slot-scope="scope">
          <span>{{ scope.row.desc }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书单数据">
        <template slot-scope="scope">
          <span>wu</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="展示">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status === 1 ? 'success' : 'warning'"
            size="small"
            @click="changeStatus(scope.row.bookListId, scope.row.status)">{{ scope.row.status === 1 ? '显示' : '隐藏' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <router-link :to="'/book/bookList/detail/'+scope.row.zhuiShuId">
            <el-button type="primary" size="small">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
import { getBookListList, changeBookListStatus } from '@/api/book'

export default {
  components: { Pagination },
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
      getBookListList(this.listQuery).then(response => {
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
    changeStatus(bookListId, currentStatus) {
      const data = {
        bookListId,
        status: currentStatus === 1 ? 0 : 1
      }
      changeBookListStatus(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
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
