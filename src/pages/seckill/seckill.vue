<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-form :info='info' ref='editDet'></v-form>
      <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vForm from './components/form'
import vList from './components/list'
export default {
    computed:{
        ...mapGetters({})
    },
    data(){
        return {
            info:{
                isShow:false,
                title:'添加秒杀活动'
            }
        }
    },
    methods:{
        ...mapActions({}),
        add(){
            this.info={
                isShow:true,
                title:'添加秒杀活动'
            }
        },
        edit(id){
            this.info={
                isShow:true,
                title:'编辑秒杀活动'
            }
            // 调用子组件的方法
            this.$refs.editDet.getOne(id)
        }
    },
    mounted(){
        
    },
    components:{
        vForm,
        vList
    }
}
</script>

<style>

</style>