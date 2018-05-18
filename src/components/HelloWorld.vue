<template>
  <div class="hello">
    shilim?
    <qrcode value="http://www.baidu.com" :options="{ size: 200 }" :tag="'img'"></qrcode>
  </div>
</template>

<script>
import Qrcode from "@xkeshi/vue-qrcode";
export default {
  components: {
    qrcode: Qrcode
  },
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
