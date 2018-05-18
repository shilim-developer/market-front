<!-- 商品详情页 -->
<template>
  <div>
    <el-breadcrumb style="padding-left:20px" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row style="margin-top:20px" type="flex" justify="space-between">
      <el-card class="good-pic" :body-style="{padding:'0'}">
        <img class="good-pic" :src="good.goodPics | imageUrlFormat">
      </el-card>
      <div class="good-content">
        <div class="title">{{good.goodName}}</div>
        <div class="price">¥ {{good.goodPrice}}</div>
        <div class="surplus">剩余量：{{good.goodSurplus}}</div>
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
        <div>商品描述</div>
      </div>
      <div class="good-des">
        {{good.goodDescription}}
      </div>
    </el-row>

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
import { init as apiInit, getGoodById, sendMessage } from "../../api/api";
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
      }
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
}
.price {
  font-size: 30px;
  color: red;
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
}
</style>