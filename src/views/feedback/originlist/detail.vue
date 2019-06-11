<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>书籍来源</span>
      </div>
      <div>
        <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
          <el-table-column align="center" label="源名称">
            <template slot-scope="scope">
              <span>{{ scope.row[0] | forValue }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="最新章节">
            <template slot-scope="scope">
              <span>{{ scope.row[1] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="该源换源次数" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row[2] }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="来源地址">
            <template slot-scope="scope">
              <span>{{ '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上次重采时间" min-width="120">
            <template slot-scope="scope">
              <span>{{ '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="重新采集次数" min-width="120">
            <template slot-scope="scope">
              <span>{{ '/' }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="importShow(scope.row.bookId)">重新采集</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top:15px;">
      <div slot="header" class="clearfix">
        <span>换源记录</span>
      </div>
      <div>
        <el-form :inline="true">
          <el-form-item label-width="80px" label="来源选择:">
            <el-select v-model="selectSource" clearable filterable placeholder="可输入文字搜索" @change="selectChange(selectSource)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          border
          style="width: 100%">
          <el-table-column
            prop="bookId"
            label="改章节换源次数"
            align="center">
            <template slot-scope="scope">
              {{ scope.row[0] }}
            </template>
          </el-table-column>
          <el-table-column
            prop="author"
            label="换源章节"
            align="center">
            <template slot-scope="scope">
              {{ scope.row[1] }}
            </template>
          </el-table-column>
          <el-table-column
            prop="bookName"
            align="center"
            label="源名称">
            <template slot-scope="scope">
              {{ scope.row[2] |forValue }}
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="delData(scope.row.recommendDataId)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <pagination v-show="dataTotal>0" :total="dataTotal" :page.sync="datalistQuery.page" :limit.sync="datalistQuery.limit" @pagination="getDataList" />
      </div>
    </el-card>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { Message } from 'element-ui'
import { addRecommendBook, getRecommendDataList } from '@/api/operate'
import { sourceTab, sourceSelectList, getBookSource } from '@/api/feedback'

let vm = {}
export default {
  components: { Pagination },
  filters: {
    forValue(val) {
      let valData = ''
      if (vm.options.length > 0) {
        vm.options.forEach(el => {
          if (el.value === val) {
            valData = el.label
          }
        })
      }
      return valData
    }
  },
  data() {
    vm = this
    return {
      list: null,
      dataList: [],
      total: 0,
      dataTotal: 0,
      listLoading: true,
      selectSource: '全部',
      listQuery: {
        page: 1,
        keyword: '',
        startTime: '',
        endTime: '',
        limit: 5
      },
      datalistQuery: {
        page: 1,
        selectKey: '',
        limit: 5
      },
      options: []
    }
  },
  created() {
    this.getSourceTabList()
    this.getSelectList()
    this.getList()
    // this.getDataList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getBookSource({ bookId: this.$route.params.recommendId }).then(response => {
        this.list = response.data
        // this.total = response.data.total
        this.listLoading = false
      })
    },
    getDataList() {
      const recommendId = this.$route.params.recommendId
      getRecommendDataList({ recommendId }).then(response => {
        this.dataList = response.data
        // this.dataTotal = response.data.length
      })
    },
    getSourceTabList(siteId) {
      sourceTab({ bookId: this.$route.params.recommendId, siteId: siteId }).then(res => {
          this.dataList = res.data
      })
    },
    getSelectList() {
        sourceSelectList().then(res => {
          this.options = []
          const data = res.data
          data.forEach(el => {
            this.options.push({
              value: el.siteId,
              label: el.name
            })
          })
      })
    },
    // delData(recommendDataId) {
    //   delRecommendBook({ recommendDataId }).then(response => {
    //     Message({
    //       message: response.msg,
    //       type: 'success',
    //       duration: 5 * 1000
    //     })
    //     this.getDataList()
    //   })
    // },
    selectChange(val) {
      this.getSourceTabList(val)
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
