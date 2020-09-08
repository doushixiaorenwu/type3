import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/views/Login/login.vue')
const Home = () => import('@/views/Home/home.vue')
const Hello = () => import('@/views/Home/children/hello.vue')
const User = () => import('@/views/User/user.vue')
const Roles = () => import('../views/Power/roles.vue')
const Rights = () => import('../views/Power/right.vue')
const Categories = () => import('../views/Goods/Categories/Categories.vue')
const Params = () => import('../views/Goods/Params/params.vue')
const Goods = () => import('../views/Goods/goods/goods.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/hello',
    children: [
      {
        path: '/hello',
        component: Hello
      },
      {
        path: '/users',
        component: User
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      },
      {
        path: '/categories',
        component: Categories
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: Goods
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, f, next) => {
  if (to.path === '/login') return next()
  const token = sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})
export default router
