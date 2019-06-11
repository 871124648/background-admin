<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label-width="100px" label="banner标题">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label-width="100px" label="关联类型">
      <el-select v-model="form.type" placeholder="关联类型">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label-width="100px" label="ID/地址">
      <el-input v-model="form.data"/>
    </el-form-item>
    <el-form-item label-width="100px" label="banner位置">
      <el-select v-model="form.position" placeholder="banner位置">
        <el-option
          v-for="item in positionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label-width="100px" label="广告图">
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
    <el-form-item label-width="100px" label="展示">
      <el-switch
        v-model="form.status"
        active-color="#13ce66"
        inactive-color="#ff4949"/>
    </el-form-item>
    <el-form-item label-width="100px" label="排序">
      <el-input v-model="form.sort"/>
    </el-form-item>
    <el-form-item label-width="100px">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
import { saveBanner } from '@/api/operate'
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
      fileList: [], // 存放图片盒子
      dynamicTags: ['标签一', '标签二', '标签三'],
      typeOptions: [{
        value: '1',
        label: '书籍'
      }, {
        value: '2',
        label: '书单'
      }, {
        value: '3',
        label: 'url'
      }],
      positionOptions: [{
        value: '1',
        label: '精选-首页'
      }, {
        value: '2',
        label: '精选-男生'
      }, {
        value: '3',
        label: '精选-女生'
      }],
      form: {
        bId: '',
        title: '',
        type: '',
        data: '',
        position: '',
        sort: '',
        status: true
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
    UploadUrl() {
      return process.env.BASE_API + '/operate/saveBannerImage'
    },
    onSubmit() {
      this.form.status = this.form.status === true ? 1 : 0
      saveBanner(this.form).then(response => {
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
    beforeUpload(file) {
      console.log(file)
    },
    handleAvatarSuccess(res, file) {
       this.form.image = res.path
    },
    onRemove() {
      this.form.image = ''
    },
    setPostForm(data) {
      this.fileList = []
      const that = this
      this.form.bId = data.bannerId
      this.form.title = data.title
      this.form.type = data.type.toString()
      this.form.data = data.data
      this.form.position = data.position.toString()
      this.form.sort = data.sort
      this.form.status = data.status === 1
      if (data.image) {
        that.fileList.push({ url: data.image })
        this.form.image = data.image
      }
    }
  }
}
</script>
