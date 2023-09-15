<template>
  <v-card class="mx-auto" :width="720">
    <div class="d-flex align-center">
      <v-icon>mdi-arm-flex</v-icon>
      <h1>Treino</h1>
      {{ student_id }}
    </div>

    <v-form ref="form" @submit.prevent="cadastrarTreino" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="6" md="4">
            <v-select
              v-model="diaSelecionado"
              :items="diaDaSemana"
              item-title="text"
              item-value="value"
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
            <v-text-field
              type="number"
              v-model="peso"
              label="Peso em Kg"
              :rules="pesoRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4" md="4">
            <v-text-field
              type="number"
              v-model="descanso"
              label="Descanso em segundos"
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
        { text: 'Domingo', value: 'domingo' },
        { text: 'Segunda-feira', value: 'segunda' },
        { text: 'Terça-feira', value: 'terca' },
        { text: 'Quarta-feira', value: 'quarta' },
        { text: 'Quinta-feira', value: 'quinta' },
        { text: 'Sexta-feira', value: 'sexta' },
        { text: 'Sábado', value: 'sabado' }
      ],
      diaSelecionado: '',
      exercicios: [],
      exercicioSelecionado: '',
      repeticoes: '',
      peso: '',
      descanso: '',
      observacoes: '',
      student_id: this.$route.params.id,
      idExercicio: '',
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
    },

    async cadastrarTreino() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        console.log('entrei aqui');
        this.idExercicio = this.exercicioSelecionado
        axios({
          url: 'http://localhost:3000/workouts',
          method: 'POST',
          data: {
            student_id: this.student_id,
            exercise_id: this.idExercicio,
            repetitions: this.repeticoes,
            weight: this.peso,
            break_time: this.descanso,
            observations: this.observacoes,
            day: this.diaSelecionado
          }
        })
          .then(() => {
            alert('Cadastrado com sucesso')
            this.$router.push('/listaDeAlunos')
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        alert('Preencha os campos obrigatórios!')
      }
    }
  },

  computed: {
    repetiçõesRules() {
      return [(v) => (v !== null && v >= 1) || 'Precisa fazer no mínimo uma repetição']
    },

    pesoRules() {
      return [
        (v) => !!v || 'Preenchimento obrigatório',
        (v) => v >= 1 || 'Precisa fazer no mínimo uma repetição'
      ]
    },

    descansoRules() {
      return [
        (v) => !!v || 'Preenchimento obrigatório',
        (v) => v >= 30 || 'Descanso mínimo de 30 segundos'
      ]
    }
  }
}
</script>