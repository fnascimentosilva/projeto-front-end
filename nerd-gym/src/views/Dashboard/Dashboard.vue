<template>
  <div class="bem-vindo mb-9" >
    <h1>Seja bem vindo, {{ user_name }}</h1>
  </div>

<div class="card-principal d-flex justify-space-between">
  <v-card
    
    :width="240"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1" >
          {{info_alunos.amount_students }} Alunos
        </div>
        
      </div>
    </v-card-item>

    <v-card-actions>
      <router-link to="/cadastroAluno">
      <v-btn variant="tonal" color="purple">
        Adicionar
      </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
  <v-card
    
    :width="240"
    variant="outlined"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{info_alunos.amount_exercises }} Exercícios
        </div>
        
      </div>
    </v-card-item>

    <v-card-actions>
      <v-btn variant="tonal" color="purple">
        Adicionar
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
  <v-icon>mdi-account-multiple</v-icon>
</template>

<script>
const nome = localStorage.getItem('gym_name')

import axios from 'axios'

export default {
  data() {
    return {
      user_name: nome,
      info_alunos:[]

    }
  },

  mounted() {
    axios.get('http://localhost:3000/dashboard')
    .then(res => this.info_alunos = res.data)
    .catch(erro => console.log(erro))
  }
}
</script>