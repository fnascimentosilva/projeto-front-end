<template>
  <v-layout>
    <v-app-bar color="grey-lighten-3" v-if="renderizarMenu">
      <v-app-bar-title class="titleMenu">Nerd Gym</v-app-bar-title>

      <v-btn>
        <router-link to="/dashboard"> Home </router-link>
      </v-btn>
      <v-btn>
        <router-link to="/"> Alunos </router-link>
      </v-btn>
      <v-btn>
        <router-link to="/"> Exercícios </router-link>
      </v-btn>
      <v-btn>
        <router-link to="/"> Sair </router-link>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-layout>
  
</template>

<script>
export default {
  computed: {
    renderizarMenu() {
      return this.$route.path !== '/' && this.$route.path !== '/cadastro'
    }
  }
}
</script>


