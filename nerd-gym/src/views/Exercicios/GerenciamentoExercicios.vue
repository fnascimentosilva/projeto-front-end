<template>
     <v-card class="mx-auto" :width="720">
    <div class="d-flex align-center flex-wrap">
      <v-icon>mdi-account-multiple</v-icon>
      <h1>Exercícios</h1>
    </div>
    <hr cols="12" />
    <v-form ref="form" @submit.prevent="handleCreateExercise" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="8" md="4">
            <v-text-field
              v-model="nomeExercicio"
              label="Nome Completo"
              :rules="nomeExercicioRules"
              required
            ></v-text-field>
          </v-col>

         <v-btn  type="submit" block class="mt-2" variant="tonal" color="purple">Cadastrar</v-btn>

          
      </v-container>

      

      <v-container>
        <v-row>
          <v-col cols="3" md="4">
            
            <v-text-field
            
              
            > {{nomeExercicio}}</v-text-field>
          </v-col>

          
      </v-container>
      
    </v-form>
  </v-card>
</template>
<script>


import axios from 'axios'


export default {
  data() {
    return {
      nomeExercicio:[]
      
    }
  },
  mounted() {
    
  },

    handleCreateAccount() {
      
       if(this.$refs.form.validate()){
        
        axios({
          url: 'http://localhost:3000/exercises',
          method: 'POST',
          data: {
            description: this.nomeExercicio,
            
          }
        })
          .then(() => {
            alert('Cadastrado com sucesso')
            this.$router.push('/gerenciamento_exercicios')
          })
          .catch((error) => {
            console.log(error)
            if (error.response?.data?.message) {
              alert(error.response.data.message)
            } else {
              alert('Não foi possível criar a conta nesse momento')
            }
          })
   }
 
  },
  computed: {
    nomeExercicioRules() {
      return [
        (v) => !!v || 'Campo é obrigatório',
      ];
    },
    
  },

}




</script>

<style scoped>
</style>
