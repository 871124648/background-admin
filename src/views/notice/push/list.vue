<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="书籍Id/书单Id/推送文案" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="关联类型:">
          <el-select v-model="listQuery.type" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="状态:">
          <el-select v-model="listQuery.status" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="推送时间:">
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
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column align="center" label="推送文案">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="关联类型">
        <template slot-scope="scope">
          <span>{{ typeShow(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="ID/地址">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '已推送' : '未推送' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送时间">
        <template slot-scope="scope">
          <span>{{ scope.row.pushTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editShow(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteShow(scope.row.pushId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="editFormVisible">
      <push-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>

    <el-dialog :visible.sync="addVisible">
      <push-detail ref="editForm" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import PushDetail from './components/PushDetail'
import { Message } from 'element-ui'
import { getPushList, deletePush } from '@/api/push'

export default {
  components: { Pagination, PushDetail },
  data() {
    return {
      typeOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '书籍'
      }, {
        value: '2',
        label: '书单'
      }, {
        value: '3',
        label: 'url'
      }, {
        value: '4',
        label: '唤醒'
      }],
      statusOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '已推送'
      }, {
        value: '2',
        label: '未推送'
      }],
      loginTime: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        keyword: '',
        status: '0',
        type: '0',
        startTime: '',
        endTime: '',
        limit: 20
      },
      editFormVisible: false,
      importFormVisible: false,
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
      getPushList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleChange() {
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
    deleteShow(pushId) {
      const data = {
        pushId
      }
      deletePush(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    addShow() {
      this.addVisible = true
    },
    editShow(editData) {
      this.editFormVisible = true
      this.editData = editData
    },
    importShow(editData) {
      this.importFormVisible = true
      this.editData = editData
    },
    typeShow(type) {
      let show = ''
      switch (type) {
        case 1:
          show = '书籍'
          break
        case 2:
          show = '书单'
          break
        case 3:
          show = 'url'
          break
        case 4:
          show = '唤醒'
          break
      }
      return show
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
