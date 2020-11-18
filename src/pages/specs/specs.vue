<template>
  <div>
    <el-button type="primary" @click="add" class='btn'>添加</el-button>
    <v-form :info="info" ref='form'></v-form>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form.vue";
import vList from "./components/list.vue";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加规格"
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    add() {
        this.info={
            isShow:true,
            title:'添加规格'
        }
    },
    //编辑
    edit(id){
        this.info={
            isShow:true,
            title:'编辑规格'
        },
        this.$refs.form.getOne(id)
    }
  },
  mounted() {},
  components: {
    vForm,
    vList
  }
};
</script>

<style scoped>
.btn{
    margin-bottom: 10px;
}
</style>