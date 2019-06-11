<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="连续签到">
      <el-input v-model="form.start"/> ~ <el-input v-model="form.end"/>
    </el-form-item>
    <el-form-item label="经验值">
      <el-input v-model="form.exp"/>
    </el-form-item>
    <el-form-item label="积分">
      <el-input v-model="form.point"/>
    </el-form-item>
    <el-form-item label="抽奖次数">
      <el-input v-model="form.lotteryNum"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveSignConfig } from '@/api/sign'
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
        signConfigId: '',
        start: '',
        end: '',
        exp: '',
        point: '',
        lotteryNum: ''
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
      saveSignConfig(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.signConfigId = data.signConfigId
      this.form.start = data.start
      this.form.end = data.end
      this.form.exp = data.exp
      this.form.point = data.point
      this.form.lotteryNum = data.lotteryNum
    }
  }
}
</script>
