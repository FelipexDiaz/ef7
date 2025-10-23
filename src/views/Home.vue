<template>
  <v-container class="py-4">
    <h2 class="mb-4">Cursos más populares</h2>
    <BannerUdemy />

    <CursosPopulares :cursos="cursosPorInscritos" />

    <h2 class="mt-8 mb-4">Cursos activos (A–Z)</h2>
    <CursoGrid :cursos="cursosActivosAlfabeticos" />

    <h2 class="mt-10 mb-4 text-gray-500">Cursos inactivos (A–Z)</h2>
    <CursoGridInactivos :cursos="cursosInactivosAlfabeticos" />
  </v-container>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import BannerUdemy from '../components/BannerUdemy.vue'
import CursoGrid from '../components/CursoGrid.vue'
import CursoGridInactivos from '../components/CursoGridInactivos.vue'
import CursosPopulares from '../components/CursosPopulares.vue'

export default {
  components: { BannerUdemy, CursoGrid, CursoGridInactivos, CursosPopulares },
  setup() {
    const store = useStore()
    const cursos = computed(() => store.getters['courses/all'])

    const cursosActivos = computed(() => cursos.value.filter(c => c.estado))
    const cursosInactivos = computed(() => cursos.value.filter(c => !c.estado))

    const cursosActivosAlfabeticos = computed(() =>
      [...cursosActivos.value].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
    )

    const cursosInactivosAlfabeticos = computed(() =>
      [...cursosInactivos.value].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
    )

    const cursosPorInscritos = computed(() =>
      [...cursosActivos.value].sort((a, b) => b.inscritos - a.inscritos)
    )

    onMounted(() => store.dispatch('listenCursos'))

    return {
      cursosActivosAlfabeticos,
      cursosInactivosAlfabeticos,
      cursosPorInscritos
    }
  }
}
</script>
