<template>
  <v-card class="mx-auto" :width="720">
    <div class="d-flex align-center">
      <v-icon>mdi-arm-flex</v-icon>
      <h1>Treino</h1>{{student_id}}
    </div>

    <v-form ref="form" @submit="handleCreateTreino" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="6" md="4">
            <v-select
              v-model="diaSelecionado"
              :items="diaDaSemana"
              label="Selecione um dia da semana"
              :rules="diaDaSemanaRules"
            ></v-select>
          </v-col>

          <v-col cols="6" md="4">
            <v-select
              v-model="exercicioSelecionado"
              item-title="description"
              item-value="id"
              :items="exercicios"
              label="Escolha o exercício"
              :rules="exercicioRules"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" md="4">
            <v-text-field
              v-model="repeticoes"
              label="Repetições"
              :rules="repetiçõesRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="4" md="4">
            <v-text-field v-model="peso" label="Peso" :rules="pesoRules" required></v-text-field>
            {{repeticoes}}
          </v-col>
          <v-col cols="4" md="4">
            <v-text-field
              v-model="descanso"
              label="Descanso"
              :rules="descansoRules"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-textarea v-model="observacoes" label="Observações"></v-textarea>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions class="d-flex justify-end">
        <v-btn class="mt-2" variant="tonal" color="purple">Cancelar</v-btn>
        <v-btn type="submit" class="mt-2" variant="tonal" color="purple">Cadastrar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      diaDaSemana: [
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado',
        'domingo'
      ],
      diaSelecionado: '',
      exercicios: [],
      exercicioSelecionado: '',
      repeticoes:"",
      student_id: this.$route.params.id,
    }
  },
  mounted() {
    this.carregarExercicios()
  },

  methods: {
    carregarExercicios() {
      axios({
        url: 'http://localhost:3000/exercises',
        method: 'GET'
      })
        .then((response) => {
          this.exercicios = response.data
        })
        .catch(() => {
          alert('Exercícios não podem ser carregados')
        })
    }
  },

  computed:{
    repetiçõesRules() {
      return [
        (v) => !!v || 'Precisa fazer no mínimo uma repetição'
        ]
    },
  }
}
</script>