<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="标题/内容ID" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="80px" label="关联类型:">
          <el-select v-model="listQuery.type" placeholder="请选择" @change="typeChange()">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="60px" label="位置:">
          <el-select v-model="listQuery.position" placeholder="请选择" @change="typeChange()">
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="80px" label="发布时间:">
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
      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="banner标题">
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
          <span>{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="banner位置">
        <template slot-scope="scope">
          <span>{{ positionShow(scope.row.position) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="缩略图">
        <template slot-scope="scope">
          <span>{{ scope.row.image }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="展示">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.status === 1 ? 'success' : 'warning'"
            size="small"
            @click="changeStatus(scope.row.bannerId, scope.row.status)">{{ scope.row.status === 1 ? '显示' : '隐藏' }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户点击数" >
        <template slot-scope="scope">
          <span>{{ scope.row.clickNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editShow(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteShow(scope.row.bannerId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :visible.sync="editFormVisible">
      <banner-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="addVisible">
      <banner-detail ref="editForm" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BannerDetail from './components/BannerDetail'
import { Message } from 'element-ui'
import { getBannerListList, changeBannerStatus, deleteBanner } from '@/api/operate'

export default {
  components: { Pagination, BannerDetail },
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
        type: '0',
        position: '0',
        limit: 20
      },
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
      }],
      positionOptions: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '精选-首页'
      }, {
        value: '2',
        label: '精选-男生'
      }, {
        value: '3',
        label: '精选-女生'
      }],
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
      getBannerListList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    typeChange() {
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
      }
      return show
    },
    positionShow(position) {
      let show = ''
      switch (position) {
        case 1:
          show = '精选-首页'
          break
        case 2:
          show = '精选-男生'
          break
        case 3:
          show = '精选-女生'
          break
      }
      return show
    },
    editShow(editData) {
      // console.log(editData)
      this.editFormVisible = true
      this.editData = editData
    },
    importShow(editData) {
      this.importFormVisible = true
      this.editData = editData
    },
    addShow() {
      this.addVisible = true
    },
    deleteShow(bannerId) {
      const data = {
        bId: bannerId
      }
      deleteBanner(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    changeStatus(bannerId, currentStatus) {
      const data = {
        bId: bannerId,
        status: currentStatus === 1 ? 0 : 1
      }
      changeBannerStatus(data).then(response => {
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
