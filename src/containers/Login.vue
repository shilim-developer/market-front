<!-- 登录页面 -->
<template>
    <el-row type="flex" justify="center" style="margin-top:100px">
        <el-col :span="8">
            <el-card>
                <h1>登录</h1>
                <el-form ref="form" :model="user">
                    <el-form-item label="">
                        <el-input v-model="user.username" placeholder="请输入如用户名" @keyup.native.enter="login"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input type="password" v-model="user.password" placeholder="请输入密码" @keyup.native.enter="login"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btns" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                    <el-form-item>
                        <router-link to="register">
                            <el-button class="btns" type="default">去注册</el-button>
                        </router-link>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { init as apiInit, login } from "../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
  },

  mounted() {},

  methods: {
    login() {
      const user = Object.assign({}, this.user);
      user.password = md5.hex(user.password);
      login({ user: JSON.stringify(user) })
        .then(res => {
          localStorage.user = JSON.stringify(res.resultParam);
          this.$message.success("登录成功");
          this.$router.push({ name: "home" });
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.btns {
  width: 100%;
}
</style>