<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="书籍名/书籍id/作者" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="反馈时间:">
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
      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍名称">
        <template slot-scope="scope">
          <span>{{ scope.row.bookName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍ID">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="不感兴趣（次）">
        <template slot-scope="scope">
          <span>{{ scope.row.dontLike }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="完结老书（次）">
        <template slot-scope="scope">
          <span>{{ scope.row.endBook }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="断更书（次）">
        <template slot-scope="scope">
          <span>{{ scope.row.breakBook }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="内容质量（次）">
        <template slot-scope="scope">
          <span>{{ scope.row.contentQuality }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="已读过（次）">
        <template slot-scope="scope">
          <span>{{ scope.row.readEd }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否继续推荐">
        <template slot-scope="scope">
          <span>
            <el-button
              :type="scope.row.isRecommend === 1 ? 'success' : 'warning'"
              size="small"
              @click="changeStatus(scope.row.recommendFeedbackId, scope.row.isRecommend)">{{ scope.row.isRecommend === 1 ? '是' : '否' }}
            </el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="editFormVisible">
      <book-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BookDetail from './components/BookDetail'
import { Message } from 'element-ui'
import { getRecommendFeedBackList, changeIsRecommend } from '@/api/feedback'

export default {
  components: { Pagination, BookDetail },
  data() {
    return {
      activeName: 'first',
      loginTime: [],
      list: null,
      bookStatusList: {},
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
      importFormVisible: false,
      editData: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.loginTime !==null && this.loginTime.length > 0) {
        this.listQuery.startTime = this.loginTime[0] / 1000
        this.listQuery.endTime = this.loginTime[1] / 1000
      }else{
        this.listQuery.startTime = ""
        this.listQuery.endTime = ""
      }
      getRecommendFeedBackList(this.listQuery).then(response => {
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
    importShow(editData) {
      this.importFormVisible = true
      this.editData = editData
    },
    onRefreshData() {
      this.editFormVisible = false
      this.editId = 0
      this.getList()
    },
    changeStatus(recommendFeedbackId, currentStatus) {
      const data = {
        recommendFeedbackId,
        isRecommend: currentStatus === 1 ? 0 : 1
      }
      changeIsRecommend(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
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
