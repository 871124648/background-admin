<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="推送文案">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label="关联类型">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="ID/地址">
      <el-input v-model="form.content"/>
    </el-form-item>
    <el-form-item label="推送时间">
      <el-date-picker
        v-model="form.pushTime"
        type="datetime"
        placeholder="选择日期时间"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { savePush } from '@/api/push'
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
      options: [{
        value: '1',
        label: '书籍'
      }, {
        value: '2',
        label: '书单'
      }, {
        value: '3',
        label: 'url'
      }, {
        value: '4',
        label: '唤醒'
      }],
      form: {
        pushId: '',
        title: '',
        type: '',
        content: '',
        pushTime: ''
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
      this.form.pushTime = this.form.pushTime / 1000
      savePush(this.form).then(response => {
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
      this.form.pushId = data.pushId
      this.form.title = data.title
      this.form.type = data.type.toString()
      this.form.content = data.content
      this.form.pushTime = data.pushTime * 1000
    }
  }
}
</script>
