<template>
  <div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="collectSite.name"
        label="源名称"/>
      <el-table-column
        prop="collectSite.url"
        label="来源地址"/>
      <el-table-column
        prop="lastChapterName"
        label="最新章节"/>
      <el-table-column
        prop="lastCollectTime"
        label="上次重采时间"/>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="reCollect(scope.row.siteId, scope.row.bookId)">重新采集</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="reCollectAll">全部重采</el-button>
  </div>
</template>
<script>
import ELTreeSelect from 'el-tree-select'
import { Message } from 'element-ui'
import { getBookSiteList } from '@/api/book'

export default {
  components: { ELTreeSelect },
  props: {
    bookId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    bookId(newData, oldData) {
      this.getList(newData)
    }
  },
  created() {
    this.getList(this.bookId)
  },
  methods: {
    getList() {
      const bookId = this.bookId
      getBookSiteList({ bookId }).then(response => {
        this.tableData = response.data
      })
    },
    reCollect(siteId, bookId) {
      Message({
        message: '已安排重新采集，请2分钟后重新查看来源',
        type: 'success',
        duration: 5 * 1000
      })
      this.$emit('refreshData')
    },
    reCollectAll() {
      Message({
        message: '已安排重新采集，请2分钟后重新查看来源',
        type: 'success',
        duration: 5 * 1000
      })
      this.$emit('refreshData')
    }
  }
}
</script>
