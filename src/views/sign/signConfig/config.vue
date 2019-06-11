<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>签到配置</span>
          <el-button style="float: right;" type="primary" size="small" @click="ruleAdd">添加</el-button>
        </div>
        <div>
          <el-table
            :data="signConfig"
            border
            style="width: 100%">
            <el-table-column
              label="连续签到（天）"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.start }}~{{ scope.row.end }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="exp"
              label="经验值（点）"
              width="180"/>
            <el-table-column
              prop="point"
              label="积分（点）"/>
            <el-table-column
              prop="lotteryNum"
              label="抽奖次数（次）"/>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="ruleEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="delConfigShow(scope.row.signConfigId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>
    <div style="margin-top: 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>签到礼包</span>
          <el-button style="float: right;" type="primary" size="small" @click="signAdd">添加</el-button>
        </div>
        <div>
          <el-table
            :data="signGift"
            border
            style="width: 100%">
            <el-table-column
              prop="day"
              label="连续签到（天）"
              width="180"/>
            <el-table-column
              prop="exp"
              label="经验值（点）"
              width="180"/>
            <el-table-column
              prop="point"
              label="积分（点）"/>
            <el-table-column
              prop="lotteryNum"
              label="抽奖次数（次）"/>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="signEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="delGiftShow(scope.row.signGiftId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>
    <el-dialog :visible.sync="ruleVisible">
      <rule-detail v-if="ruleVisible" ref="ruleForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
    <el-dialog :visible.sync="signVisible">
      <sign-detail v-if="signVisible" ref="ruleForm" :is-edit="true" :edit-data="editData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import RuleDetail from './components/RuleDetail'
import SignDetail from './components/SignDetail'
import { Message } from 'element-ui'
import { getSignConfig, delSignConfig, delSignGift } from '@/api/sign'

export default {
  components: { RuleDetail, SignDetail },
  data() {
    return {
      signConfig: [],
      signGift: [],
      form: {},
      editData: {},
      ruleVisible: false,
      signVisible: false
    }
  },
  created() {
    this.getSet()
  },
  methods: {
    getSet() {
      getSignConfig().then(response => {
        this.signConfig = response.data.config
        this.signGift = response.data.gift
      })
    },
    ruleEdit(data) {
      this.ruleVisible = true
      this.editData = data
    },
    ruleAdd() {
      this.editData = null
      this.ruleVisible = true
    },
    signEdit(data) {
      this.signVisible = true
      this.editData = data
    },
    signAdd() {
      this.editData = null
      this.signVisible = true
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    delConfigShow(signConfigId) {
      const data = {
        signConfigId
      }
      delSignConfig(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getSet()
      })
    },
    delGiftShow(signGiftId) {
      const data = {
        signGiftId
      }
      delSignGift(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getSet()
      })
    },
    onRefreshData() {
      this.signVisible = false
      this.ruleVisible = false
      this.editData = null
      this.getSet()
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

