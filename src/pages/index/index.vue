<template>
  <div>
    <el-container class="wrap">
      <el-aside width="200px">
        <!-- default-active  当前激活的菜单的index -->
        <!-- active-text-color 当前激活菜单的文字颜色 -->
        <!--  -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for='item in user.menus' :key='item.id'>
            <!--  数据库需要的是一个字符串类型+"" 字符串拼接，使得id变成字符串类型-->
            <el-submenu :index="item.id+''" v-if='item.children'>
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for='list in item.children' :key='list.id' :index="list.url" >{{list.title}}</el-menu-item>
                <!-- <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manage">管理员管理</el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>
          </div>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/vip">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{user.username}}</span>
          <el-button type="primary" @click='out'>退出</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb separator='/' v-if="$route.name" class="top">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    ...mapActions({
      changeUser:'changeUser'
    }),
    out(){
      // 给vuex中的传一个空对象，当退出的时候将用户的信息清空
      this.changeUser({})
      // 路由重定向 ，跳转到登录页面
      this.$router.push('/login')
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
}

.el-aside {
  background-color: #20222a;
}
.wrap {
  height: 100vh;
}
.top {
  padding-bottom: 10px;
}
</style>