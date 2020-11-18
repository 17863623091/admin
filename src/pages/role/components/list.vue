<template>
  <dfn>
    <el-table :data="list" border style="width: 100% ;margin-top:10px">
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="primary" plain disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="info" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </dfn>
</template>

<script>
import { reqRoleDel } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {};
  },
  methods: {
    // 删除列表数据
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqRoleDel(id).then(res => {
            if(res.data.code==200){
              successAlert('删除成功')
              this.$emit('init')
            }else{
              errorAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 子组件告诉父组件用户点击了编辑，并携带了id参数
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {}
};
</script>

<style>
</style>