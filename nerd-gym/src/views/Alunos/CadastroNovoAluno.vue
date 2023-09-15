<template>
  <v-card class="mx-auto" :width="720">
    <div class="d-flex align-center">
      <v-icon>mdi-account-multiple</v-icon>
      <h1>Alunos</h1>
    </div>
    <v-form ref="form" @submit="handleCreateAccount" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="6" md="4">
            <v-text-field
              v-model="nomeCompleto"
              label="Nome Completo"
              :rules="nomeRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="6" md="4">
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              placeholder="example@email.com"
              type="email"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" md="4">
            <v-text-field
              v-model="contato"
              label="Contato"
              :rules="contatoRules"
              placeholder="(99) - 999999999"
              type="phone"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-text-field
              v-model="date_birth"
              label="Data de Nascimento"
              type="date"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <hr cols="12" />

      <v-container>
        <v-row>
          <v-col cols="3" md="4">
            <v-text-field v-model="cep" label="Cep" :rules="cepRules"></v-text-field>
          </v-col>

          <v-col cols="7" md="4">
            <v-text-field
              v-model="logradouro"
              label="Logradouro"
              :rules="logradouroRules"
            ></v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field v-model="numero" label="Número" :rules="numeroRules"></v-text-field>
          </v-col>

          <v-col cols="2" md="4">
            <v-select
              v-model="uf"
              label="UF"
              :rules="ufRules"
              :items="[
                'AC',
                'AL',
                'AP',
                'AM',
                'BA',
                'CE',
                'DF',
                'ES',
                'GO',
                'MA',
                'MS',
                'MT',
                'MG',
                'PA',
                'PB',
                'PR',
                'PE',
                'PI',
                'RJ',
                'RN',
                'RS',
                'RO',
                'RR',
                'SC',
                'SP',
                'SE',
                'TO'
              ]"
            ></v-select>
          </v-col>
          <v-col cols="3" md="4">
            <v-text-field v-model="bairro" label="Bairro" :rules="bairroRules"></v-text-field>
          </v-col>
          <v-col cols="3" md="4">
            <v-text-field v-model="cidade" label="Cidade" :rules="cidadeRules"></v-text-field>
          </v-col>
          <v-col cols="4" md="4">
            <v-text-field v-model="complemento" label="Complemento"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-btn type="submit" block class="mt-2" variant="tonal" color="purple">Cadastrar</v-btn>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      nomeCompleto: '',
      email: '',
      contato: '',
      date_birth: '',
      cep: '',
      logradouro: '',
      numero: '',
      uf: '',
      bairro: '',
      cidade: '',
      complemento: '',
      endereco: {},

      errors: {}
    }
  },
  watch: {
    cep() {
      if (this.cep.length >= 8) this.viaCep()
    }
  },
  methods: {
    viaCep() {
      axios({
        url: `https://viacep.com.br/ws/${this.cep}/json/`,
        method: 'GET'
      })
        .then((response) => {
          this.endereco = response.data

          this.logradouro = this.endereco.logradouro
          this.cidade = this.endereco.localidade
          this.bairro = this.endereco.bairro
          this.uf = this.endereco.uf
        })
        .catch(() => {
          console.log('dados nao encontrados')
        })
    },

    async handleCreateAccount() {
      /* if(this.$refs.form.validate()){ */
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        
        axios({
          url: 'http://localhost:3000/students',
          method: 'POST',
          data: {
            name: this.nomeCompleto,
            email: this.email,
            contact: this.contato,
            date_birth: this.date_birth,
            cep: this.cep,
            street: this.logradouro,
            number: this.numero,
            neighborhood: this.bairro,
            city: this.cidade,
            province: this.uf,
            complement: this.complemento
          }
        })
          .then((response) => {
            localStorage.setItem("student_name", response.data.name)
            alert('Cadastrado com sucesso')
            this.$router.push('/cadastroAluno')
          })
          .catch((error) => {
            console.log(error)
            if (error.response?.data?.message) {
              alert(error.response.data.message)
            } else {
              alert('Não foi possível criar a conta nesse momento')
            }
          })
      } else {
        alert('Preencha os campos obrigatórios!')
      }
    }
  },

  computed: {
    nomeRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    },
    emailRules() {
      return [(v) => /.+@.+\..+/.test(v) || 'Email deve ser válido']
    },
    contatoRules() {
      return [
        (v) => !!v || 'Campo é obrigatório',
        (v) => /^\d{10}$/.test(v) || 'Telefone deve conter 10 dígitos'
      ]
    },
    cepRules() {
      return [
        (v) => !!v || 'Campo é obrigatório',
        (v) => (v && v.length >= 8) || 'O CEP deve ter no mínimo 8 dígitos.'
        ]
    },
    logradouroRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    },
    numeroRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    },
    ufRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    },
    bairroRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    },
    cidadeRules() {
      return [(v) => !!v || 'Campo é obrigatório']
    }
  }
}
</script>

<style scoped>
</style>
