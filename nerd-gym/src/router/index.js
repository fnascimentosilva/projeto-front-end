import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'
import CadastroAlunos from '../views/Alunos/CadastroNovoAluno.vue'
import ListaAlunos from '../views/Alunos/ListagemAlunos.vue'
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
    path: '/listaDeAlunos',
    name: 'ListaDeAluno',
    component: ListaAlunos
},
  {
    path: '/cadastroAluno',
    name: 'CadastroAluno',
    component: CadastroAlunos
},
{
  path: '/gerenciamento_exercicio',
  name: 'GerenciamentoExercicio',
  component: Exercicios
},

  ]
})

export default router
