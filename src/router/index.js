import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)


function checkedEnter(path,next) {
  console.log(store)
  if(store.state.user.menus_url.includes(path)){
    next()
  }else{
    next('/')
  }
}

export const routes = [
  {
    path: 'menu',
    component: () => import('../pages/menu/menu.vue'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      checkedEnter('/menu',next)
    }
  },
  {
    path: 'role',
    component: () => import('../pages/role/role.vue'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {

      checkedEnter('/role',next)
    }
  },
  {
    path: 'manage',
    component: () => import('../pages/manage/manage.vue'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      checkedEnter('/manage',next)
    }
  },
  {
    path: 'cate',
    component: () => import('../pages/cate/cate.vue'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      checkedEnter('/cate',next)
    }
  },
  {
    path: 'specs',
    component: () => import('../pages/specs/specs.vue'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      checkedEnter('/specs',next)
    }
  },
  {
    path: 'goods',
    component: () => import('../pages/goods/goods.vue'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      checkedEnter('/goods',next)
    }
  },
  {
    path: 'vip',
    component: () => import('../pages/vip/vip.vue'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      checkedEnter('/vip',next)
    }
  },
  {
    path: 'banner',
    component: () => import('../pages/banner/banner.vue'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      checkedEnter('/banner',next)
    }
  },
  {
    path: 'seckill',
    component: () => import('../pages/seckill/seckill.vue'),
    name: '秒杀活动',
    beforeEnter: (to, from, next) => {
      checkedEnter('/seckill',next)
    }
  }
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/',
      component: () => import('../pages/index/index.vue'),
      children: [
        { path: '', component: () => import('../pages/home/home.vue') },
        // 做路由数组拼接
        ...routes
      ]
    }

  ]
})


// 登录拦截
router.beforeEach((to, from, next) => {
  console.log(to)
  // 查看访问的是否是登录页，如果是就继续往下执行
  if (to.path == '/login') {
    next()
    return
  }

  // 在仓库中取出token，看是否存在
  if (store.state.user.token) {
    next()
    return
  }
  next('/login')
})


export default router