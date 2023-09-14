<template>
  <v-card class="mx-auto" :width="720">
    <div class="d-flex align-center">
      <v-icon>mdi-arm-flex</v-icon>
      <h1>Exercícios</h1>
    </div>
    <hr />
    <v-form ref="form" @submit.prevent="handleCreateExercise" variant="outlined">
      <v-container>
        <v-row class="d-flex align-center ">
          <v-col cols="8" md="">
            <v-text-field
              v-model="nomeExercicio"
              label="Digite o nome do exercicio"
              :rules="nomeExercicioRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="3">
            <v-btn type="submit"  class="mb-5" variant="tonal" color="purple">Cadastrar</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-table>
      <t-head>
        <th>Nome</th>
      </t-head>
      <tbody>
        <tr v-for="exercicio in exercicios" :key="exercicio.id" width="400">
          <td>{{ exercicio.description }}</td>
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
      nomeExercicio: '',
      exercicios: [],
    }
  },
  mounted() {
    this.loadExercicios()
  },

  methods: {
    async handleCreateExercise() {
     const { valid } = await this.$refs.form.validate()

    if (valid) {
    axios({
      url: 'http://localhost:3000/exercises',
      method: 'POST',
      data: {
        description: this.nomeExercicio
      }
    })
      .then(() => {
        alert('Cadastrado com sucesso')
        this.$router.push('/gerenciamento_exercicio')
      })
      .catch((error) => {
        console.log(error)
        /* if (error.response?.data?.message) {
            alert(error.response.data.message)
          } else {
            alert('Não foi possível cadastrar o exercício')
          } */
      })
     } else {
      alert('Preencha os campos obrigatórios!')
    }
  },

    loadExercicios() {
      axios({
        url: 'http://localhost:3000/exercises',
        method: 'GET'
      })
        .then((response) => {
          this.exercicios = response.data
        })
        .catch(() => {
          alert('Não há exerícios cadastrados')
        })
    }
  },

 
  computed: {
    nomeExercicioRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    }
  }
}
</script>

<style scoped>
</style>
