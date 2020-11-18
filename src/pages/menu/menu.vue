<template>
  <div>
    <el-button type="primary" class="btn" @click="add()">添加</el-button>
    <v-from :info="info" :list="list" @init="init" ref="form"></v-from>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vFrom from "./components/form.vue";
import vList from "./components/list.vue";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加菜单"
      },
      list: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    add() {
      this.info.isShow = true;
      this.info.title = "添加菜单";
    },
    init() {
      reqMenuList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id) {
      this.info.isShow = true;
      this.info.title = "编辑菜单";
      this.$refs.form.getOneData(id);
    }
  },
  mounted() {
    this.init();
  },
  components: {
    vFrom,
    vList
  }
};
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
</style>