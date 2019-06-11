<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label-width="100px" label="书名">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label-width="100px" label="作者名">
      <el-input v-model="form.author"/>
    </el-form-item>
    <el-form-item label-width="100px" label="详情页地址">
      <el-input v-model="form.url"/>
    </el-form-item>
    <el-form-item label-width="100px" label="书源">
      <ELTreeSelect
        ref="treeSelect"
        v-model="form.siteId"
        :select-params="selectParams"
        :tree-params="treeParams"
        @node-click="selectChange"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import ELTreeSelect from 'el-tree-select'
import { Message } from 'element-ui'
import { getSiteList, addBookCollect } from '@/api/book'

export default {
  components: { ELTreeSelect },
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
      selectParams: {
        multiple: false,
        clearable: true,
        placeholder: '书源'
      },
      treeParams: {
        'default-expand-all': true,
        filterable: false,
        'check-strictly': true,
        'render-content': this._renderFun,
        data: [],
        props: {
          children: 'children',
          label: 'name',
          value: 'siteId'
        }
      },
      form: {
        siteId: '0',
        name: '',
        author: '',
        url: ''
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
    this.getSiteData()
  },
  methods: {
    onSubmit() {
      addBookCollect(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    getSiteData() {
      getSiteList().then(response => {
        this.treeParams.data = response.data.list
        this.$refs.treeSelect.treeDataUpdateFun(response.data)
      })
    },
    selectChange(data, node, vm) {
      this.form.siteId = data.siteId.toString()
    },
    setPostForm(data) {
      this.form.name = data.name
      this.form.author = data.author
    }
  }
}
</script>
