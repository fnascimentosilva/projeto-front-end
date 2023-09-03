import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'
import Alunos from '../views/Alunos/CadastroNovoAluno.vue'


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
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
  },
  {
    path: '/cadastroAluno',
    name: 'CadastroAluno',
    component: Alunos
},
  ]
})

export default router
