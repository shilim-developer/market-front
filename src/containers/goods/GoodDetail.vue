<!-- 商品详情页 -->
<template>
  <div>
    <!-- <el-breadcrumb style="padding-left:20px" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb> -->

    <div class="d-flex mt-4">
      <div style="width:850px">
        <el-row type="flex" justify="space-between">
          <el-card class="good-pic" :body-style="{padding:'0'}">
            <img class="good-pic" :src="good.goodPics | imageUrlFormat">
          </el-card>
          <div class="good-content">
            <div class="title">{{good.goodName}}</div>
            <div class="price">
              <span style="font-size:14px">¥</span> {{good.goodPrice | goodPriceFormat}}</div>
            <div class="surplus">剩余量：{{good.goodSurplus}}</div>
            <div class="surplus">交易方式：线上交易</div>
            <div class="sold-user">
              <i class="fa fa-user"></i> &nbsp; {{user.username}}
            </div>
            <div class="opera">
              <router-link :to="{ name: 'orderCheck',params:{id:good.gId}}">
                <el-button type="primary">购买</el-button>
              </router-link>
              <el-button type="default" @click="messageInputShow = true">留言</el-button>
            </div>
          </div>
        </el-row>

        <el-row style="margin-top:20px">
          <div class="good-des-label">
            <div>商品详情</div>
          </div>
          <div class="good-des" v-html="good.goodContent">
            <!-- {{good.goodDescription}} -->
          </div>
        </el-row>
      </div>

      <div style="width:330px">
        <!-- 我要出售开始 -->
        <div class="tools ml-4 p-3">
          <router-link :to="{ name: 'myGoods'}">
            <el-button class="w-100 mt-3" type="primary">我要出售</el-button>
          </router-link>
          <img src="@/assets/img/sold_banner.png" alt="" srcset="">
        </div>
        <!-- 我要出售结束 -->
        <!-- 其他商品 -->
        <div class="tools ml-4 mt-4 p-3" v-show="otherGoodList.length>0">
          <div class="other-label">他的其他商品</div>
          <div v-for="item in otherGoodList" :key="item.gId" class="other-good-box">
            <router-link target="_blank" :to="{name:'goodDetail',params:{id:item.gId}}">
              <img :src="item.goodPics | imageUrlFormat " class="w-100">
              <div class="d-flex flex-row mt-1">
                <span class="other-name text-truncate" style="flex:2">{{item.goodName}}</span>
                <span class="other-price text-right" style="flex:1">
                  <span style="font-size:12px">¥</span> {{item.goodPrice | goodPriceFormat}}
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 留言start -->
    <el-dialog title="留言" :visible.sync="messageInputShow" width="50%">
      <el-input type="textarea" placeholder="请输入你的留言" v-model="message.content" rows="5"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageInputShow = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 留言end -->
  </div>
</template>

<script>
import {
  init as apiInit,
  getGoodById,
  sendMessage,
  getUserOtherGood
} from "../../api/api";
export default {
  data() {
    return {
      good: {
        gId: 0,
        goodName: "",
        goodPrice: 0,
        goodCount: 0,
        goodSurplus: 0,
        goodDescription: "",
        goodPics: "",
        cId: 0
      },
      user: {
        username: ""
      },
      messageInputShow: false,
      message: {
        content: "",
        toUser: 0
      },
      otherGoodList: []
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getGoodInfo();
  },

  mounted() {},

  methods: {
    getGoodInfo() {
      this.good.gId = this.$route.params.id;
      getGoodById({ good: JSON.stringify(this.good) })
        .then(res => {
          this.good = res.resultParam.good;
          this.user = res.resultParam.user;
          this.getUserOtherGood();
        })
        .catch(err => {});
    },
    // 用户其他商品
    getUserOtherGood() {
      getUserOtherGood({ good: JSON.stringify(this.good) })
        .then(res => {
          this.otherGoodList = res.resultParam;
        })
        .catch(err => {});
    },
    // 回复
    sendMessage() {
      this.message.toUser = this.user.uId;
      sendMessage({ message: JSON.stringify(this.message) })
        .then(res => {
          this.$message.success("留言成功");
          this.message.content = "";
          this.messageInputShow = false;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.good-pic {
  width: 400px;
}

.good-content {
  flex: 1;
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #065fb4;
}
.price {
  font-size: 30px;
  color: #ff9800;
  font-weight: bold;
}
.surplus,
.sold-user {
  font-size: 14px;
}

/* 商品描述 */
.good-des-label {
  border-bottom: 1px solid rgb(64, 158, 255);
}
.good-des-label div {
  display: inline-block;
  padding: 10px 20px;
  background: rgb(64, 158, 255);
  color: #ffffff;
  font-size: 14px;
}
.good-des {
  padding: 10px;
  overflow: hidden;
}

/* 侧边框 */
.tools {
  border-radius: 4px;
  border: 1px solid rgb(235, 238, 245);
  flex: 1;
}
.tools img {
  width: 100%;
  margin-top: 20px;
}
.other-label {
  color: rgb(64, 158, 255);
  text-align: center;
  font-weight: bold;
}
.other-good-box {
  text-decoration: none;
}
.other-good-box a:hover {
  text-decoration: none;
}
.other-name {
  color: rgb(64, 158, 255);
}
.other-price {
  width: 60px;
  color: #ff9800;
}
</style>