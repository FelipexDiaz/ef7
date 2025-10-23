<template>
  <v-container class="py-4">
    <v-carousel
      v-model="currentIndex"
      hide-delimiters
      height="380"
      show-arrows
      cycle
      interval="5000"
      class="banner-carousel"
    >
      <v-carousel-item
        v-for="(slide, index) in slides"
        :key="index"
      >
        <div class="banner-wrapper">
          <v-img
            :src="slide.img"
            height="380"
            cover
          ></v-img>
          <div class="banner-content">

            <v-card class="banner-text-card pa-4">
            <h2 v-html="slide.title"></h2>
            <p v-html="slide.subtitle"></p>
            <v-btn
              v-if="slide.cta"
              :href="slide.cta.link"
              target="_blank"
              color="primary"
              class="mt-2"
            >
              {{ slide.cta.label }}
            </v-btn>
          </v-card>

          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const slides = ref([
  {
    title: 'Consejo de experto:',
    subtitle: '<u><a target="_blank" href="#">Ve los cursos</a></u> mientras haces ejercicio o cocinas. Aprovecha cada minuto.',
    img: 'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/3f2025e6-15ca-4823-9ac8-de87281c7838.jpg',
    cta: null
  },
  {
    title: 'Tu progreso debería ser recompensado',
    subtitle: 'Y ahorra un 25&nbsp;% en un año de aprendizaje con el Plan Personal. Una recompensa especial para estudiantes como tú.',
    img: 'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/db126900-576a-4bb7-b87f-35e6f9e05dc8.png',
    cta: { label: 'Recibir oferta', link: '#' }
  },
  {
    title: 'Desarrollado por la comunidad',
    subtitle: 'Confía en las valoraciones y reseñas para elegir con criterio. Empieza con nuestros cursos mejor valorados.',
    img: 'https://img-c.udemycdn.com/notices/featured_carousel_slide/image/2b4dae04-f107-4ae6-8188-a57ca45897cb.jpg',
    cta: null
  }
])

const currentIndex = ref(0)
</script>

<style scoped>
.banner-wrapper {
  position: relative;
  width: 100%;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
}

.banner-content {
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
}

.banner-content h1 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.banner-content p {
  font-size: 1.1rem;
}

.banner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 380px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f5a623; /* Color de fondo similar a la referencia */
}
</style>
