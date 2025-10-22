<template>
  <v-app>
    <NavBar />

    <v-main>
      <v-container class="py-4">
        <router-view />
      </v-container>
    </v-main>

    <!-- Snackbar global -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
      <template #actions>
        <v-btn text @click="snackbar.show = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import NavBar from './components/NavBar.vue'

const store = useStore()

// Computed para controlar el snackbar desde Vuex
const snackbar = computed({
  get: () => store.state.snackbar,
  set: val => store.commit('hideSnackbar')
})
</script>

<style scoped>
</style>
