<!-- 修改联系方式 -->
<template>
    <div>
        <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="电话">
                <el-input v-model="user.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="updatePhone">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { init as apiInit, getUserInfo, updatePhone } from "../../api/api";
export default {
  data() {
    return {
      user: {
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
          this.user.phone = res.resultParam.phone;
        })
        .catch(err => {});
    },
    updatePhone() {
      updatePhone({ user: JSON.stringify(this.user) })
        .then(res => {
          this.$message.success("修改成功");
        })
        .catch(err => {});
    }
  }
};
</script>
<style  scoped>
</style>