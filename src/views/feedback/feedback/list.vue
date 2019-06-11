<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">

        <el-form-item label-width="100px" label="反馈类型:">
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
      <el-table-column align="center" label="反馈时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime ? parseTimeFormat(scope.row.createTime) : '' }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈类型">
        <template slot-scope="scope">
          <span>{{ getTypeName(scope.row.type) }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="反馈意见">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="QQ">
        <template slot-scope="scope">
          <span>{{ scope.row.qq }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '已处理' : '未处理' }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="备注">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editShow(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog :visible.sync="editFormVisible">
      <feedback-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import FeedbackDetail from './components/FeedbackDetail' // Secondary package based on el-pagination
import { parseTime } from '@/utils/index'
import { getFeedBackList } from '@/api/feedback'

export default {
  components: { Pagination, FeedbackDetail },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      typeOptions: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '意见与建议'
        },
        {
          value: '2',
          label: '阅读功能'
        },
        {
          value: '3',
          label: '签到功能'
        },
        {
          value: '4',
          label: '内容问题'
        },
        {
          value: '5',
          label: '其他'
        }
      ],
      statusOptions: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '待解决'
        },
        {
          value: '1',
          label: '需要与用户沟通'
        },
        {
          value: '2',
          label: '解决中'
        },
        {
          value: '3',
          label: '已解决'
        },
        {
          value: '4',
          label: '不予解决'
        }
      ],
      list: null,
      total: 0,
      listLoading: true,
      loginTime: [],
      listQuery: {
        page: 1,
        status: '-1',
        type: '0',
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
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
      getFeedBackList(this.listQuery).then(response => {
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
    getTypeName(type) {
      return type
    },
    editShow(data) {
      this.editData = data
      this.editFormVisible = true
    },
    parseTimeFormat(time) {
      return parseTime(time)
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
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
