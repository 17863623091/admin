<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="uid" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>     
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" @click="edit(scope.row.uid)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqcateDel } from '../../../utils/http'
import { successAlert,errorAlert } from '../../../utils/alert';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "vip/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList"
    }),
    edit(uid){
        console.log(uid)
        this.$emit('edit',uid)
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>