<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope='scope'>
          <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
          <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="user">
          <el-button type="primary" @click="edit(user.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(user.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../utils/http";
import { successAlert,errorAlert } from '../../../utils/alert';
export default {
  props:['list'],
  data() {
    return {
    
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    del(uid){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reqManageDel(uid).then(res=>{
            if(res.data.code==200){
              successAlert('删除成功')
              this.$emit('init')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    edit(uid){
      this.$emit('edit',uid)
    }
  },
  mounted() {
    
  }
};
</script>

<style>
</style>