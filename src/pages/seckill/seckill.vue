<template>
  <div>
      <el-button type="primary" @click="add">添加</el-button>
      <v-form :info='info'></v-form>
      <v-list></v-list>
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
                isShow:true,
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