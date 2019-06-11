<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>导入书籍</span>
      </div>
      <div>
        <div class="filter-container">
          <el-form :inline="true">
            <el-form-item label-width="60px" label="关键词:">
              <el-input v-model="listQuery.keyword" placeholder="书籍名称/书籍ID/作者名" style="width: 200px;" class="filter-item"/>
            </el-form-item>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
          </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="书名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="书籍ID">
            <template slot-scope="scope">
              <span>{{ scope.row.bookId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="作者名">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="一级分类">
            <template slot-scope="scope">
              <span>{{ scope.row.bookCategory ? scope.row.bookCategory.name : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="简介">
            <template slot-scope="scope">
              <span>{{ scope.row.intro }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="importShow(scope.row.bookId)">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>推荐内容</span>
      </div>
      <div>
        <el-table
          :data="dataList"
          border
          style="width: 100%">
          <el-table-column
            prop="bookName"
            label="书名"
            width="180"/>
          <el-table-column
            prop="author"
            label="作者名"
            width="180"/>
          <el-table-column
            prop="bookId"
            label="书籍ID"/>
          <el-table-column
            prop="category"
            label="一级分类"/>
          <el-table-column
            prop="miniCategory"
            label="二级分类"/>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delData(scope.row.recommendDataId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
import { getBookList } from '@/api/book'
import { addRecommendBook, getRecommendDataList, delRecommendBook } from '@/api/operate'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      dataList: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        keyword: '',
        startTime: '',
        endTime: '',
        limit: 5
      }
    }
  },
  created() {
    this.getList()
    this.getDataList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getBookList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getDataList() {
      const recommendId = this.$route.params.recommendId
      getRecommendDataList({ recommendId }).then(response => {
        this.dataList = response.data
      })
    },
    delData(recommendDataId) {
      delRecommendBook({ recommendDataId }).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getDataList()
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
    importShow(bookId) {
      const recommendId = this.$route.params.recommendId
      addRecommendBook({ bookId, recommendId }).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getDataList()
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
