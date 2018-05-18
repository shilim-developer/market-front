<!-- 修改密码 -->
<template>
    <div>
        <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="旧密码">
                <el-input type="password" v-model="user.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input type="password" v-model="user.surePassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="updatePassword">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { init as apiInit, updatePassword, logout } from "../../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      user: {
        oldPassword: "",
        password: "",
        surePassword: ""
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
    updatePassword() {
      if (this.user.password != this.user.surePassword) {
        this.$message.warning("两次密码不一致");
        return;
      }
      const user = Object.assign({}, this.user);
      user.oldPassword = md5.hex(user.oldPassword);
      user.password = md5.hex(user.password);
      updatePassword({ user: JSON.stringify(user) })
        .then(res => {
          this.$message.success("修改成功");
          logout()
            .then(res => {
              this.$router.push({ name: "login" });
            })
            .catch(err => {});
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
</style>