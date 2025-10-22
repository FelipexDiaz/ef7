<template>
  <v-container class="py-4">
    <h2 class="mb-4">Cursos más populares</h2>

    <!-- 🧭 Carrusel de cursos activos -->
    <div
      class="relative"
      @mouseenter="pausarCarrusel"
      @mouseleave="reanudarCarrusel"
    >
      <v-slide-group
        v-model="currentIndex"
        show-arrows
        class="transition-all"
      >
        <v-slide-group-item
          v-for="curso in cursosPorInscritos"
          :key="curso.id"
        >
          <v-card class="curso-card-item mx-2" width="250">
            <v-img
              :src="curso.img"
              class="curso-img mb-2 rounded-lg"
              height="260"
              contain
            />
            <v-card-title class="text-lg font-semibold">
              {{ curso.nombre }}
            </v-card-title>
            <v-card-text>
              <p class="text-sm text-gray-700 line-clamp-2">
                {{ curso.descripcion }}
              </p>
              <small class="text-gray-500">👥 {{ curso.inscritos }} inscritos</small><br />
              <small class="text-gray-500">💰 {{ curso.precio }}</small>
            </v-card-text>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </div>

    <!-- 🔹 Cursos activos ordenados -->
    <h2 class="mt-8 mb-4">Cursos activos (A–Z)</h2>
    <v-row>
      <v-col
        v-for="curso in cursosActivosAlfabeticos"
        :key="curso.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mb-3 curso-card"
      >
        <v-card class="curso-card-item">
          <v-img
            :src="curso.img"
            class="curso-img mb-2 rounded-lg"
            height="260"
            contain
          />
          <v-card-title class="text-lg font-semibold">
            {{ curso.nombre }}
          </v-card-title>
          <v-card-text>
            <p class="text-sm text-gray-700 line-clamp-2">{{ curso.descripcion }}</p>
            <small class="text-gray-500">💰 {{ curso.precio }}</small>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- 🔸 Cursos inactivos -->
    <h2 class="mt-10 mb-4 text-gray-500">Cursos inactivos (A–Z)</h2>
    <v-row>
      <v-col
        v-for="curso in cursosInactivosAlfabeticos"
        :key="curso.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mb-3 curso-card"
      >
        <v-card class="curso-card-item opacity-70">
          <v-img
            :src="curso.img"
            class="curso-img mb-2 rounded-lg grayscale"
            height="260"
            contain
          />
          <v-card-title class="text-lg font-semibold text-gray-600">
            {{ curso.nombre }}
          </v-card-title>
          <v-card-text>
            <p class="text-sm text-gray-600 line-clamp-2">{{ curso.descripcion }}</p>
            <small class="text-gray-500">💰 {{ curso.precio }}</small>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const cursos = computed(() => store.getters['courses/all'])

    // ✅ Filtrar activos e inactivos
    const cursosActivos = computed(() =>
      cursos.value.filter(curso => curso.estado === true)
    )

    const cursosInactivos = computed(() =>
      cursos.value.filter(curso => curso.estado === false)
    )

    // 🔹 Ordenar cursos activos
    const cursosActivosAlfabeticos = computed(() =>
      [...cursosActivos.value].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
      )
    )

    // 🔹 Ordenar cursos inactivos
    const cursosInactivosAlfabeticos = computed(() =>
      [...cursosInactivos.value].sort((a, b) =>
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
      )
    )

    // 🧭 Carrusel (orden por inscritos)
    const cursosPorInscritos = computed(() =>
      [...cursosActivos.value].sort((a, b) => b.inscritos - a.inscritos)
    )

    const currentIndex = ref(0)
    let intervalo = null

    const iniciarCarrusel = () => {
      detenerCarrusel()
      if (cursosPorInscritos.value.length > 0) {
        intervalo = setInterval(() => {
          currentIndex.value =
            (currentIndex.value + 1) % cursosPorInscritos.value.length
        }, 3000)
      }
    }

    const detenerCarrusel = () => {
      if (intervalo) clearInterval(intervalo)
    }

    const pausarCarrusel = () => detenerCarrusel()
    const reanudarCarrusel = () => iniciarCarrusel()

    onMounted(() => {
      store.dispatch('listenCursos')
      iniciarCarrusel()
    })

    onBeforeUnmount(() => detenerCarrusel())

    return {
      cursosPorInscritos,
      cursosActivosAlfabeticos,
      cursosInactivosAlfabeticos,
      currentIndex,
      pausarCarrusel,
      reanudarCarrusel
    }
  }
}
</script>

<style scoped>
.curso-img {
  width: 100%;
  height: 260px;
  object-fit: contain;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.v-slide-group {
  padding-bottom: 12px;
}

.v-slide-group__next,
.v-slide-group__prev {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
}

.transition-all {
  transition: transform 0.5s ease-in-out;
}

/* 🔸 Estilo visual para cursos inactivos */
.opacity-70 {
  opacity: 0.7;
}
.grayscale {
  filter: grayscale(100%);
}
</style>
