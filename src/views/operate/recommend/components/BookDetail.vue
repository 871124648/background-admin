<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书籍id">
      <el-input v-model="form.nickName" disabled/>
    </el-form-item>
    <el-form-item label="书名">
      <el-input v-model="form.nickName"/>
    </el-form-item>
    <el-form-item label="作者名">
      <el-input v-model="form.mobile"/>
    </el-form-item>
    <el-form-item label="一级分类">
      <el-select v-model="form.mobile" placeholder="请选择一级分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="form.mobile" placeholder="请选择二级分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-tag
        v-for="tag in dynamicTags"
        :key="tag"
        :disable-transitions="false"
        closable
        @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-select v-model="form.mobile" placeholder="请选择标签">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-switch
        v-model="form.status"
        active-color="#13ce66"
        inactive-color="#ff4949"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Message } from 'element-ui'
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
      Message({
        message: '成功',
        type: 'success',
        duration: 5 * 1000
      })
      this.$emit('refreshData')
    },
    setPostForm(data) {
      this.form.nickName = data.nickName
      this.form.mobile = data.mobile
      this.form.exp = data.exp
      this.form.point = data.point
    }
  }
}
</script>
