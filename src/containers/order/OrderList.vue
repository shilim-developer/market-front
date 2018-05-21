<!-- 订单列表 -->
<template>
  <div style="box-sizing: border-box;">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column prop="orderNumber" label="订单编号" width="180">
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称">
      </el-table-column>
      <el-table-column prop="goodPrice" label="价格">
        <template slot-scope="scope">
          {{scope.row.goodPrice | goodPriceFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="goodCount" label="数量">
      </el-table-column>
      <el-table-column prop="totalMoney" label="总价">
        <template slot-scope="scope">
          {{scope.row.totalMoney | goodPriceFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="soldUser" label="卖家名称">
      </el-table-column>
      <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{scope.row.status | orderStatusFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0" type="primary" size="small" @click="pay(scope.row)">付款</el-button>
          <el-button v-if="scope.row.status === 2" type="primary" size="small" @click="receipt(scope.row)">确认收货</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[5,10, 20, 50]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  init as apiInit,
  getPageOrderByBuyUserId,
  getPayUrl,
  receipt
} from "../../api/api";
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0
      },
      // 订单列表
      orderList: []
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getOrderList();
  },

  mounted() {},

  methods: {
    // 获取订单列表
    getOrderList() {
      getPageOrderByBuyUserId({ page: JSON.stringify(this.page) })
        .then(res => {
          this.orderList = res.resultParam.records;
          this.page.current = res.resultParam.current;
          this.page.pages = res.resultParam.pages;
          this.page.total = res.resultParam.total;
        })
        .catch(err => {});
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getOrderList();
    },
    // 翻页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getOrderList();
    },
    // 付款
    pay(order) {
      getPayUrl({ order: JSON.stringify(order) })
        .then(res => {
          window.location.href = res.resultParam;
        })
        .catch(err => {});
    },
    // 确认收货
    receipt(order) {
      this.$confirm("确认收货吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          receipt({ order: JSON.stringify(order) })
            .then(res => {
              this.$message.success("确认收货成功");
              this.getOrderList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
</style>