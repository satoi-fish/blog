import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/home/Home')
const Login = () => import('../views/login/Login')
const Register = () => import('../views/login/Register')
const Detail = () => import('../views/detail/Detail')
const backstage = () => import('../views/backstage/Backstage')
const info = () => import('../views/info/Info')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/backstage',
    component: backstage
  },
  {
    path: '/info',
    component: info
  },
  
]

const router = new VueRouter({
  routes,
  mode:'history',
  scrollBehavior(to,from,savedPosition){
    return { x: 0 , y: 0 }
  }
})

export default router
