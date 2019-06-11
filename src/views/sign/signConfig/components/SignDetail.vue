<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="连续签到">
      <el-input v-model="form.day"/>
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
import { saveSignGift } from '@/api/sign'
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
        signGiftId: '',
        day: '',
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
      saveSignGift(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.signGiftId = data.signGiftId
      this.form.day = data.day
      this.form.exp = data.exp
      this.form.point = data.point
      this.form.lotteryNum = data.lotteryNum
    }
  }
}
</script>
