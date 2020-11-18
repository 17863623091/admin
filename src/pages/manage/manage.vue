<template>
  <div>
    <el-button type="success" style="margin-top:10px" @click="willAdd">添加</el-button>
    <v-form :info="info" @init="newInit" ref="form" :list="list"></v-form>
    <v-list :list="list" @init="newInit" @edit="edit($event)"></v-list>

    <el-pagination background layout="prev, pager, next" :total="total" :page-size='size' @current-change='changePage'></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form.vue";
import vList from "./components/list.vue";
import { reqManageList,reqManageTotal } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加管理"
      },
      list: [],
      page: 1,
      size: 3,
      // 总数
      total: 0
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info = {
        isShow: true,
        title: "添加管理"
      };
    },
    init() {
      reqManageList({ size: this.size, page: this.page }).then(res => {
        // this.list = res.data.list;
        // 分页进入到第一页之后，将数据全部删除，置为空，获取不到数据会报错，因此当数据没有的时候，赋值一个空
        let list = res.data.list?res.data.list:[]
        if(list.length===0&&this.page>1){
            this.page--;
            this.newInit()
            return
        }
        this.list=list
      });
    },
    edit(uid) {
      this.info = {
        isShow: true,
        title: "编辑管理"
      };
      this.$refs.form.getOneManage(uid);
    },
    // 获取总数
    getTotal(){
        reqManageTotal().then(res=>{
            this.total = res.data.list[0].total
        })
    },
    // 当页码发生改变的时候
    changePage(page){
        // 将当前页赋值给page
        this.page=page;
        // 请求当前页的数据
        this.init()
    },
    newInit(){
        this.init()
        this.getTotal()
    }
  },
  mounted() {
    this.init();
    this.getTotal()
  },
  components: {
    vForm,
    vList
  }
};
</script>

<style>
</style>