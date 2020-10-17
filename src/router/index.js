import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Category from '../views/category'
import Detail from '../views/detail'
import Shopcart from '../views/shopcart'
import Order from '../views/order'
import Undeveloped from '../views/undeveloped'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/item.href',
    name: 'Undeveloped',
    component: Undeveloped
  },
  {
    path: '/category/:id?', // 问号表示id值可以传，或者不传
    name: 'Category',
    component: Category,
    meta: {
      title: 'Category',
      keepAlive: true
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/shopcart',
    name: 'Shopcart',
    component: Shopcart
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

export default router
