<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed='closed'>
      <el-form :model="seckill">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="seckill.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            align="right"
            :start-placeholder="seckill.begintime+''"
            :end-placeholder="seckill.endtime+''"
            @change="changetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="timestamp"
          >
          </el-date-picker>
          {{ time }}
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            v-model="seckill.first_cateid"
            placeholder="请选择"
            @change="changeFirst"
          >
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cateList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select
            v-model="seckill.second_cateid"
            placeholder="请选择"
            @change="changeGoods"
          >
            <el-option
              :label="item.catename"
              :value="item.id"
              v-for="item in cateSecondArr"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="seckill.goodsid" placeholder="请选择">
            <el-option
              :label="item.goodsname"
              :value="item.id"
              v-for="item in goods"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="seckill.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      {{ seckill }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="add"
          v-if="info.title === '添加秒杀活动'"
          >添加</el-button
        >
        <el-button type="primary" @click='update' v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqsekillAdd,
  reqcateList,
  reqgoodsList,
  reqseckillDetail,
  reqseckillUpdate
} from "../../../utils/http";
import { errorAlert, successAlert } from "../../../utils/alert";
import Vue from 'vue'
Vue.filter('filterTime',(time)=>{
  let d = new Date(time)
  let year = d.getFullYear()
  let month = d.getMonth()+1
  let day = d.getDate()
  let h = d.getHours()
  let m = d.getMinutes()
  let s = d.getSeconds()
  return `${year}-${month}-${day} ${h}:${m}:${s}`
})

export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "seckill/list",
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  data() {
    return {
      seckill: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      time: [],
      // 初始化二级分类
      cateSecondArr: [],
      // 初始化商品
      goods: [],
    };
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList",
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
    }),
    // 每选择一个一级分类，二级分类就会发生变化
    changeFirst() {
      // 首先将二级分类id清空
      this.seckill.second_cateid = "";
      // 请求
      this.getSecondsId();
    },
    // 根据一级分类请求二级分类
    getSecondsId() {
      reqcateList({ pid: this.seckill.first_cateid }).then((res) => {
        // console.log(res)
        this.cateSecondArr = res.data.list;
      });
    },
    // 当二级分类发生变化的时候，商品也随之发生变化
    changeGoods() {
      // 首先将goodsid清空
      this.seckill.goodsid = "";
      // 做请求
      this.reqgoods();
    },
    // 请求商品
    reqgoods() {
      reqgoodsList({
        fid: this.seckill.first_cateid,
        sid: this.seckill.second_cateid,
      }).then((res) => {
        this.goods = res.data.list;
      });
    },
    changetime(val) {
      // console.log(val)
      this.seckill.begintime = val[0];
      this.seckill.endtime = val[1];
      // console.log(this.seckill)
    },
    empty() {
      this.seckill = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.cateSecondArr = [];
      this.goods = [];
    },
    add() {
      this.time = []
      reqsekillAdd(this.seckill).then((res) => {
        if (res.data.code == 200) {
          // 弹出成功提示
          successAlert("添加成功");
          console.log(1111);
          // 刷新列表
          this.reqList();
          // 清空
          this.empty();
          // 弹框消失
          this.cancel();
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    // 获取一条详情
    getOne(id) {
      reqseckillDetail(id).then((res) => {
        this.seckill = res.data.list;
        // 此时获取到的数据没有id，需要补id
        this.seckill.id = id;
        // 重新获取二级分类
        this.getSecondsId();
        // 重新获取商品
        this.reqgoods();
        // 处理时间
        console.log(typeof this.seckill.begintime);
        let tm1 = new Date(this.seckill.begintime);
        console.log(tm1)
        let tm2 = new Date(this.seckill.endtime);
      });
    },
    // 修改
    update(){
      reqseckillUpdate(this.seckill).then(res=>{
        if(res.data.code==200){
          successAlert('修改成功')
          // 刷新列表
          this.reqList()
          // 弹框消失
          this.cancel()
          // 清空
          this.empty()
        }
      })
    },
    cancel() {
      this.info.isShow = false;
    },
    closed(){
      if(this.info.title === '编辑秒杀活动'){
        // 清空表单
        this.empty()
        // 清空秒杀时间
        this.time=[]
      }
    }
  },
  mounted() {
    // 一进来就请求商品分类
    this.reqCateList();
  },
};
</script>

<style>
</style>