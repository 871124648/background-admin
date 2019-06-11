<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="道具名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="道具价格">
      <el-input v-model="form.point"/>
    </el-form-item>
    <el-form-item label="道具库存">
      <el-input v-model="form.left"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveProp } from '@/api/sign'
export default {
  props: {
    editData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        name: '',
        left: '',
        point: ''
      }
    }
  },
  watch: {
    editData(newData, oldData) {
      if (newData != null) {
        this.setPostForm(newData)
      }
    }
  },
  created() {
    if (this.editData != null) {
      this.setPostForm(this.editData)
    }
  },
  methods: {
    onSubmit() {
      saveProp(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.pointPropId = data.pointPropId
      this.form.name = data.name
      this.form.left = data.left
      this.form.point = data.point
    }
  }
}
</script>
