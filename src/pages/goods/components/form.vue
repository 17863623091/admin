<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened='opened' @closed='closed'>
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="110px">
          <el-select v-model="goods.first_cateid" placeholder="请选择"  @change='changeFirst'>
            <el-option :label="item.catename" :value="item.id" v-for="item in cateList" :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="110px">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option :label="item.catename" :value="item.id" v-for='item in reqsecondList' :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="110px">
          <el-input v-model="goods.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="110px">
          <el-input v-model="goods.price" autocomplete="off" placeholder="请输入价格"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="110px">
          <el-input v-model="goods.market_price" autocomplete="off" placeholder="请输入市场价格"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="110px">
          <div class="imgFile">
            <h3>+</h3>
            <img :src="imgUrl" alt="" v-if='imgUrl' />
            <input type="file" class="inp" @change='selectFile' />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="110px">
          <el-select v-model="goods.specsid" placeholder="请选择"  @change='changeAttrs'>
            <el-option :label="item.specsname" :value="item.id" v-for='item in specsList' :key='item.id'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="110px">
          <el-select v-model="goods.specsattr" placeholder="请选择" multiple>
            <el-option v-for='item in specsAttrs' :key='item'  :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="110px">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="110px">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" label-width="110px">
          <template>
            <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
          </template>
        </el-form-item>
        <el-form-item label="描述" label-width="110px">
            <div id='box' v-if='info.isShow'></div>
        </el-form-item>   
      </el-form>
      {{goods}}
      <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if='info.title=="添加商品"'>添加</el-button>
          <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { successAlert } from '../../../utils/alert';
import {reqcateList,reqgoodsAdd,reqgoodsDetail,reqgoodsUpdate} from '../../../utils/http'

// 引入富文本编辑器
import E from 'wangeditor'

export default {
  computed:{
    ...mapGetters({
      cateList:'cate/list',
      specsList:'specs/list'
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
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl:'',
      // 初始化二级分类
      reqsecondList:[],
      // 初始化规格属性
      specsAttrs:[]
    };
  },
  methods:{
    ...mapActions({
      reqcatelist:'cate/reqList',
      reqspecslist:'specs/reqList',
      reqgoodslist:'goods/reqList',
      reqgoodsTotal:'goods/reqTotal'
    }),
    // 根据一级分类获取二级分类
    changeFirst(){
      // 因为每转换一次一级分类，二级分类就会发生变化，因此首先要将二级分类的id置空
      this.goods.second_cateid = ''
      this.getSecondscate()
    },
    getSecondscate(){
      reqcateList({pid:this.goods.first_cateid}).then(res=>{
        // console.log(res)
        // 二级分类
        this.reqsecondList = res.data.list
        console.log(this.reqsecondList)
      })
    },
     // 获取规格属性
    getAttrs(){
      // let obj = this.specsList.find((item)=>{
      //   console.log(item.id)
      //   console.log(this.goods.specsid)
      //   return item.id===this.goods.specsid
      //   })
      let obj = this.specsList.find(item=>item.id===this.goods.specsid)
      this.specsAttrs = obj.attrs
      // console.log(this.specsList)     
    },
    // 根据商品规格请求其属性
    changeAttrs(){
      // 将规格属性数组置空
      this.goods.specsattr = []
      this.getAttrs()
      
    },
    // 弹框打开的时候，创建富文本编辑器
    opened(){
      this.editor = new E("#box")
      this.editor.create()
      // 将商品描述赋值给富文本编辑器
      this.editor.txt.html(this.goods.description)
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
      this.imgUrl='';
      // 初始化二级分类
      this.reqsecondList=[];
      this.specsAttrs=[]
    },
    // 处理图片
    selectFile(e){
      // console.log(e)
      // 将获取到的文件保存下来
      let file = e.target.files[0]
      this.imgUrl = URL.createObjectURL(file)
      this.goods.img = file
      
    },
    // 添加
    add(){
      // 取出富文本编辑器中的内容
      this.goods.description = this.editor.txt.html()
      // 将规格属性转成后台需要的格式
      // this.goods.specsattr = JSON.stringify(this.goods.specsattr)
      // console.log(this.goods)

      let d = { ...this.goods };
      d.specsattr = JSON.stringify(d.specsattr);
      console.log(d)
      
      reqgoodsAdd(d).then(res=>{
        if(res.data.code==200){
          console.log(res)
          successAlert('添加成功')
          this.cancel()
          this.empty();
          this.reqgoodslist();
          this.reqgoodsTotal()
        }
      })
    },
    // 获取一条信息
    getOne(id){
      reqgoodsDetail(id).then(res=>{
        this.goods = res.data.list
        this.goods.id = id
        this.imgUrl = this.$imgPre + this.goods.img
        // 重新请求二级分类
        this.getSecondscate()
        // 将商品规格属性转成数组格式，因为在数据库获取到的是字符串数组，无法遍历
        this.goods.specsattr = JSON.parse(this.goods.specsattr)
        // 重新获取商品规格属性
        this.getAttrs()
        // 为处理bug  套娃现象  给富文本编辑器赋值
        if(this.editor){
          this.editor.txt.html(this.goods.description)
        }

      })
    },
    update(){
      this.goods.description = this.editor.txt.html()
      let d = {...this.goods}
      d.specsattr = JSON.stringify(d.specsattr)
      reqgoodsUpdate(d).then(res=>{
        if(res.data.code==200){
          successAlert('修改成功')
          this.reqgoodslist()
          this.empty()
          this.cancel()
        }
      })
    },
    closed(){
      if(this.info,title == '编辑商品'){
        this.empty()
      }
    }
  },
  mounted(){
    // 一进来就请求商品分类列表
    this.reqcatelist()
    // 一进来就请求商品规格列表
    //如果请求商品规格数据没有传page和size，就会获取到所有的商品规格
    this.reqspecslist(true)
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