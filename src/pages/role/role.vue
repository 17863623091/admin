<template>
  <div>
    <el-button type="primary" class="btn" @click="add()">添加</el-button>
    <v-form :info="info" @init="init" ref='user'></v-form>
    <v-list :list="list" @init="init" :info="info" @edit="edit"></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleList } from "../../utils/http";
import vForm from "./components/form.vue";
import vList from "./components/list.vue";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加角色"
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
      this.info = {
        isShow: true,
        title: "添加角色"
      };
    },
    init() {
      reqRoleList().then(res => {
        this.list = res.data.list;
      });
    },
    // 编辑
    edit(id) {
      this.info = {
        isShow: true,
        title: "编辑角色"
      };
      this.$refs.user.getOneRole(id)
    }
  },
  mounted() {
    this.init();
  },
  components: {
    vForm,
    vList
  }
};
</script>

<style>
</style>