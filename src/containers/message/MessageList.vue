<!-- 消息列表 -->
<template>
  <div style="box-sizing: border-box;">
    <el-table :data="messageList" style="width: 100%" @row-click="rowClick" :row-style="{cursor:'pointer'}">
      <el-table-column prop="fuser.username" label="来件人" width="180">
      </el-table-column>
      <el-table-column prop="content" label="内容" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="createTime" label="时间" width="180">
        <template slot-scope="scope">
          {{scope.row.createTime | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          {{scope.row.status | messageStatusFormat}}
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:20px;text-align:center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.current" :page-sizes="[5,10, 20, 50]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { init as apiInit, getMessageByPage } from "../../api/api";
export default {
  data() {
    return {
      page: {
        current: 1,
        size: 10,
        pages: 0,
        total: 0
      },
      messageList: []
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getMessageList();
  },

  mounted() {},

  methods: {
    getMessageList() {
      getMessageByPage({ page: JSON.stringify(this.page) })
        .then(res => {
          this.messageList = res.resultParam.records;
          this.page.current = res.resultParam.current;
          this.page.pages = res.resultParam.pages;
          this.page.total = res.resultParam.total;
        })
        .catch(err => {});
    },
    rowClick(message) {
      this.$router.push({ name: "messageDetail", params: { id: message.mId } });
    },
    // 改变每页条数
    handleSizeChange(val) {
      this.page.size = val;
      this.getMessageByPage();
    },
    // 翻页
    handleCurrentChange(val) {
      this.page.current = val;
      this.getMessageByPage();
    }
  }
};
</script>
<style scoped>

</style>