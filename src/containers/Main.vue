<!-- 主要页面 -->
<template>
  <el-container style="width:auto;overflow: visible;">
    <div class="w-100 login-tool">
      <div>
        <span v-show="user.username.length == 0">
          <router-link :to="{name:'login'}">[登录]</router-link>
        </span>
        <span v-show="user.username.length == 0" class="ml-2">
          <router-link :to="{name:'register'}">[注册]</router-link>
        </span>
        <router-link tag="span" style="cursor: pointer;" v-show="user.username.length > 0" :to="{name:'information'}">
          {{user.username}}
        </router-link>
        <span v-show="user.username.length > 0" style="cursor: pointer;" class="ml-2" @click="logout">注销</span>
      </div>
    </div>
    <el-header class="header">
      <div class="head-center">
        <router-link class="pull-left" :to="{name:'home'}">
          <img class="logo" src="@/assets/logo.png" height="40">
        </router-link>
        <div v-if="$route.name === 'home'" class="input-group input-group-sm d-inline-flex" style="width:300px">
          <input type="text" class="form-control" placeholder="请输入搜索内容" v-model="keyword" @keyup.enter="search">
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" @click="search">搜索</button>
          </div>
        </div>
        <!-- <el-dropdown>
          <div class="head-box">
            <span>{{user.username}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link :to="{name:'information'}">
              <el-dropdown-item>
                个人中心
              </el-dropdown-item>
            </router-link>
            <router-link :to="{name:'messageList'}">
              <el-dropdown-item>我的消息</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->
      </div>
    </el-header>
    <el-main class="main-container">
      <div class="main">
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { init as apiInit, logout } from "../api/api";
export default {
  data() {
    return {
      user: {
        username: ""
      },
      keyword: "",
      instance: this
    };
  },

  components: {},

  created() {
    apiInit(this);
    if (localStorage.user) this.user = JSON.parse(localStorage.user);
  },

  mounted() {},

  methods: {
    logout() {
      logout()
        .then(res => {
          localStorage.removeItem("user");
          this.$router.push({ name: "login" });
        })
        .catch(err => {});
    },
    search() {
      this.$emit("search", this.keyword);
    }
  }
};
</script>
<style scoped>
/* 登录头 */
.login-tool {
  background: #eeeeee;
}
.login-tool div {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  text-align: right;
  width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.min-w {
  display: inline-block;
  min-width: 1200px;
  width: 1200px;
  text-align: right;
}
.header {
  width: 100%;
  min-width: 1200px;
  padding: 0;
  line-height: 60px;
  color: #ffffff;
  text-align: center;
  background: #409eff;
}
.head-center {
  width: 1200px;
  background: #409eff;
  display: inline-block;
  padding: 0 20px;
  text-align: right;
}
.head-box {
  color: #ffffff;
}

/* logo */
.logo {
  float: left;
  margin-top: 7px;
}

.main-container {
  text-align: center;
  width: 100%;
  overflow: hidden;
}
.main {
  display: inline-block;
  width: 1160px;
  text-align: left;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
</style>