<!-- 首页 -->
<template>
  <div class="d-flex flex-row">
    <div style="width:850px;">
      <el-row type="flex" class="classify">
        <div :class="{'active':good.cId ===0}" @click="classifyChoose(0)">推荐</div>
        <div v-for="item in classifyList" :key="item.cId" :class="{'active':good.cId ===item.cId}" @click="classifyChoose(item.cId)">{{item.classifyName}}</div>
      </el-row>
      <div class="d-flex flex-column">
        <router-link target="_blank" class="d-flex flex-row good-item" v-for="(item) in goodList" :key="item.gId" :to="{ name: 'goodDetail', params: { id: item.gId }}">
          <div>
            <img :src="item.goodPics | imageUrlFormat" class="image">
          </div>
          <div class="ml-2 mr-2" style="flex:1">
            <div>
              <span class="label">商品名称:</span>
              <span>{{item.goodName}}</span>
            </div>
            <div>
              <span class="label">商品价格:</span>
              <span class="price">¥ {{item.goodPrice}}</span>
            </div>
            <div>
              <span class="label">商品余量:</span>
              <span>{{item.goodSurplus}}</span>
            </div>
            <div>
              <span class="label">商品描述:</span>
              <span>{{item.goodDescription}}</span>
            </div>
            <div>
              <span class="label">
                <i class="fa fa-user"></i>
                &nbsp;{{item.fuser.username}}
              </span>
              <span class="time pull-right">发布于:{{item.createTime | dateFormat}}</span>
            </div>
          </div>
        </router-link>
      </div>
      <div style="text-align:center" v-show="goodList.length>0">
        <el-pagination background layout="prev, pager, next" :page-size="page.size" :total="page.total" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class="tools ml-4 p-3">
      <el-input placeholder="请输入搜索内容" v-model="good.goodName" @keyup.native.enter="handleCurrentChange(1)"></el-input>
      <router-link :to="{ name: 'myGoods'}">
        <el-button class="w-100 mt-3" type="primary">我要出售</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  init as apiInit,
  getAllClassify,
  getPageGoodByClassify
} from "../api/api";
export default {
  data() {
    return {
      classifyList: [], //分类列表
      good: {
        cId: 0,
        goodName: ""
      },
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
    this.getClassifyList();
    this.getGoodListByPage();
  },

  mounted() {},

  methods: {
    // 获取分类列表
    getClassifyList() {
      getAllClassify()
        .then(res => {
          this.classifyList = res.resultParam;
        })
        .catch(err => {});
    },
    // 分类选择
    classifyChoose(id) {
      this.good.cId = id;
      this.page.current = 1;
      this.getGoodListByPage();
    },
    // 根据分类id获取商品
    getGoodListByPage() {
      getPageGoodByClassify({
        page: JSON.stringify(this.page),
        good: JSON.stringify(this.good)
      })
        .then(res => {
          this.goodList = res.resultParam.records;
          this.page.total = res.resultParam.total;
          this.page.pages = res.resultParam.pages;
        })
        .catch(err => {});
    },
    // 换页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getGoodListByPage();
    }
  }
};
</script>
<style scoped>
/* 分类 */
.classify {
  margin-bottom: 20px;
  color: #888888;
}
.classify div {
  padding: 10px 20px;
  padding-left: 0px;
  cursor: pointer;
}
.classify .active {
  color: rgb(64, 158, 255);
}

/* 商品列表 */
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
.good-item {
  border: 1px solid rgb(235, 238, 245);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
}
.image {
  height: 120px;
  border-right: 1px solid rgb(235, 238, 245);
}
.good-item span {
  font-size: 14px;
  color: #333;
}
.good-item .label {
  font-size: 12px;
  color: rgba(136, 136, 136, 0.596);
}
.good-item .price {
  font-size: 16px;
  color: red;
}
.good-item .time {
  font-size: 12px;
  color: rgba(136, 136, 136, 0.596);
}

/* 侧边框 */
.tools {
  margin-top: 64px;
  height: 140px;
  border-radius: 4px;
  border: 1px solid rgb(235, 238, 245);
  flex: 1;
}

/* 卡片 */
.row {
  flex-wrap: wrap;
}
.card {
  width: 255px;
  margin-left: 40px;
  margin-bottom: 40px;
}
.card.no-left {
  margin-left: 0;
}

.price {
  padding-top: 10px;
  color: red;
  font-size: 20px;
}
</style>