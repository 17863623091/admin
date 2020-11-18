<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="180px">
          <el-select v-model="goods.first_cateid" placeholder="请选择"  @change='changeFirst'>
            <el-option :label="item.catename" :value="item.id" v-for="item in cateList" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="180px">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option :label="item.catename" :value="item.id" v-for='item in reqsecondList' :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="180px">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="180px">
          <el-input v-model="goods.price" autocomplete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="180px">
          <el-input v-model="goods.market_price" autocomplete="off" placeholder="请输入市场价格"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="180px">
          <div class="imgFile">
            <h3>+</h3>
            <img :src="imgUrl" alt="" v-if='imgUrl' />
            <input type="file" name="" class="inp" @change='selectFile' />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="180px">
          <el-select v-model="goods.goodsname" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="180px">
          <el-select v-model="goods.goodsname" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="180px">
          <el-radio v-model="goods.isnew" label="1">是</el-radio>
          <el-radio v-model="goods.isnew" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="180px">
          <el-radio v-model="goods.ishot" label="1">是</el-radio>
          <el-radio v-model="goods.ishot" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="180px">
          <template>
            <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
          </template>
        </el-form-item>
        <el-form-item label="描述" label-width="180px">
          <template>
            <textarea name="" id="" cols="30" rows="10" v-model="goods.description"></textarea>
          </template>
        </el-form-item>   
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {reqcateList} from '../../../utils/http'
export default {
  computed:{
    ...mapGetters({
      cateList:'cate/list'
    })
  },
  props:['info'],
  data() {
    return {
      // 规则
      rules:{

      },
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl:'',
      // 初始化二级分类
      reqsecondList:[]
    };
  },
  methods:{
    ...mapActions({
      reqcatelist:'cate/reqList'
    }),
    // 根据一级分类获取二级分类
    changeFirst(){
      this.goods.second_cateid = ''
      reqcateList({pid:this.goods.first_cateid}).then(res=>{
        // console.log(res)
        this.reqsecondList = res.data.list
      })
    },
    cancel(){
      this.info.isShow = false;
    },
    empty(){
      this.goods={
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        // 设置成[],后端需要"[]"字符串数组
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      imgUrl='';
      // 初始化二级分类
      reqsecondList=[]
    },
    // 处理图片
    selectFile(e){
      // console.log(e)
      // 将获取到的文件保存下来
      let file = e.target.files[0]
      this.goods.imgUrl = URL.createObjectURL(file)
      this.goods.img = file
      
    },
    add(){

    },
    update(){

    }
  },
  mounted(){
    this.reqcatelist()
  }
};
</script>

<style scoped>
.imgFile {
  width: 100px;
  height: 100px;
  border: 1px dashed skyblue;
  text-align: center;
  line-height: 100px;
  position: relative;
}
.imgFile h3 {
  font-size: 30px;
  font-weight: 100;
}
.imgFile img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
.inp {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
</style>