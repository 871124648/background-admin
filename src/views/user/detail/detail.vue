<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户详情</span>
      </div>
      <el-row>
        <el-col :span="4">
          <el-card :body-style="{ padding: '0px' }">
            <div style="text-align: center; padding-top: 18px">
              <img :alt="userInfo.name" :src="userInfo.avatar" class="image" width="140" style="border-radius: 50%">
            </div>
            <div style="text-align: center; padding-top: 18px; padding-bottom: 18px">
              <div class="bottom">
                <el-button type="primary" class="button" size="small" @click="setAvatar">清空为默认头像</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="10">
          <div class="detail-info">
            <el-row>
              <el-col :span="12">
                用户名 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.name ? userInfo.name : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                性别 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.sex === 1 ? '男' : '女' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                微信绑定 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.weixinId ? userInfo.weixinId : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                经验值 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.exp ? userInfo.exp : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                注册时间 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.regTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                最后登录时间 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.loginTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="detail-info">
            <el-row>
              <el-col :span="12">
                昵称 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.nickName ? userInfo.nickName : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                手机号 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.mobile ? userInfo.mobile : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                QQ绑定 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.qqId ? userInfo.qqId : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                积分 :
              </el-col>
              <el-col :span="12">
                {{ userInfo.point ? userInfo.point : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                注册IP :
              </el-col>
              <el-col :span="12">
                {{ userInfo.regIp ? userInfo.regIp : '/' }}
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                最后登录IP :
              </el-col>
              <el-col :span="12">
                {{ userInfo.loginIp ? userInfo.loginIp : '/' }}
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-tabs>
        <el-tab-pane label="经验值记录">
          <exp-list/>
        </el-tab-pane>
        <el-tab-pane label="积分记录">
          <point-list/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import ExpList from './components/ExpList'
import PointList from './components/PointList'
import { Message } from 'element-ui'
import { getDetail, setDetailAvatar } from '@/api/user'
export default {
  components: { ExpList, PointList },
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const userId = this.$route.params.userId
      getDetail(userId).then(response => {
        this.userInfo = response.data
      })
    },
    setAvatar() {
      const userId = this.$route.params.userId
      setDetailAvatar(userId).then(response => {
        Message({
          message: response.msg,
          type: 'success',
          duration: 5 * 1000
        })
      })
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-bottom: 20px;
}
  .detail-info {
    padding-left: 30px;
  }
  .detail-info .el-col {
    margin: 10px 0;
    font-size: 14px;
  }
</style>
