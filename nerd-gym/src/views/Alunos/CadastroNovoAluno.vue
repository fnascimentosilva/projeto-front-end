<template>
  <v-card class="mx-auto" :width= "720">
    <div class="d-flex align-center flex-wrap">
      <v-icon>mdi-account-multiple</v-icon>
      <h1>Alunos</h1>{{dataHoje.getTime()}}
    </div>
    <v-form @submit.prevent = "handleSubmit" variant="outlined">
      <v-container>
        <v-row>
          <v-col cols="6" md="4">
            <v-text-field v-model="nomeCompleto"
             label="Nome Completo" 
             :rules="[() => !!nomeCompleto || 'Campo é obrigatório']"
             required
             ></v-text-field>
          </v-col>

          <v-col cols="6" md="4">
            <v-text-field
              v-model="email"
              label="Email"
              
              placeholder="example@email.com"
              type="email"
            
            ></v-text-field>
          </v-col>

          <v-col cols="6" md="4">
            <v-text-field
            v-model="contato"
              label="Contato"
              :rules="[() => !!contato || 'Campo é obrigatório']"
              placeholder="(99) - 999999999"
              type="phone"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="4">
            <v-text-field 
            v-model="date_birth"
            label="Data de Nascimento" type="date" required></v-text-field>
            {{date_birth}}
          </v-col>
          
        </v-row>
      </v-container>

      <hr cols="12" />

      <v-container>
        <v-row>
          <v-col cols="3" md="4">
            <v-text-field
            v-model="cep"
             label="Cep"
             :rules="[() => !!cep || 'Campo é obrigatório']"
             ></v-text-field>
             {{cep}}
             
          </v-col>

          <v-col cols="7" md="4">
            <v-text-field
             label="Logradouro"
             :rules="[() => !!logradouro || 'Campo é obrigatório']">{{logradouro}}</v-text-field>
          </v-col>
          <v-col cols="2" md="4">
            <v-text-field
            v-model="numero"
             label="Número"
             :rules="[() => !!numero || 'Campo é obrigatório']"
             ></v-text-field>
             
          </v-col>

          <v-col cols="2" md="4">
            <v-select
              label="UF"
              :rules="[() => !!UF || 'Campo é obrigatório']"
              :items="['AC',
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
                            'TO',]"
            ></v-select>
          </v-col>
          <v-col cols="3" md="4">
            <v-text-field label="Bairro"
            :rules="[() => !!bairro || 'Campo é obrigatório']"></v-text-field>
            
          </v-col>
          <v-col cols="3" md="4">
            <v-text-field label="Cidade"
            :rules="[() => !!cidade || 'Campo é obrigatório']"></v-text-field>
            
          </v-col>
          <v-col cols="4" md="4">
            <v-text-field label="Complemento"></v-text-field>
            
          </v-col>
        </v-row>
      </v-container>
      <v-btn type="submit" block class="mt-2" variant="tonal" color="purple">Cadastrar</v-btn>
    </v-form>
  </v-card>
</template>
<script>
import axios from 'axios';
const dataAtual = new Date();

export default {
    data() {
        return {
            nomeCompleto: "",
            email:"",
            contato:"",
            date_birth:"",
            cep:"",
            endereco: {
                

            },
            dataHoje : dataAtual,
            

        }
    },
    mounted() {
        axios.get(`https://viacep.com.br/ws/${this.cep}/json/`)
        .then(res => this.endereco = res.data)
        .catch(erro => console.log(erro))
    },
}
</script>


