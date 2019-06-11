<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="类型">
        <template slot-scope="scope">
          <span>{{ getTypeStr(scope.row.type) }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="变动前经验">
        <template slot-scope="scope">
          <span>{{ scope.row.oldExp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="经验值">
        <template slot-scope="scope">
          <span>{{ scope.row.exp }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="变动后经验">
        <template slot-scope="scope">
          <span>{{ scope.row.newExp }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUserExpList } from '@/api/user'

export default {
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        userId: this.$route.params.userId,
        page: 1,
        limit: 20
      },
      editFormVisible: false,
      editId: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getUserExpList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
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
    getTypeStr(type) {
      let str = ''
      switch (type) {
        case 1:
          str = '签到'
          break
        case 2:
          str = '抽奖'
          break
        case 3:
          str = '连续签到'
          break
        case 4:
          str = '阅读时长'
          break
      }
      return str
    }
  }
}
</script>

<style scoped>
</style>
