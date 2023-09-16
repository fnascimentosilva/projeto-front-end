<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="segunda">Segunda</v-tab>
      <v-tab value="terca">Terça</v-tab>
      <v-tab value="quarta">Quarta</v-tab>
      <v-tab value="quinta">Quinta</v-tab>
      <v-tab value="sexta">Sexta</v-tab>
      <v-tab value="sabado">Sabado</v-tab>
      <v-tab value="domingo">Domingo</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item v-for="treino in listaTreinos" :key="treino.id" value="segunda">
          {{ treino.exercise_description }} | {{ treino.weight }} | {{ treino.repetitions }} |
          {{ treino.break_time }}
        </v-window-item>

        <v-window-item value="terca"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

 
 <script>
import axios from 'axios'

export default {
  data() {
    return {
      studentId: this.$route.params.id,
      listaTreinos: [],
      
      tab: null
    }
  },

  mounted() {
    this.loadWorkout()
  },

  methods: {
    loadWorkout() {
      axios({
        url: `http://localhost:3000/workouts?student_id=${this.studentId}`,
        method: 'GET'
      })
        .then((response) => {
          this.listaTreinos = response.data.workouts

          
        })
        .catch(() => {
          alert('Não foi possível acessar a lista de exercícios.')
        })
    },

    verTreino() {
      const campoPesquisa = this.tab
      this.listaTreinos = this.listaTreinos.filter((item) => item.day.includes(campoPesquisa))
    }
  }
}
</script>