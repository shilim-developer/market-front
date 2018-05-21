<!-- 注册页面 -->
<template>
    <el-row type="flex" justify="center" style="margin:100px; 0">
        <el-col :span="8">
            <el-card>
                <h1>注册</h1>
                <el-form ref="form" :model="user" @keyup.native.enter="register">
                    <el-form-item label="">
                        <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input type="password" v-model="user.surePassword" placeholder="请输入确认密码"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-radio v-model="user.sex" :label="0">男</el-radio>
                        <el-radio v-model="user.sex" :label="1">女</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="btns" type="primary" @click="register">注册</el-button>
                    </el-form-item>
                    <el-form-item>
                        <router-link to="login">
                            <el-button class="btns" type="default">去登录</el-button>
                        </router-link>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import { init as apiInit, register } from "../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        surePassword: "",
        phone: "",
        nickname: "",
        sex: 0,
        email: ""
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
    register() {
      if (this.user.password != this.user.surePassword) {
        this.$message.warning("两次密码不一致");
        return;
      }
      const user = Object.assign({}, this.user);
      user.password = md5.hex(user.password);
      register({ user: JSON.stringify(user) })
        .then(res => {
          this.$message.success("注册成功");
          this.$router.push({ name: "login" });
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