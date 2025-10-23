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
        :cardClase="cardClase"
        :titleClase="titleClase"
        :textClase="textClase"
      />
    </v-col>
  </v-row>
</template>

<script>
import CursoCard from './CursoCard.vue'

export default {
  name: 'CursoGrid',
  components: { CursoCard },
  props: {
    cursos: { type: Array, required: true },
    cardClase: { type: String, default: '' },
    titleClase: { type: String, default: '' },
    textClase: { type: String, default: 'text-gray-700' }
  }
}
</script>
