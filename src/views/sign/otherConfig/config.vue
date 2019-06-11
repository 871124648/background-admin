<template>
  <div class="app-container">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>等级配置</span>
          <el-button style="float: right;" type="primary" size="small" @click="levelEdit(null)">添加</el-button>
        </div>
        <div>
          <el-table
            :data="level"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="等级名称"
              width="180"/>
            <el-table-column
              prop="isDefault"
              label="默认会员等级"
              width="180"/>
            <el-table-column
              prop="exp"
              label="成长值"/>
            <el-table-column
              prop="currentNum"
              label="目前人数"/>
            <el-table-column
              prop="intro"
              label="等级描述"/>
            <el-table-column
              align="center"
              label="ICON">
              <template slot-scope="scope">
                <img :src="scope.row.icon" alt="" style="width:24px;height:24px;">
            </template></el-table-column>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="levelEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="levelDel(scope.row.levelId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>
    <div style="margin-top: 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>积分道具</span>
          <el-button style="float: right;" type="primary" size="small" @click="propEdit(null)">添加</el-button>
        </div>
        <div>
          <el-table
            :data="integralData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="道具名称"
              width="180"/>
            <el-table-column
              prop="point"
              label="道具价格（积分）"
              width="180"/>
            <el-table-column
              prop="left"
              label="库存"/>
            <el-table-column
              prop="buyNum"
              label="购买人数"/>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="propEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="propDel(scope.row.pointPropId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>
    <div style="margin-top: 20px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>抽奖配置</span>
          <el-button style="float: right;" type="primary" size="small" @click="lotteryEdit(null)">添加</el-button>
        </div>
        <div>
          <el-table
            :data="lotteryData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="奖励内容"
              width="180"/>
            <el-table-column
              prop="num"
              label="数量"
              width="180"/>
            <el-table-column
              prop="left"
              label="库存"/>
            <el-table-column
              label="概率"
              width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.chance }}%</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="lotteryEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="lotteryDel(scope.row.lotteryConfigId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>

    </div>

    <el-dialog :visible.sync="levelVisible">
      <level-detail v-if="levelVisible" ref="levelForm" :edit-data="editLevelData" @refreshData="onRefreshData"/>
    </el-dialog>

    <el-dialog :visible.sync="lotteryVisible">
      <lottery-detail v-if="lotteryVisible" ref="lotteryForm" :edit-data="editLotteryData" @refreshData="onRefreshData"/>
    </el-dialog>

    <el-dialog :visible.sync="propVisible">
      <prop-detail v-if="propVisible" ref="propForm" :edit-data="editPropData" @refreshData="onRefreshData"/>
    </el-dialog>
  </div>
</template>

<script>
import LevelDetail from './components/LevelDetail'
import LotteryDetail from './components/LotteryDetail'
import PropDetail from './components/PropDetail'
import { Message } from 'element-ui'
import { getLotteryConfig, delLevel, delProp, delLottery } from '@/api/sign'

export default {
  components: { LevelDetail, LotteryDetail, PropDetail },
  data() {
    return {
      levelVisible: false,
      lotteryVisible: false,
      propVisible: false,
      editLevelData: null,
      editLotteryData: null,
      editPropData: null,
      level: [],
      integralData: [],
      lotteryData: [],
      form: {}
    }
  },
  created() {
    this.getSet()
  },
  methods: {
    getSet() {
      getLotteryConfig().then(response => {
        this.level = response.data.userLevel
        this.integralData = response.data.pointProp
        this.lotteryData = response.data.lotteryConfig
      })
    },
    levelEdit(data) {
      this.levelVisible = true
      this.editLevelData = data
    },
    propEdit(data) {
      this.propVisible = true
      this.editPropData = data
    },
    lotteryEdit(data) {
      this.lotteryVisible = true
      this.editLotteryData = data
    },
    levelDel(levelId) {
      const data = {
        levelId
      }
      delLevel(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getSet()
      })
    },
    propDel(pointPropId) {
      const data = {
        pointPropId
      }
      delLottery(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getSet()
      })
    },
    lotteryDel(lotteryConfigId) {
      console.log(lotteryConfigId)
      const data = {
        lotteryConfigId: lotteryConfigId
      }
      delProp(data).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
        this.getSet()
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    onRefreshData() {
      this.levelVisible = false
      this.lotteryVisible = false
      this.propVisible = false
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

