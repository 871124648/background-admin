<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true">
        <el-form-item label-width="60px" label="关键词:">
          <el-input v-model="listQuery.keyword" placeholder="书籍名称/书籍ID" style="width: 200px;" class="filter-item"/>
        </el-form-item>
        <el-form-item label-width="100px" label="换源记录:">
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
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sorttype">
      <!-- <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.showTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="总换源次数" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍名称">
        <template slot-scope="scope">
          <span>{{ scope.row[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="书籍ID">
        <template slot-scope="scope">
          <span>{{ scope.row[2] }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          <span>{{ scope.row[3] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <router-link :to="'/feedback/originlist/detail/'+scope.row[2]">
            <el-button type="success" size="small">查看</el-button>
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
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
// import { Message } from 'element-ui'
import { getoriginList } from '@/api/feedback'

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
      }
    }
  },
  created() {
    this.getList()
    console.log(this.$store)
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
      getoriginList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 监听排序("ascending"向上，"descending"向下)
    sorttype(column) {
      console.log(column)
      // if (column.order == 'ascending') {
      //   this.Order = 'asc';
      // } else {
      //   this.Order = 'desc';
      // }
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
