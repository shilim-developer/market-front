<!-- 个人中心 -->
<template>
    <div>
        <el-breadcrumb style="padding-left:20px" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="personal-container">
            <el-col :span="3">
                <el-menu class="menu" :router="true">
                    <el-menu-item index="/information">
                        <span slot="title">个人信息</span>
                    </el-menu-item>
                    <el-menu-item index="/passwordEdition">
                        <span slot="title">修改密码</span>
                    </el-menu-item>
                    <el-menu-item index="/telephoneEdition">
                        <span slot="title">修改联系方式</span>
                    </el-menu-item>
                    <el-menu-item index="/myGoods">
                        <span slot="title">我的商品</span>
                    </el-menu-item>
                    <el-menu-item index="/orderList">
                        <span slot="title">出账订单</span>
                    </el-menu-item>
                    <el-menu-item index="/todoOrderList">
                        <span slot="title">入账订单</span>
                    </el-menu-item>
                    <el-menu-item index="/messageList">
                        <span slot="title">我的消息</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="21" class="content">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style scoped>
.personal-container {
  margin-top: 20px;
}
.menu {
  border-right: none;
  /* margin-top: 50px; */
}
.content > div {
  width: 100%;
  padding: 0 20px;
}
a {
  text-decoration: none;
}
</style>