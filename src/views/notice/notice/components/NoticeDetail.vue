<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="标题">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label="内容">
      <el-input v-model="form.content"/>
    </el-form-item>
    <el-form-item label="展示时间">
      <el-date-picker
        v-model="form.showTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="timestamp"/>
    </el-form-item>
    <el-form-item label="截止时间">
      <el-date-picker
        v-model="form.endTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="timestamp"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveNotice } from '@/api/notice'
export default {
  props: {
    editData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        noticeId: '',
        title: '',
        content: '',
        showTime: '',
        endTime: ''
      }
    }
  },
  watch: {
    editData(newData, oldData) {
      this.setPostForm(newData)
    }
  },
  created() {
    this.setPostForm(this.editData)
  },
  methods: {
    onSubmit() {
      this.form.showTime = this.form.showTime / 1000
      this.form.endTime = this.form.endTime / 1000
      saveNotice(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
      Message({
        message: '成功',
        type: 'success',
        duration: 5 * 1000
      })
      this.$emit('refreshData')
    },
    setPostForm(data) {
      this.form.noticeId = data.noticeId
      this.form.title = data.title
      this.form.content = data.content
      this.form.showTime = data.showTime * 1000
      this.form.endTime = data.endTime * 1000
    }
  }
}
</script>
