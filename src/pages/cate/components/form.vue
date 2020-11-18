<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="cate">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="cate.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in catelist"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="cate.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" v-if="cate.pid != 0">
          <div class="imgFile">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt />
            <input type="file" class="inp" v-if="info.isShow" @change="selectFile" />
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="cate.status" :active-value="1" inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.title=='添加分类'">添加</el-button>
          <el-button type="primary" @click='updata' v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import { reqcateAdd, reqcateDetail ,reqcateUpdata} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      cate: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      catelist: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    //   清空cate
    empty() {
      this.cate = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
       this.imgUrl = "";
    },
    // 弹框消失
    cancel() {
      this.info.isShow = false;
    },
    selectFile(e) {
      //   console.log(e);
      let file = e.target.files[0];

      // 判断图片大小
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("上传文件不能超过2M");
        return;
      }

      let extname = path.extname(file.name);
      let arr = [".jpg", ".jpeg", ".png", ".gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的文件格式");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);

      this.cate.img = file;
    },
    add() {
      console.log(this.cate);
      reqcateAdd(this.cate).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          this.reqList();
        }
      });
    },
    getOne(id) {
      console.log(id);
      reqcateDetail(id).then(res => {
          this.cate = res.data.list
          this.imgUrl = this.$imgPre + this.cate.img
          this.cate.id = id
      });
    },
    updata(){
        reqcateUpdata(this.cate).then(res=>{
            if(res.data.code==200){
                successAlert('修改成功')
                this.cancel()
                this.empty()
                this.reqList()
            }
        })
    },
    closed(){
        // 点击编辑后，对话框中获取到当前信息，点击取消后再点击添加，数据还存在
        if(this.info.title=='编辑分类'){
            this.empty()
        }
    }
  }
};
</script>

<style scoped>
.imgFile {
  width: 100px;
  height: 100px;
  border: 1px dashed skyblue;
  text-align: center;
  line-height: 100px;
  position: relative;
}
.imgFile h3 {
  font-size: 30px;
  font-weight: 100;
}
.imgFile img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.inp {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>