<!-- 订单确认 -->
<template>
  <div>
    <el-breadcrumb style="padding-left:20px" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">商品详情</el-breadcrumb-item>
      <el-breadcrumb-item>订单确认</el-breadcrumb-item>
    </el-breadcrumb>
    <table style="width:100%;margin-top:20px;margin-left:15px">
      <tr class="table-head">
        <th>图片</th>
        <th>商品名</th>
        <th>单价</th>
        <th>数量</th>
      </tr>
      <tbody>
        <tr style="text-align:center">
          <td style="width: 260px;">
            <img class="good-pic" :src="good.goodPics | imageUrlFormat">
          </td>
          <td>
            {{order.goodName}}
          </td>
          <td>{{order.goodPrice | goodPriceFormat}}</td>
          <td style="width: 200px;">
            <el-input-number v-model="order.goodCount" @change="handleChange" :min="1" :max="good.goodSurplus"></el-input-number>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="address-box">
      <el-input placeholder="请输入收货地址" type="textarea" v-model="order.address"></el-input>
    </div>
    <div class="count-box">
      <span>总价：¥
        <span class="total-price">{{order.totalMoney | goodPriceFormat}}</span>
      </span>
      <span>
        <el-button type="primary" @click="check">确认订单</el-button>
      </span>
    </div>
  </div>
</template>

<script>
import { init as apiInit, getGoodById, addOrder } from "../../api/api";
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
      order: {
        goodId: 0,
        goodName: "",
        goodCount: 1,
        goodPrice: 0,
        totalMoney: 0,
        address: "",
        soldUser: "",
        soldUserId: 0
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
          this.order.goodId = res.resultParam.good.gId;
          this.order.goodName = res.resultParam.good.goodName;
          this.order.goodPrice = res.resultParam.good.goodPrice;
          this.order.soldUser = res.resultParam.user.username;
          this.order.totalMoney = res.resultParam.good.goodPrice;
          this.order.soldUserId = res.resultParam.user.uId;
        })
        .catch(err => {});
    },
    // 改变数量
    handleChange(val) {
      this.order.totalMoney = this.order.goodPrice * val;
    },
    // 确认订单
    check() {
      addOrder({ order: JSON.stringify(this.order) })
        .then(res => {
          this.$message.success("确认成功");
          this.$router.push({ name: "orderList" });
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.good-pic {
  width: 240px;
}
.table-head {
  color: #606266;
  font-size: 14px;
  text-align: center;
}
.address-box {
  border-top: 1px solid #dcdfe6;
  margin-top: 10px;
  padding-top: 20px;
}
.count-box {
  text-align: right;
  padding: 15px 0;
}
.total-price {
  font-size: 25px;
  color: red;
  padding-right: 20px;
}
</style>