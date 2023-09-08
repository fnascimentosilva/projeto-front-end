import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'
import Alunos from '../views/Alunos/CadastroNovoAluno.vue'
import Exercicios from '../views/Exercicios/GerenciamentoExercicios.vue'


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
{
  path: '/gerenciamento_exercicio',
  name: 'GerenciamentoExercicio',
  component: Exercicios
},
  ]
})

export default router
