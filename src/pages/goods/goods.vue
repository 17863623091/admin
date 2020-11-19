<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <v-form :info='info' ref='form'></v-form>
    <v-list @edit='edit'></v-list>
    
  </div>
</template>

<script>
import vForm from './components/form'
import vList from './components/list'
export default {
  data(){
    return{
      info:{
        isShow:false,
        title:'添加商品'
      }
    }
  },
  components:{
    vForm,
    vList
  },
  methods:{
    add(){
      this.info={
        isShow:true,
        title:"添加商品"
      }
    },
    edit(id){
      this.info={
        isShow:true,
        title:'编辑商品'
      };
      //调用子组件的方法
      this.$refs.form.getOne(id)
    }
  }

}
</script>

<style>

</style>