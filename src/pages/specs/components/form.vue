<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="specs">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="specs.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="80px" v-for='(item,index) in attrArr' :key='index'>
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" @click='addArr' v-if='index===0'>新增规格属性</el-button>
            <el-button type="danger" @click='del(index)' v-else>删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="specs.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <template>
          <el-button @click='cancel'>取 消</el-button>
          <el-button type="primary" @click="add" v-if='info.title=="添加规格"'>添加</el-button>
          <el-button type="primary" @click='update' v-else>修改</el-button>
        </template>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqspecsAdd,reqspecsDetail,reqspecsUpdate} from '../../../utils/http'
import { successAlert } from '../../../utils/alert';
import { mapActions, mapGetters } from 'vuex';
export default {
    computed:{
        ...mapGetters({})
    }, 
  props: ["info"],
  data() {
    return {
      specs: {
        specsname: "",
        attrs: "",
        status: 1
      },
      attrArr: [{ value: "" }]
    };
  },
  methods:{
      ...mapActions({
          reqList:"specs/reqList",
          reqTotal:'specs/reqTotal'
      }),
    //   取消
      cancel(){
          this.info.isShow = false
      },
        // 清空
      empty(){
          this.specs={
              specsname:"",
              attrs:"",
              status:1
          },
          this.attrArr=[{value:""}]
      },
    //   新增规格属性
      addArr(){
          this.attrArr.push({
              value:""
          })
      },
    //   删除属性
      del(index){
          this.attrArr.splice(index,1)
      },
      add(){
          console.log(this.attrArr)//[{value:'..'}, {value:'...'}]
        //   此时attrs是数组，后台需要字符串格式  map返回一个新的数组
          this.specs.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
          console.log(this.specs.attrs)//["200g","400g"]
          reqspecsAdd(this.specs).then(res=>{
              if(res.data.code == 200){
                  successAlert('添加成功')
                  this.empty()
                  this.cancel()
                  this.reqList()
                  this.reqTotal()
              }
          })
      },
      getOne(id){
          reqspecsDetail(id).then(res=>{
              this.specs = res.data.list[0]
              console.log(this.specs)
              // this.attrArr = JSON.parse(this.specs.attrs).map(item=>{
              //   return {value:item}
              // })
              this.attrArr = JSON.parse(this.specs.attrs).map(item=>({value:item}))
              console.log(this.attrArr)
          })
      },
    //   修改
    update(){
        this.specs.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
        reqspecsUpdate(this.specs).then(res=>{
          if(res.data.code==200){
            successAlert('修改成功')
            this.empty()
            this.cancel()
            this.reqList()
          }
        })
    },
    closed(){
      if(this.info.title=='编辑规格'){
        this.empty()
      }
    }
  }
};
</script>

<style scoped>
.line{
    display:flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>