<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="书名">
      <el-input v-model="form.bookName"/>
    </el-form-item>
    <el-form-item label="作者名">
      <el-input v-model="form.author"/>
    </el-form-item>
    <el-form-item label="一级分类">

      <ELTreeSelect
        ref="treeSelect"
        v-model="form.categoryId"
        :select-params="selectParams"
        :tree-params="treeParams"
        @node-click="selectChange"
      />
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="form.miniCategory" placeholder="二级分类">
        <el-option
          v-for="item in secondCategory"
          :key="item.value"
          :label="item.label"
          :value="item.name"/>
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
      <el-select v-model="form.bookStatus" placeholder="请选择">
        <el-option
          v-for="item in statusOptions"
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
import ELTreeSelect from 'el-tree-select'
import { getCategoryList } from '@/api/book'
export default {
  components: { ELTreeSelect },
  props: {
    importData: {
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
      statusOptions: [{
        value: '1',
        label: '已完结'
      }, {
        value: '0',
        label: '连载中'
      }],
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
      form: {
        bookName: '',
        author: '',
        categoryId: '',
        miniCategory: '',
        bookStatus: '0'
      },
      secondCategory: []
    }
  },
  watch: {
    importData(newData, oldData) {
      this.setPostForm(newData)
    }
  },
  created() {
    this.setPostForm(this.importData)
    this.getCategoryData()
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    getCategoryData() {
      getCategoryList().then(response => {
        const category1 = response.data[0].children
        const category2 = response.data[1].children
        const category = category1.concat(category2)
        for (let i = 0; i < category.length; i++) {
          if (this.categoryId === category[i].categoryId) {
            this.secondCategory = category[i].children
            break
          }
        }
        this.treeParams.data = category
        this.$refs.treeSelect.treeDataUpdateFun(category)
      })
    },
    selectChange(data, node, vm) {
      this.form.categoryId = data.categoryId.toString()
      this.secondCategory = data.children
    },
    setPostForm(data) {
      this.form.bookName = data.bookName
      this.form.author = data.author
      this.form.bookStatus = data.bookStatus.toString()
      this.form.categoryId = data.categoryId.toString()
      this.form.miniCategory = data.miniCategory
    }
  }
}
</script>
