<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="广告标题">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="广告商">
      <el-input v-model="form.mobile"/>
    </el-form-item>
    <el-form-item label="跳转地址">
      <el-input v-model="form.intro"/>
    </el-form-item>
    <el-form-item label-width="100px" label="广告位置">
      <el-select v-model="form.key" placeholder="广告位置">
        <el-option
          v-for="item in positionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label-width="100px" label="广告图">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveAd } from '@/api/ad'
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
      positionOptions: [{
        value: 'appStartAd',
        label: 'app启动页'
      }, {
        value: 'chapterEnd',
        label: '书籍阅读页'
      }, {
        value: 'chapterDetail',
        label: '书籍详情页'
      }],
      form: {
        adId: '',
        name: '',
        intro: '',
        key: '',
        type: 3
      }
    }
  },
  watch: {
    editData(newData, oldData) {
      this.setPostForm(newData)
    }
  },
  created() {
    if (!this.sEdit) {
      this.setPostForm(this.editData)
    }
  },
  methods: {
    onSubmit() {
      this.form.status = this.form.status === true ? 1 : 0
      this.form.type = 3
      saveAd(this.form).then(response => {
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
      this.form.adId = data.adId
      this.form.name = data.name
      this.form.intro = data.intro
      this.form.key = data.key
      this.form.type = data.type
    }
  }
}
</script>
