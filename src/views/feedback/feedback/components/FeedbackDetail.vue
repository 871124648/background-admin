<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="状态">
      <el-select v-model="form.status" placeholder="请选择">
        <el-option
          v-for="item in statusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveFeedBack } from '@/api/feedback'
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
      statusOptions: [
        {
          value: '-1',
          label: '全部'
        },
        {
          value: '0',
          label: '待解决'
        },
        {
          value: '1',
          label: '需要与用户沟通'
        },
        {
          value: '2',
          label: '解决中'
        },
        {
          value: '3',
          label: '已解决'
        },
        {
          value: '4',
          label: '不予解决'
        }
      ],
      form: {
        status: '',
        remark: ''
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
      saveFeedBack(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.remark = data.remark
      this.form.status = data.status.toString()
      console.log(data)
    }
  }
}
</script>
