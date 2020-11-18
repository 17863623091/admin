<template>
  <div>
    <v-form :info="info" ref='form'></v-form>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form.vue";
import vList from "./components/list.vue";
// import { reqcateList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加分类"
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    edit(id){
        this.info={
            isShow:true,
            title:'编辑会员'
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

<style>
</style>