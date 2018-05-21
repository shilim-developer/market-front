<!-- 首页 -->
<template>
  <div>
    <!-- 轮播图开始 -->
    <el-carousel height="400px">
      <el-carousel-item v-for="item in carsouelList" :key="item.url">
        <img width="1200" height="400" style="object-fit:cover" :src="item.url" alt="" srcset="">
      </el-carousel-item>
    </el-carousel>
    <!-- 轮播图结束 -->
    <div class="d-flex flex-row mt-4">
      <!-- 商品列表开始 -->
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
            <div class="ml-2 mr-2 d-flex flex-column" style="flex:1;overflow:hidden">
              <div class="p-1 text-truncate good-name">
                {{item.goodName}}
              </div>
              <div class="p-1 d-flex flex-row" style="flex:1;overflow:hidden">
                <div class="text-ellipsis good-description" style="flex-grow:1;word-wrap:break-word">
                  {{item.goodDescription}}
                </div>
                <div class="good-price ml-4">
                  <span style="font-size:14px">¥</span> {{item.goodPrice | goodPriceFormat}}
                </div>
              </div>
              <div class="p-1">
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
      <!-- 商品列表开始 -->
      <!-- 我要出售开始 -->
      <div class="tools ml-4 p-3">
        <router-link :to="{ name: 'myGoods'}">
          <el-button class="w-100 mt-3" type="primary">我要出售</el-button>
        </router-link>
        <img src="@/assets/img/sold_banner.png" alt="" srcset="">
      </div>
      <!-- 我要出售结束 -->
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
      carsouelList: [
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526654376823&di=c4638d0ef54daf55ce48493c487e5405&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F017c7658cf41e8a801219c779dc589.jpg"
        },
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526654893798&di=2a3bbbf603b9edaf3b42771884be1a5c&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01de2957076db06ac7257948fdd9c7.jpg"
        },
        {
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526654942896&di=20c8c5033d89e6624eef2c96a09ed446&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01b2b157f9a0bfa84a0e282b612710.jpg"
        }
      ],
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
    this.searchListener();
  },

  mounted() {},
  beforeDestroy() {
    this.$parent.$parent.$parent.instance.$off("search");
  },
  methods: {
    // 监听搜索
    searchListener() {
      this.$parent.$parent.$parent.instance.$on("search", data => {
        this.good.goodName = data;
        this.handleCurrentChange(1);
      });
    },
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
.good-item .label {
  font-size: 12px;
  color: rgba(136, 136, 136, 0.596);
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.good-name {
  color: #065fb4;
  font-weight: bold;
  font-size: 18px;
}
.good-description {
  flex: 1;
  color: #666;
  font-size: 14px;
}
.good-price {
  color: #ff9800;
  font-size: 24px;
}
.good-item .time {
  font-size: 12px;
  color: rgba(136, 136, 136, 0.596);
}

/* 侧边框 */
.tools {
  margin-top: 64px;
  height: 240px;
  border-radius: 4px;
  border: 1px solid rgb(235, 238, 245);
  flex: 1;
}
.tools img {
  width: 100%;
  margin-top: 20px;
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