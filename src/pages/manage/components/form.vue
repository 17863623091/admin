<template>
  <div style='margin-top:10px;'>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              :label="item.rolename"
              :value="item.id"
              v-for="item in roleList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
          <template>
            <p>留空则不修改</p>
          </template>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加管理'">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqRoleList,
  reqManageAdd,
  reqManageDetail,
  reqManageUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: ""
      },
      roleList: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: ""
      };
    },
    cancel() {
      this.info.isShow = false;
    },
    add() {
      reqManageAdd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          this.empty();
          this.cancel();
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    getOneManage(uid) {
      reqManageDetail(uid).then(res => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    // 修改管理
    update() {
      reqManageUpdate(this.form).then(res=>{
          if(res.data.code==200){
              successAlert('修改成功')
              this.cancel();
              this.empty()
              this.$emit('init')
          }else{
              errorAlert(res.data.msg)
          }
      })
    }
  },
  mounted() {
    reqRoleList().then(res => {
      this.roleList = res.data.list;
    });
  }
};
</script>

<style>
</style>