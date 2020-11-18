<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="vip">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="vip.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="vip.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="vip.password" autocomplete="off"></el-input>
          <p>留空则不修改</p>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="vip.status" :active-value="1" inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click='updata'>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { errorAlert, successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import { reqvipAdd, reqvipDetail ,reqvipUpdate} from "../../../utils/http";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      vip: {
        uid: "",
        nickname: "",
        phone: "",
        password:'',
        status: 1
      }
    };
  },
  computed: {
    ...mapGetters({
      viplist: "vip/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList"
    }),
    //   清空cate
    empty() {
      this.vip = {
        uid: "",
        nickname: "",
        phone: "",
        password:'',
        status: 1
      }
    },
    // 弹框消失
    cancel() {
      this.info.isShow = false;
    },
    getOne(uid) {
      console.log(uid);
      reqvipDetail(uid).then(res => {
          this.vip = res.data.list
          // 密码不显示，留空后台不做处理
          this.vip.password = ''
      });
    },
    updata(){
        reqvipUpdate(this.vip).then(res=>{
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
        if(this.info.title=='编辑会员'){
            this.empty()
        }
    }
  }
};
</script>

<style scoped>

</style>