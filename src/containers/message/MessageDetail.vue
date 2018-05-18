<!-- 消息详情 -->
<template>
  <div class="message-box">
    <el-row type="flex" justify="space-between">
      <div class="from-user">留言人：{{message.fuser.username}}</div>
      <div class="time">时间：{{message.createTime | dateFormat}}</div>
    </el-row>
    <div class="message-content-label">留言内容：</div>
    <pre class="message-content" v-text="message.content">
    </pre>
    <div class="btn-box" v-show="!replyShow && message.fuser.uId>0">
      <el-button type="primary" size="small" @click="replyShow = true">回复</el-button>
    </div>
    <div style="margin-top:10px" v-show="replyShow">
      <el-input type="textarea" placeholder="请输入你的回复" v-model="rMessage.content" rows="5"></el-input>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="reply">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  init as apiInit,
  getMessageById,
  readMessage,
  sendMessage
} from "../../api/api";
export default {
  data() {
    return {
      message: {
        mId: 0,
        content: "",
        toUser: 0,
        fuser: {
          uId: 0,
          username: ""
        }
      },
      rMessage: {
        content: "",
        toUser: 0
      },
      replyShow: false
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getMessageInfo();
  },

  mounted() {},

  methods: {
    getMessageInfo() {
      this.message.mId = this.$route.params.id;
      getMessageById({ message: JSON.stringify(this.message) })
        .then(res => {
          this.message = res.resultParam;
          if (this.message.status === 0) {
            this.readMessage();
          }
        })
        .catch(err => {});
    },
    // 阅读
    readMessage() {
      readMessage({ message: JSON.stringify(this.message) })
        .then(res => {})
        .catch(err => {});
    },
    // 回复
    reply() {
      this.rMessage.toUser = this.message.fuser.uId;
      sendMessage({ message: JSON.stringify(this.rMessage) })
        .then(res => {
          this.$message.success("回复成功");
          this.rMessage.content = "";
          this.replyShow = false;
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.message-box {
  box-sizing: border-box;
  font-size: 14px;
}
.message-content-label {
  margin: 20px 0;
}
.message-content {
  min-height: 300px;
  border: 1px solid #dcdfe6;
  padding: 10px;
  color: #2c3e50;
}
.btn-box {
  margin-top: 10px;
  text-align: right;
}
</style>