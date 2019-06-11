<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>书单基本信息</span>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="书单ID">
            <el-input v-model="form.bookListId" disabled=""/>
          </el-form-item>
          <el-form-item label="用户名/昵称">
            <el-input v-model="form.userInfo.name" disabled=""/>
          </el-form-item>
          <el-form-item label="书单名称">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="收藏">
            <el-input v-model="form.markNum"/>
          </el-form-item>
          <el-form-item label="书单简介">
            <el-input v-model="form.desc"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>书籍信息</span>
      </div>
      <div class="text item">
        <el-table
          :data="list"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="书名"
            width="180"/>
          <el-table-column
            prop="author"
            label="作者"
            width="180"/>
          <el-table-column
            prop="date"
            label="二级分类"
            width="180"/>
          <el-table-column
            prop="bookReview"
            label="书评"
            width="180"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="dataDelete(scope.row.bookListDataId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getBookListDataList, updateBookList, deleteBookListData } from '@/api/book'
export default {
  name: 'Detail',
  data() {
    return {
      form: {
        bookListId: '',
        userInfo: {},
        name: '',
        markNum: '',
        desc: ''
      },
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const listQuery = {
        bookListId: this.$route.params.bookListId
      }
      getBookListDataList(listQuery).then(response => {
        response.data.detail.userInfo = response.data.detail.userInfo ? response.data.detail.userInfo : {}
        this.form = response.data.detail
        this.list = response.data.dataList
      })
    },
    onSubmit() {
      updateBookList(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getList()
      })
    },
    dataDelete(bookListDataId) {
      const data = {
        bookListDataId
      }
      deleteBookListData(data).then(response => {
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

</style>
