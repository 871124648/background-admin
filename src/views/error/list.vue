<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="用户名/昵称/手机号" style="width: 200px;" class="filter-item"/>
        </el-form-item>

        <el-form-item label="客户端类型">
          <el-select v-model="listQuery.device" placeholder="请选择" @change="handleChange">
            <el-option
              v-for="item in deviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="101px" label="最后登录时间:">
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
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column align="center" label="日志上传时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户端">
        <template slot-scope="scope">
          <span>{{ scope.row.device }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户端版本号">
        <template slot-scope="scope">
          <span>{{ scope.row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户设备">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceModel }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="系统版本">
        <template slot-scope="scope">
          <span>{{ scope.row.systemVersion }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editShow(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="editFormVisible">
      <error-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ErrorDetail from './components/ErrorDetail'
import { getErrorLogList } from '@/api/errorLog'

export default {
  components: { Pagination, ErrorDetail },
  data() {
    return {
      activeName: 'first',
      loginTime: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        keyword: '',
        startTime: '',
        endTime: '',
        device: '0',
        limit: 20
      },
      deviceOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '安卓'
      }, {
        value: '2',
        label: 'ios'
      }],
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
      if (this.loginTime !== null && this.loginTime.length > 0) {
        this.listQuery.startTime = this.loginTime[0] / 1000
        this.listQuery.endTime = this.loginTime[1] / 1000
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      getErrorLogList(this.listQuery).then(response => {
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
