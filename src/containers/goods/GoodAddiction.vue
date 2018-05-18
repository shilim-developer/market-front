<!-- 添加商品 -->
<template>
  <div>
    <el-form ref="form" :model="good" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="good.goodName"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="good.goodPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品数量">
        <el-input v-model="good.goodCount"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="good.goodDescription"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="good.cId" placeholder="请选择活商品分类">
          <el-option v-for="item in classifyList" :key="item.cId" :label="item.classifyName" :value="item.cId"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="商品图片">
        <input ref="imgaeValue" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="openPicCut" id="fileinput" class="fileinput" />
        <label class="filelabel" for="fileinput">
          <img class="good-pic" :src="good.goodPics">
        </label>
        <!-- <el-input v-model="good.goodName"></el-input> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="save">保存</el-button>
        <el-button size="small" @click="canel">取消</el-button>
      </el-form-item>
    </el-form>

    <!-- 图片裁剪 -->
    <el-dialog title="提示" :visible="cutShow" width="70%" @close="cutShow = false" @open="handlePicChange()">
      <div class="cut-pic-box">
        <img id="cropPic" class="cropper">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cutShow = false">取 消</el-button>
        <el-button type="primary" @click="handleCut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { init as apiInit, getAllClassify, addGood } from "../../api/api";
import Cropper from "cropperjs";
import "@/assets/css/cropper.min.css";
export default {
  data() {
    return {
      good: {
        goodName: "",
        goodPrice: "",
        goodCount: "",
        goodDescription: "",
        goodPics: "",
        cId: ""
      },
      classifyList: [],
      imgFile: null,
      cropper: {},
      cutShow: false,
      cropperInit: false
    };
  },

  components: {},

  computed: {},

  created() {
    apiInit(this);
    this.getClassifyList();
  },

  mounted() {},

  methods: {
    getClassifyList() {
      getAllClassify()
        .then(res => {
          this.classifyList = res.resultParam;
        })
        .catch(err => {});
    },
    openPicCut(e) {
      this.imgFile = e;
      this.cutShow = true;
    },
    handlePicChange(e) {
      setTimeout(() => {
        e = this.imgFile;
        if (e.target.files.length === 0) return;
        if (!this.cropperInit) {
          let img = document.getElementById("cropPic");
          this.cropper = new Cropper(img, {
            dragMode: "move",
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false,
            aspectRatio: 1.6
          });
          this.cropperInit = true;
        }
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onload = () => {
          this.cutShow = true;
          setTimeout(() => {
            this.cropper.replace(reader.result);
            this.$refs.imgaeValue.value = "";
          });
          reader.onload = null;
        };
        reader.readAsDataURL(file);
      }, 0);
    },
    handleCut() {
      let file = this.cropper.getCroppedCanvas().toDataURL();
      this.good.goodPics = file;
      this.cutShow = false;
    },
    //保存
    save() {
      addGood({ good: JSON.stringify(this.good) })
        .then(res => {
          this.$message.success("新增成功");
          this.$router.push({ name: "myGoods" });
        })
        .catch(err => {});
    },
    //取消
    canel() {
      this.$router.push({ name: "myGoods" });
    }
  }
};
</script>
<style scoped>
/* 图片上传 */
.good-pic {
  width: 350px;
  height: 218px;
  border: 1px solid #dddee1;
  cursor: pointer;
}
.filelabel {
  display: block;
  width: 350px;
  height: 218px;
}
.fileinput {
  display: none;
}
.cut-pic-box {
  height: 300px;
}
.cropper {
  box-sizing: border-box;
  border: 1px solid #c3c3c3;
  width: 100%;
  height: 100%;
}
.cropper img {
  max-height: 100%;
}
</style>