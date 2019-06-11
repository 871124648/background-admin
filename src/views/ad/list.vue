<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="标题" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="广告位置:">
          <el-select v-model="listQuery.position" placeholder="请选择" @change="positionChange">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="添加时间:">
          <el-date-picker
            v-model="loginTime"
            type="datetimerange"
            range-separator="至"
            value-format="timestamp"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getList">查询</el-button>
        <el-button class="filter-item" type="primary" @click="addShow()">新增</el-button>
      </el-form>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="广告标题">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告商">
        <template slot-scope="scope">
          <span>wu</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告位置">
        <template slot-scope="scope">
          <span>{{ positionShow(scope.row.key) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="跳转地址">
        <template slot-scope="scope">
          <span>{{ scope.row.intro }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="展示">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status === 1 ? 'success' : 'warning'"
            size="small"
            @click="changeStatus(scope.row.adId, scope.row.status)">{{ scope.row.status === 1 ? '显示' : '隐藏' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editShow(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteShow(scope.row.adId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"/>

    <el-dialog :visible.sync="editFormVisible">
      <ad-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="addVisible">
      <ad-detail ref="editForm" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import AdDetail from './components/AdDetail'
import { Message } from 'element-ui'
import { getAdList, deleteAd, changeAdStatus } from '@/api/ad'

export default {
  components: { Pagination, AdDetail },
  data() {
    return {
      positionOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: 'appStartAd',
        label: 'app启动页'
      }, {
        value: 'chapterEnd',
        label: '书籍阅读页'
      }, {
        value: 'chapterDetail',
        label: '书籍详情页'
      }],
      loginTime: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        type: 3,
        position: '0',
        keyword: '',
        startTime: '',
        endTime: '',
        limit: 20
      },
      editFormVisible: false,
      addVisible: false,
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
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      getAdList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    positionChange() {
      this.getList()
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
    positionShow(key) {
      let show = ''
      switch (key) {
        case 'appStartAd':
          show = 'app启动页'
          break
        case 'chapterEnd':
          show = '书籍阅读页'
          break
        case 'chapterDetail':
          show = '书籍详情页'
          break
      }
      return show
    },
    addShow() {
      this.addVisible = true
    },
    deleteShow(adId) {
      const data = {
        adId
      }
      deleteAd(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    changeStatus(adId, currentStatus) {
      const data = {
        adId,
        status: currentStatus === 1 ? 0 : 1
      }
      changeAdStatus(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    onRefreshData() {
      this.editFormVisible = false
      this.addVisible = false
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
