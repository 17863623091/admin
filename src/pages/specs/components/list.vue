<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="scope">
            <el-tag type="success" v-for='item in scope.row.attrs' :key='item'>{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
          <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button type="success" @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger" @click='del(scope.row.id)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {reqspecsDel} from '../../../utils/http'
import { successAlert,errorAlert } from '../../../utils/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list"
      //   size: "specs/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList"
    }),
    // 删除
    del(id){
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          reqspecsDel(id).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              successAlert('删除成功')
              this.reqList()
            }else{
                errorAlert(res.data.msg)
            }   
          })      
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑
    edit(id){
        // 通知父组件
        this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style>
</style>