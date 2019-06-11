<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="书籍名称/书籍ID/作者名" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="更新时间:">
          <el-date-picker
            v-model="loginTime"
            type="datetimerange"
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button class="filter-item" type="primary" @click="addShow()">新增书籍</el-button>
      </el-form>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="书籍列表" name="first">
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="书籍ID">
            <template slot-scope="scope">
              <span>{{ scope.row.bookId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="书名">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
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
          <!-- <el-table-column align="center" label="二级分类">
            <template slot-scope="scope">
              <span>{{ scope.row.miniCategory }}</span>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="标签">
            <template slot-scope="scope">
              <span>无</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.isOver === 1 ? '完结' : '连载' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源">
            <template slot-scope="scope">
              <span style="color: deepskyblue" @click="collectShow(scope.row.bookId)">{{ scope.row.collectLogs.length }}个</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="展示">
            <template slot-scope="scope">
              <el-button
                :type="scope.row.status === 1 ? 'success' : 'warning'"
                size="small"
                @click="changeStatus(scope.row.bookId, scope.row.status)">{{ scope.row.status === 1 ? '显示' : '隐藏' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="editShow(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

      </el-tab-pane>
      <el-tab-pane label="采集列表" name="second">
        <el-table v-loading="listLoading" :data="collectList" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              <span>{{ scope.row.collectId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="书名">
            <template slot-scope="scope">
              <span>{{ scope.row.bookName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="作者名">
            <template slot-scope="scope">
              <span>{{ scope.row.author }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="采集源">
            <template slot-scope="scope">
              <span>大家读</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="采集状态">
            <template slot-scope="scope">
              <span>{{ scope.row.status === 0 ? "等待" : scope.row.status === 1 ? "已完成" : "采集中" }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="importShow(scope.row)">导入书籍列表</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="collectTotal" :page.sync="collectListQuery.page" :limit.sync="collectListQuery.limit" @pagination="getCollectList" />

      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="editFormVisible">
      <book-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="importFormVisible">
      <book-import ref="importForm" :is-edit="true" :import-data="importData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="addBookVisible">
      <add-book ref="addBook" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="collectVisible">
      <collect-detail ref="collectDetail" :book-id="editId" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BookDetail from './components/BookDetail'
import BookImport from './components/BookImport'
import AddBook from './components/AddBook'
import CollectDetail from './components/CollectDetail'
import { Message } from 'element-ui'
import { getBookList, getCollectBookList, changeStatus } from '@/api/book'

export default {
  components: { Pagination, BookDetail, BookImport, AddBook, CollectDetail },
  data() {
    return {
      activeName: 'first',
      loginTime: [],
      list: null,
      collectList: null,
      bookStatusList: {},
      total: 0,
      collectTotal: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        keyword: '',
        startTime: '',
        endTime: '',
        limit: 20
      },
      collectListQuery: {
        page: 1,
        limit: 20
      },
      editFormVisible: false,
      importFormVisible: false,
      addBookVisible: false,
      collectVisible: false,
      editData: {},
      editId: 0,
      importData: {}
    }
  },
  created() {
    this.getList()
    this.getCollectList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.bookStatusList = {}
      if (this.loginTime !== null && this.loginTime.length > 0) {
        this.listQuery.startTime = this.loginTime[0] / 1000
        this.listQuery.endTime = this.loginTime[1] / 1000
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      getBookList(this.listQuery).then(response => {
        this.list = response.data.list
        for (let i = 0; i < this.list.length; i++) {
          this.bookStatusList[this.list[i].bookId] = this.list[i].status === 1
        }
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getCollectList() {
      this.listLoading = true

      getCollectBookList(this.collectListQuery).then(response => {
        this.collectList = response.data.list
        this.collectTotal = response.data.total
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
    collectListHandleSizeChange(val) {
      this.collectListQuery.limit = val
      this.getList()
    },
    collectListHandleCurrentChange(val) {
      this.collectListQuery.page = val
      this.getList()
    },
    changeStatus(bookId, currentStatus) {
      const data = {
        bookId,
        status: currentStatus === 1 ? 0 : 1
      }
      changeStatus(data).then(response => {
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
    importShow(editData) {
      this.importFormVisible = true
      this.importData = editData
    },
    addShow() {
      this.addBookVisible = true
    },
    collectShow(bookId) {
      this.collectVisible = true
      this.editId = bookId
    },
    onRefreshData() {
      this.editFormVisible = false
      this.addBookVisible = false
      this.collectVisible = false
      this.editId = 0
      this.getList()
      this.getCollectList()
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
