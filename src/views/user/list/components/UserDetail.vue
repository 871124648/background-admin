<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="昵称">
      <el-input v-model="form.nickName"/>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="form.mobile"/>
    </el-form-item>
    <el-form-item label="经验值">
      <el-input v-model="form.exp"/>
    </el-form-item>
    <el-form-item label="积分">
      <el-input v-model="form.point"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-select v-model="editPasswordOption" placeholder="请选择" @change="changePassword">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>

    <el-form-item :hidden="editPassword" label="新密码">
      <el-input v-model="form.password"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveUser } from '@/api/user'
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
        value: true,
        label: '暂不修改'
      }, {
        value: false,
        label: '修改密码'
      }],
      editPassword: true,
      editPasswordOption: true,
      form: {
        userId: '',
        nickName: '',
        mobile: '',
        exp: '',
        point: '',
        password: ''
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
    changePassword() {
      this.editPassword = !this.editPassword
    },
    onSubmit() {
      saveUser(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.form.userId = data.userId
      this.form.nickName = data.nickName
      this.form.mobile = data.mobile
      this.form.exp = data.exp
      this.form.point = data.point
    }
  }
}
</script>
