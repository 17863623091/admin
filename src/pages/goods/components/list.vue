<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children'}"
    >
      <el-table-column
        prop="id"
        label="商品编号"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        width="140px"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        width="100px"
      ></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" class="img" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew === 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="100px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot === 1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="110px">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="primary" disabled v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="warning" @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :page-size='size' :total="total" @current-change='changePage'></el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../utils/alert';
import { reqgoodsDel } from "../../../utils/http";

export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      total:'goods/total',
      size:'goods/size'
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
      changePage:'goods/changePage'
    }),
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqgoodsDel(id).then(res=>{
            if(res.data.code==200){
              successAlert('删除成功')
              this.reqList()
              // 删除后重新请求一下总数
              this.reqTotal()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      // 通知父组件
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.reqList();
    this.reqTotal();
  },
};
</script>

<style scoped>
.img {
  width: 100px;
  height: 100px;
}
</style>