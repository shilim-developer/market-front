<!-- 个人信息 -->
<template>
  <div class="information">
    <div class="avatar-box text-center">
      <img v-if="user.sex == 0" src="@/assets/img/man_avatar.jpg" alt="" srcset="">
      <img v-if="user.sex == 1" src="@/assets/img/woman_avatar.jpg" alt="" srcset="">
    </div>
    <el-row type="flex">
      <el-col :span="3" :offset="6" class="text-right">
        用户名:
      </el-col>
      <el-col :span="9" class="pl-4">
        {{user.username}}
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <el-col :span="3" :offset="6" class="text-right">
        昵称:
      </el-col>
      <el-col :span="9" class="pl-4">
        {{user.nickname}}
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <el-col :span="3" :offset="6" class="text-right">
        性别:
      </el-col>
      <el-col :span="9" class="pl-4">
        {{user.sex == 0?'男':'女'}}
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <el-col :span="3" :offset="6" class="text-right">
        联系方式:
      </el-col>
      <el-col :span="9" class="pl-4">
        {{user.phone}}
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <el-col :span="3" :offset="6" class="text-right">
        邮箱:
      </el-col>
      <el-col :span="9" class="pl-4">
        {{user.email}}
      </el-col>
    </el-row>

    <div class="d-flex flex-row justify-content-center mt-4 menu">
      <span @click="initUpdateInformationDialog">修改个人信息</span>
      <span @click="initUpdatePasswordDialog">修改密码</span>
    </div>

    <!-- 修改个人信息对话框开始 -->
    <el-dialog title="编辑个人信息" :visible.sync="updateInformationShow" width="50%">
      <el-form ref="form" :model="updateUser" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="updateUser.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="updateUser.sex" :label="0">男</el-radio>
          <el-radio v-model="updateUser.sex" :label="1">女</el-radio>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="updateUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="updateUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateInformationShow = false">取 消</el-button>
        <el-button type="primary" @click="updateInformation">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改个人信息对话框结束 -->

    <!-- 修改密码对话框开始 -->
    <el-dialog title="编辑密码" :visible.sync="updatePasswordShow" width="50%">
      <el-form ref="form" :model="passwordUser" label-width="80px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model="passwordUser.oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="passwordUser.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="passwordUser.surePassword"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatePasswordShow = false">取 消</el-button>
        <el-button type="primary" @click="updatePassword">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码对话框结束 -->
  </div>
</template>

<script>
import {
  init as apiInit,
  getUserInfo,
  updateInformation,
  updatePassword,
  logout
} from "../../api/api";
import md5 from "js-md5";
export default {
  data() {
    return {
      user: {
        username: "",
        nickname: "",
        sex: 0,
        phone: "",
        email: ""
      },
      updateUser: {
        nickname: "",
        sex: 0,
        phone: "",
        email: ""
      },
      passwordUser: {
        oldPassword: "",
        password: "",
        surePassword: ""
      },
      updateInformationShow: false,
      updatePasswordShow: false
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getUserInfo();
  },

  mounted() {},

  methods: {
    getUserInfo() {
      getUserInfo()
        .then(res => {
          this.user = res.resultParam;
        })
        .catch(err => {});
    },
    // 初始化修改个人信息数据
    initUpdateInformationDialog() {
      this.updateUser = { ...this.user };
      this.updateInformationShow = true;
    },
    updateInformation() {
      updateInformation({ user: JSON.stringify(this.updateUser) })
        .then(res => {
          this.updateInformationShow = false;
          this.$message.success("修改成功");
          this.getUserInfo();
        })
        .catch(err => {});
    },
    // 初始化修改密码数据
    initUpdatePasswordDialog() {
      this.passwordUser = {
        oldPassword: "",
        password: "",
        surePassword: ""
      };
      this.updatePasswordShow = true;
    },
    updatePassword() {
      if (this.passwordUser.password != this.passwordUser.surePassword) {
        this.$message.warning("两次密码不一致");
        return;
      }
      const user = Object.assign({}, this.passwordUser);
      user.oldPassword = md5.hex(user.oldPassword);
      user.password = md5.hex(user.password);
      updatePassword({ user: JSON.stringify(user) })
        .then(res => {
          this.$message.success("修改成功");
          logout()
            .then(res => {
              localStorage.removeItem("user");
              this.$router.push({ name: "login" });
            })
            .catch(err => {});
        })
        .catch(err => {});
    }
  }
};
</script>
<style  scoped>
.information {
  font-size: 14px;
}
.row {
  margin-top: 10px;
}
.avatar-box img {
  width: 100px;
  margin-bottom: 30px;
}
.menu span {
  cursor: pointer;
  color: royalblue;
  margin: 20px;
}
</style>