<template>
  <form @submit.prevent="handleCreateAccount" class="form-login">
    <v-icon
      size="large"
      color="blue-darken-2"
      icon="mdi-dumbbell"
    ></v-icon>
    <h2>Criar conta</h2>

    <div class="form-element">
      <label for="name">Nome Completo</label>
      <input
        class="form-input"
        type="text"
        id="name"
        v-model="name"
        :class="{ 'input-error': this.errors.name }"
      />
      <p class="texto-erro">{{ this.errors.name }}</p>
    </div>

    <div class="form-element">
      <label for="email">Email</label>
      <input
        class="form-input"
        type="text"
        id="email"
        v-model="email"
        :class="{ 'input-error': this.errors.email }"
      />
      <p class="texto-erro">{{ this.errors.email }}</p>
    </div>

    <div class="form-element">
      <label for="password">Senha</label>
      <input
        class="form-input"
        type="password"
        id="password"
        v-model="password"
        :class="{ 'input-error': this.errors.password }"
      />
      <p class="texto-erro">{{ this.errors.password }}</p>
    </div>

    <div class="form-element">
      <label for="confirmPassword">Confirma Senha</label>
      <input
        class="form-input"
        type="password"
        id="confirmPassword"
        v-model="confirmPassword"
        :class="{ 'input-error': this.errors.confirmPassword }"
      />
      <p class="texto-erro">{{ this.errors.confirmPassword }}</p>
    </div>

    

    <div class="form-element">
      <p>Selecione um tipo de plano:</p>

      <div class="form-radio">
        <input id="bronze" type="radio" value="1" v-model="planType" />
        <label for="bronze">Bronze</label>
      </div>

      <div class="form-radio">
        <input id="prata" type="radio" value="2" v-model="planType" />
        <label for="prata">Prata</label>
      </div>

      <div class="form-radio">
        <input id="premium" type="radio" value="3" v-model="planType" />
        <label for="premium">Premium</label>
      </div>
    </div>

    

    <button>Criar conta</button>
  </form>
</template>

<script>
import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'
import axios from 'axios'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      planType: '2',

      errors: {}
    }
  },
  methods: {
    handleCreateAccount() {
      try {
        //SCHEMA VALIDATION
        const schema = yup.object().shape({
          name: yup.string().required('*Nome é obrigatório'),
          email: yup.string().email('Email não é válido').required('*Email é obrigatório'),
          
          password: yup.string().required('*Senha é obrigatória'),
          confirmPassword: yup
            .string()
            .required('*A confirmação é necessária')
            .oneOf([yup.ref('password')], 'As senhas devem coincidir')
          
        })

        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            
            password: this.password,
            confirmPassword: this.confirmPassword,
            
          },
          { abortEarly: false } //mostrar todos os erros que estao acontecendo de uma só vez
        )

        //Cadastro de usuário

        axios({
          url: 'http://localhost:3000/users',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            type_plan: this.planType
          }
        })
          .then(() => {
            alert('Cadastrado com sucesso')
            this.$router.push('/')
          })
          .catch((error) => {
            console.log(error)
            if(error.response?.data?.message) {
              alert(error.response.data.message)
            } else {
              alert('Houve uma falha ao tentar cadastrar')
            }
          })

        /* fetch('http://localhost:3000/api/register', {
          method: 'POST',
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
            confirmPassword: this.confirmPassword,
            confirmTerms: this.confirmTerms,
            sponsor: this.sponsor,
            bio: this.bio,
            planType: this.planType
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }) */
        /* .then((response) => {
            if (!response.ok === false) {
              throw new Error()
            }
            return response.json()
            
          })
          .then((response) =>{
            alert('Cadastrado com sucesso')
          })
          .catch(() => {
            alert('Houve uma falha ao tentar cadastrar')
          }) */
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          //capturar os erros do yup
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.form-login {
  margin: 40px auto;
  width: 40%;

  border-radius: 4px;
  border: 1px solid #383737;

  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;

  padding: 10px;
}

.form-element,
.form-checkbox {
  display: flex;
  flex-direction: column;
  width: 80%;
}

.form-input,
.form-select,
.form-textarea {
  height: 34px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #756767;
  outline: none;
}

.form-textarea {
  height: 68px;
}

.form-radio {
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-area {
  width: 80%;

  display: flex;
  flex-direction: column;
}

.input-area input {
  width: 100%;
}

.texto-erro {
  color: red;
  margin: 4px;
}

.input-error {
  border-color: red;
}

button {
  width: 80%;
  height: 54px;
  background-color: #3578e5;

  color: white;
  font-size: 18px;
  border-radius: 8px;
  border: none;
}

button:hover {
  background-color: #286ee0;
}
</style>