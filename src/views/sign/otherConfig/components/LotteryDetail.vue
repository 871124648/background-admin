<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="奖励内容">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="数量">
      <el-input v-model="form.num"/>
    </el-form-item>
    <el-form-item label="库存">
      <el-input v-model="form.left"/>
    </el-form-item>
    <el-form-item label="概率">
      <el-input v-model="form.chance ">
        <template slot="append">%</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveLottery } from '@/api/sign'
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
      options: [{
        value: '1',
        label: '经验值'
      }, {
        value: '2',
        label: '积分'
      }],
      form: {
        lotteryConfigId: '',
        type: '',
        num: '',
        left: '',
        chance: null
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
      saveLottery(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.lotteryConfigId = data.lotteryConfigId
      this.form.type = data.type.toString()
      this.form.left = data.left
      this.form.num = data.num
      this.form.chance = data.chance
    }
  }
}
</script>
