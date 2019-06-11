<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="等级名称">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="等级描述">
      <el-input v-model="form.intro"/>
    </el-form-item>
    <el-form-item label="所需成长值">
      <el-input v-model="form.exp"/>
    </el-form-item>
    <!-- <el-form-item label="icon">
      <el-input v-model="form.icon"/>
    </el-form-item> -->
    <el-form-item label-width="100px" label="icon">
      <el-upload
        :action="UploadUrl()"
        :file-list="fileList"
        :limit="1"
        :before-upload ="beforeUpload"
        :on-remove = "onRemove"
        :on-success="handleAvatarSuccess"
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
import { saveLevel } from '@/api/sign'
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
      fileList: [], // 存放图片盒子
      form: {
        levelId: '',
        name: '',
        exp: '',
        icon: '',
        intro: ''
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
    UploadUrl() {
      return process.env.BASE_API + '/sign/saveLevelIcon'
    },
    onSubmit() {
      saveLevel(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    setPostForm(data) {
      this.fileList = []
      this.form.name = data.name
      this.form.levelId = data.levelId
      this.form.exp = data.exp
      // this.form.icon = data.icon
      this.form.intro = data.intro
      if (data.icon) {
        this.fileList.push({ url: data.icon })
        this.form.icon = data.icon
      }
    },
    beforeUpload(file) {
      console.log(file)
    },
    handleAvatarSuccess(res, file) {
      console.log(res.path)
       this.form.icon = res.path
    },
    onRemove() {
      this.form.icon = ''
    }
  }
}
</script>
