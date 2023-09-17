<template>
  <v-sheet width="350" class="mx-auto">
    <v-card>
      <v-form ref="form" @submit.prevent="handleLogin">
        <v-text-field   v-model="email" label="Digite o email" :rules="emailRules"
        placeholder="example@email.com"
          type="email"></v-text-field>

        <v-text-field
          v-model="password"
          label="Digite a senha"
          :rules="passwordRules"
          
        ></v-text-field>

        <v-btn type="submit" block variant="tonal"  color="purple" class="mt-2">Login</v-btn>

        <p class="mt-6">
          Ainda não tem conta?<router-link to="/cadastro">Cadastre-se</router-link>
        </p>
      </v-form>
    </v-card>
  </v-sheet>

  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',

      errorInputEmail: '',
      errorInputPassword: ''
    }
  },
  methods: {
   async handleLogin() {
     
      const { valid } = await this.$refs.form.validate()

      if (valid)
      
      
      {
        axios({
          url: 'http://localhost:3000/sessions',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        })
          .then((response) => {
            localStorage.setItem('gym_token', response.data.token)
            localStorage.setItem('gym_name', response.data.name)

            this.$router.push('/dashboard')
            console.log('logado com sucesso')
          })
          .catch(() => {
            alert('Falha ao realizar login')
          })
      }
    },
    outroMetodo() {}
  },

  computed: {
    emailRules() {
      return [
        (v) => !!v || 'Campo é obrigatório',
        (v) => /.+@.+\..+/.test(v) || 'Email deve ser válido'
      ]
    },

    passwordRules() {
      return [
        (v) => !!v || 'Campo é obrigatório',
        (v) => (v && v.length >= 8) || 'O CEP deve ter no mínimo 8 dígitos.'
      ]
    }
  }
}
</script>

