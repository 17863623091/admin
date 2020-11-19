<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="seckill">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="120px">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-switch v-model="list.status" :active-value="1" :inactive-value="2"></el-switch> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({
            list:'seckill/list'
        })
    },
    data(){
        return {
            seckill:{
                title:'',
                begintime:'',
                endtime:'',
                first_cateid:'',
                second_cateid:'',
                goodsid:'',
                status:1
            }
        }
    },
    methods:{
        ...mapActions({
            reqList:'seckill/reqList'
        })
    }
};
</script>

<style>
</style>