<template>
  <div>
    <el-button type="success" @click="add">添加</el-button>
    <v-form :info='info'></v-form>
    <v-list></v-list>
    
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
    }
  }

}
</script>

<style>

</style>