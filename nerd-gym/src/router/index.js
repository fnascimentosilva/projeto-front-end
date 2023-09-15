import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Login from '../views/Login/Login.vue'
import Signup from '../views/Signup/Signup.vue'
import CadastroAlunos from '../views/Alunos/CadastroNovoAluno.vue'
import ListaAlunos from '../views/Alunos/ListagemAlunos.vue'
import GerenciamentoExercicios from '../views/Exercicios/GerenciamentoExercicios.vue'
import MontagemTreino from '../views/Exercicios/MontagemTreino.vue'
import VerTreinoAluno from '../views/Exercicios/VerTreinoAluno.vue'




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
  component: GerenciamentoExercicios
},
{
  path: '/aluno/:id/montagem_treino',
  name: 'MontagemTreino',
  component: MontagemTreino
},
{
  path: '/aluno/:name/visualizar_treino',
  name: 'VerTreino',
  component: VerTreinoAluno
},

  ]
})

export default router
