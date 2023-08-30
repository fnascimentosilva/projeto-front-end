import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
  },
  {
      path: '/cadastro',
      name: 'Signup',
      component: Signup
  },
  {
      path: '/home',
      name: 'Home',
      component: Home
  },
  ]
})

export default router
