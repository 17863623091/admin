<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="商品编号" width="100px"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="140px"></el-table-column>
      <el-table-column prop="price" label="价格" width="100px"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="100px"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" class='img'>
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot===1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="110px">
        <template slot-scope="scope">
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template>
          <el-button type="warning">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqList:'goods/reqList'
    }),
  },
  mounted(){
    this.reqList()
  }
};
</script>

<style scoped>
.img{
  width: 100px;
  height: 100px;
}
</style>