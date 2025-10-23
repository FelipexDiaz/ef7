<template>
  <div
    class="relative"
    @mouseenter="pausarCarrusel"
    @mouseleave="reanudarCarrusel"
  >
    <v-slide-group
      v-model="currentIndex"
      show-arrows
      class="carrusel transition-all"
    >
      <v-slide-group-item
        v-for="curso in cursos"
        :key="curso.id"
      >
        <div class="slide-item-wrapper">
          <CursoCard :curso="curso" width="250" />
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import CursoCard from './CursoCard.vue'

export default {
  name: 'CursosPopulares',
  components: { CursoCard },
  props: {
    cursos: { type: Array, required: true }
  },
  setup(props) {
    const currentIndex = ref(0)
    let intervalo = null

    const iniciarCarrusel = () => {
      detenerCarrusel()
      if (props.cursos.length > 0) {
        intervalo = setInterval(() => {
          currentIndex.value = (currentIndex.value + 1) % props.cursos.length
        }, 3000)
      }
    }

    const detenerCarrusel = () => {
      if (intervalo) clearInterval(intervalo)
    }

    const pausarCarrusel = () => detenerCarrusel()
    const reanudarCarrusel = () => iniciarCarrusel()

    onMounted(() => iniciarCarrusel())
    onBeforeUnmount(() => detenerCarrusel())

    return { currentIndex, pausarCarrusel, reanudarCarrusel }
  }
}
</script>

<style scoped>
.carrusel {
  padding: 1rem 2rem 12px 2rem; /* padding horizontal para los extremos */
}

.slide-item-wrapper {
  padding: 0 0.75rem; /* separación horizontal real entre tarjetas */
  display: inline-block; /* necesario para que el padding funcione dentro del slide-group-item */
}

.transition-all {
  transition: transform 0.5s ease-in-out;
}

.v-slide-group__next,
.v-slide-group__prev {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}
</style>
