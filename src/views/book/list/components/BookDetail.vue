<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书籍id">
      <el-input v-model="form.bookId" disabled/>
    </el-form-item>
    <el-form-item label="书名">
      <el-input v-model="form.bookName"/>
    </el-form-item>
    <el-form-item label="作者名">
      <el-input v-model="form.author"/>
    </el-form-item>
    <el-form-item label="分类">
      <ElTreeSelect
        ref="treeSelect"
        v-model="form.categoryId"
        :select-params="selectParams"
        :tree-params="treeParams"
        @node-click="selectChange"
      />
    </el-form-item>
    <!-- <el-form-item label="二级分类">
      <el-select v-model="form.miniCategory" placeholder="二级分类">
        <el-option
          v-for="item in secondCategory"
          :key="item.value"
          :label="item.label"
          :value="item.name"/>
      </el-select>
    </el-form-item> -->
    <el-form-item label="标签">
      <div>
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          :disable-transitions="false"
          style="margin:3px"
        >
          {{ tag }}
        </el-tag>
      </div>
      <el-select v-model="form.mobile" placeholder="请选择标签" filterable>
        <el-option
          v-for="item in TagsList"
          :key="item.tagId"
          :label="item.name"
          :value="item.tagId"/>
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="form.isOver" placeholder="请选择">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>

import { Message } from 'element-ui'
import { getCategoryList, updateBook, getTagsList } from '@/api/book'
import ElTreeSelect from 'el-tree-select/src/components/src/ElTreeSelect'

export default {
  components: { ElTreeSelect },
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
      TagsList: [],
      selectParams: {
        multiple: false,
        clearable: true,
        placeholder: '分类'
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
          value: 'categoryId'
        }
      },
      statusList: [{
        value: '0',
        label: '连载中'
      }, {
        value: '1',
        label: '完结'
      }],
      form: {
        bookId: '',
        categoryId: 0,
        bookName: '',
        author: '',
        miniCategory: '',
        isOver: '0'
      },
      secondCategory: []
    }
  },
  watch: {
    editData(newData, oldData) {
      this.setPostForm(newData)
    }
  },
  created() {
    this.setPostForm(this.editData)
    this.getCategoryData()
    this.getTagsInfo()
  },
  methods: {
    onSubmit() {
      updateBook(this.form).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.$emit('refreshData')
      })
    },
    getTagsInfo() {
      getTagsList().then(res => {
          this.TagsList = res.data
      })
    },
    getCategoryData() {
      getCategoryList().then(response => {
        console.log(response.data)
        const category1 = response.data[0].children
        const category2 = response.data[1].children
        const category = category1.concat(category2)
        for (let i = 0; i < category.length; i++) {
          if (this.categoryId === category[i].categoryId) {
            this.secondCategory = category[i].children
            break
          }
        }
        this.treeParams.data = response.data
        this.$refs.treeSelect.treeDataUpdateFun(response.data)
      })
    },
    selectChange(data, node, vm) {
      this.form.categoryId = data.categoryId.toString()
      this.secondCategory = data.children
    },
    setPostForm(data) {
      console.log(data)
      this.form.bookId = data.bookId
      this.form.categoryId = data.categoryId.toString()
      this.form.bookName = data.name
      this.form.miniCategory = data.miniCategory
      this.form.author = data.author
      this.form.isOver = data.isOver.toString()
    }
  }
}
</script>
