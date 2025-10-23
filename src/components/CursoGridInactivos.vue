<template>
  <v-row>
    <v-col
      v-for="curso in cursos"
      :key="curso.id"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      class="mb-3 curso-card"
    >
      <CursoCard
        :curso="curso"
        cardClase="opacity-70"
        imgClase="grayscale"
        textClase="text-gray-600"
      />
    </v-col>
  </v-row>
</template>

<script>
import CursoCard from './CursoCard.vue'

export default {
  name: 'CursoGridInactivos',
  components: { CursoCard },
  props: {
    cursos: { type: Array, required: true }
  }
}
</script>

<style scoped>
.opacity-70 {
  opacity: 0.7;
}
.grayscale {
  filter: grayscale(100%);
}
</style>
