<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="崩溃日志">
      <el-input v-model="form.content" type="textarea" disabled/>
    </el-form-item>
  </el-form>
</template>
<script>
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
      dynamicTags: ['标签一', '标签二', '标签三'],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      form: {
        nickName: '',
        mobile: '',
        exp: '',
        point: '',
        password: '',
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
    this.setPostForm(this.editData)
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    setPostForm(data) {
      this.form.content = data.content
    }
  }
}
</script>
