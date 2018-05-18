<!-- 个人信息 -->
<template>
  <div>
    <el-row type="flex" class="">
      <el-col :span="3">
        用户名:
      </el-col>
      <el-col :span="18">
        {{user.username}}
      </el-col>
    </el-row>
    <el-row type="flex" class="row">
      <el-col :span="3">
        联系方式:
      </el-col>
      <el-col :span="18">
        {{user.phone}}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { init as apiInit, getUserInfo } from "../../api/api";
export default {
  data() {
    return {
      user: {
        username: "",
        phone: ""
      }
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
    }
  }
};
</script>
<style  scoped>
.row {
  margin-top: 20px;
}
</style>