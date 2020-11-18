<template>
  <dfn>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="100px">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :props='{children:"children",label:"title"}'
          ></el-tree>
        </el-form-item>
        <el-form-item label="角色名称" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="willAdd()" v-if="info.title=='添加角色'">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </dfn>
</template>

<script>
import {
  reqRoleAdd,
  reqMenuList,
  reqRoleDetail,
  reqRoleUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      },
      menulist: []
    };
  },
  methods: {
    // 置空form表单内容
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
      // 清空树节点，原因：点击添加完成后，只清空了form表单的内容，树节点并没有被清空
      this.$refs.tree.setCheckedKeys([]);
    },
    // 取消
    cancel() {
      this.info.isShow = false;
    },
    willAdd() {
      // 将树形控件的值取出来复制给form的menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          // 弹出添加成功提示
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 清空form表单内容
          this.empty();
          // 刷新list列表
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    // 获取点击编辑后当前用户的信息
    getOneRole(id) {
      reqRoleDetail(id).then(res => {
        this.form = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        this.form.id = id;
      });
    },
    // 小bug：点击编辑后，获取到数据，再点击添加数据还存在
    closed() {
      if (this.info.title == "编辑角色") {
        this.empty();
      }
    },
    // 点击修改
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.form).then(res=>{
        if(res.data.code == 200){
          // 弹出修改成功提示
          successAlert('操作成功')
          // 清空form表单
          this.empty()
          // 弹框消失
          this.cancel()
          // 通知父组件刷新列表
          this.$emit('init')
        }else{
          errorAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    reqMenuList().then(res => {
      this.menulist = res.data.list;
    });
  }
};
</script>

<style>
</style>