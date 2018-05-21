<!-- 我的商品 -->
<template>
  <div style="box-sizing: border-box;">
    <div class="btn-box">
      <router-link to="goodAddiction">
        <el-button type="primary" size="small">上架商品</el-button>
      </router-link>
    </div>
    <el-table :data="goodList" style="width: 100%">
      <el-table-column prop="goodPics" label="图片" width="180">
        <template slot-scope="scope">
          <img class="good-pic" :src="scope.row.goodPics | imageUrlFormat">
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="名称">
      </el-table-column>
      <el-table-column prop="goodPrice" label="价格">
        <template slot-scope="scope">
          {{scope.row.goodPrice | goodPriceFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="goodCount" label="数量">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span>{{scope.row.status | goodStatusFormat}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push({ name: 'goodEdition', params: { id: scope.row.gId }})">
            编辑
          </el-button>
          <el-button v-show="scope.row.status == 1" type="default" size="small">下架</el-button>
          <el-button type="danger" size="small" @click="deleteGood(scope.row.gId)">删除</el-button>
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
import { init as apiInit, getGoodByPage, deleteGood } from "../../api/api";
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0
      },
      goodList: []
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getGoodList();
  },

  mounted() {},

  methods: {
    // 获取商品列表
    getGoodList() {
      getGoodByPage({ page: JSON.stringify(this.page) })
        .then(res => {
          this.goodList = res.resultParam.records;
          this.page.current = res.resultParam.current;
          this.page.pages = res.resultParam.pages;
          this.page.total = res.resultParam.total;
        })
        .catch(err => {});
    },
    // 删除
    deleteGood(id) {
      this.$confirm("确认删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteGood({ goods: JSON.stringify([{ gId: id }]) })
            .then(res => {
              this.$message.success("删除成功");
              this.getGoodList();
            })
            .catch(err => {});
        })
        .catch(() => {});
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getGoodList();
    },
    // 翻页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getGoodList();
    }
  }
};
</script>
<style scoped>
.container {
  margin-top: 20px;
}
.menu {
  border-right: none;
  margin-top: 50px;
}
.content {
  padding: 0 20px;
}
.btn-box {
  padding-bottom: 20px;
}
.good-pic {
  height: 100px;
}
</style>