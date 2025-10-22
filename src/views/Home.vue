<template>
  <v-container class="py-4">
    <v-row>
      <v-col cols="12" class="mb-3">
        <h2>Cursos Disponibles</h2>
      </v-col>

      <v-col
        v-for="curso in cursos"
        :key="curso.id"
        cols="12" md="4"
        class="mb-3 curso-card"
      >
        <v-card>
          <v-img :src="curso.img" aspect-ratio="16/9" class="mb-2" />
          <v-card-title>{{ curso.nombre }}</v-card-title>
          <v-card-text>
            <p>{{ curso.descripcion }}</p>
            <small>Precio: {{ curso.precio }}</small>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const cursos = computed(() => store.getters['courses/all'])

    onMounted(async () => {
      store.dispatch('listenCursos')
    })

    return { cursos }
  }
}
</script>

<style scoped>
</style>
