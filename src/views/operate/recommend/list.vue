<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="80px" label="推荐位置:">
          <el-select v-model="listQuery.position" placeholder="请选择" @change="positionChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="推荐时间:">
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
    <div style="margin-bottom: 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>大神名单</span>
        </div>
        <el-row>
          <el-col :span="20">
            <!-- {{ authorListData }} -->
            <el-tag v-for="(item,index) in cloneListData" :key="index" style="margin:0 5px 5px 0">{{ item }}</el-tag>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" size="small" style="float:right;" @click="authorShow()">编辑</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="推荐时间">
        <template slot-scope="scope">
          <span>{{ scope.row.showTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推荐位置">
        <template slot-scope="scope">
          <span>{{ positionShow(scope.row.position) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="推送数量（本）">
        <template slot-scope="scope">
          <span>{{ scope.row.periodNum }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 1 ? '已推送' : '未推送' }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <router-link :to="'/operate/recommend/detail/'+scope.row.recommendId">
            <el-button type="primary" size="small">编辑</el-button>
          </router-link>
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
      <book-detail ref="editForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="authorVisible">
      <el-form label-width="80px">
        <el-form-item label="大神名单">
          <el-input v-model="authorList" type="textarea" autosize />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="authorSubmit">保存</el-button>
          <el-button @click="authorVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BookDetail from './components/BookDetail'
import { Message } from 'element-ui'
import { getRecommendListList, getAuthorListListList, editAuthorData } from '@/api/operate'

export default {
  components: { Pagination, BookDetail },
  data() {
    return {
      options: [{
        value: '1',
        label: '站长力荐'
      }, {
        value: '2',
        label: '精选佳作'
      }, {
        value: '3',
        label: '男生热推'
      }, {
        value: '4',
        label: '大家都说好看'
      }],
      loginTime: [],
      list: null,
      bookStatusList: {},
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        position: '1',
        startTime: '',
        endTime: '',
        limit: 20
      },
      authorList: '',
      authorListData: '',
      cloneListData: [],
      editFormVisible: false,
      authorVisible: false,
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
      getRecommendListList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
      getAuthorListListList().then(response => {
        this.authorListData = response.data.value
        this.cloneListData = this.authorListData.split(',')
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
      this.editFormVisible = false
      Message({
        message: '成功',
        type: 'success',
        duration: 5 * 1000
      })
      console.log('submit!')
    },
    authorSubmit() {
      const data = { authorList: this.authorList }
      editAuthorData(data).then(res => {
        this.authorVisible = false
        Message({
          message: '成功',
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    positionShow(position) {
      let show = ''
      switch (position) {
        case 1:
          show = '站长力荐'
          break
        case 2:
          show = '精选佳作'
          break
        case 3:
          show = '男生热推'
          break
        case 4:
          show = '大家都说好看'
          break
      }
      return show
    },
    editShow(editData) {
      this.editFormVisible = true
      this.editData = editData
    },
    authorShow(editData) {
      this.authorList = this.authorListData
      this.authorVisible = true
    },
    onRefreshData() {
      this.editFormVisible = false
      this.editId = 0
      this.getList()
    },
    getRandomColor() {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16)
    if (rand.length === 6) {
        return rand
    } else {
        return this.getRandomColor()
    }
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
