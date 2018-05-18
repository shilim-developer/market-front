<!-- 主要页面 -->
<template>
  <el-container style="width:auto;overflow: visible;">
    <el-header class="header">
      <div class="head-center">
        <img class="logo pull-left" src="@/assets/logo.png" height="40">
        <el-dropdown>
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
        </el-dropdown>
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
        usernmae: ""
      }
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    localStorage.user ? (this.user = JSON.parse(localStorage.user)) : "";
    console.log(this.user);
  },

  mounted() {},

  methods: {
    logout() {
      logout()
        .then(res => {
          this.$router.push({ name: "login" });
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
/* 登录头 */
.login-tool {
  height: 20px;
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