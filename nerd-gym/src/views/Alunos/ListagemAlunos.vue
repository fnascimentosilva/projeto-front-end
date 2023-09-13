<template>
  <v-card class="mx-auto" :width="720">
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-icon>mdi-account-multiple</v-icon>
        <h1>Alunos</h1>
      </div>
      <v-col cols="2">
        <router-link to="/cadastroAluno">
          <v-btn type="submit" block class="mt-2" variant="tonal" color="purple">+ Novo</v-btn>
        </router-link>
      </v-col>
    </div>
    <hr />

    <v-container>
      <v-row class="d-flex justify-space-between">
        <v-col cols="8" md="">
          <v-text-field
            v-model="aluno"
            label="Digite o nome do aluno"
            :rules="nomeExercicioRules"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="2">
          <v-btn @click="buscarAluno()" block class="mt-2" variant="tonal" color="purple"
            >Buscar</v-btn
          >
        </v-col>
      </v-row>
    </v-container>

    <v-table>
      <thead>
        <tr>
          <th class="text-center">Alunos</th>
          <th class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aluno in listaAlunos" :key="aluno.id">
          <td>{{ aluno.name }}</td>
          <td class="d-flex justify-space-evenly">
            <v-btn @click="() => montraTreino(aluno.id)" class="mt-2" variant="tonal" color="purple"
              >+TREINO</v-btn
            >

            <router-link to="/cadastroAluno">
              <v-btn type="submit" block class="mt-2" variant="tonal" color="purple">VER</v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      aluno: '',
      listaAlunos: []
    }
  },
  mounted() {
    this.loadAlunos()
  },

  watch: {
    aluno() {
      if (this.aluno.length === 0) this.loadAlunos()
    }
  },

  methods: {
    loadAlunos() {
      axios({
        url: 'http://localhost:3000/students',
        method: 'GET'
      })
        .then((response) => {
          console.log(response.data)
          this.listaAlunos = response.data.students
        })
        .catch(() => {
          alert('Não há alunos cadastrados')
        })
    },

    buscarAluno() {
      const campoPesquisa = this.aluno
      this.listaAlunos = this.listaAlunos.filter((item) => item.name.includes(campoPesquisa))
    },

    montraTreino(id) {
      this.$router.push(`/aluno/${id}/montagem_treino/`)
    },
  }
}
</script>