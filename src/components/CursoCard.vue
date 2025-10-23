<template>
  <v-card :class="['curso-card-item', cardClase]" :width="width">
    <v-img
      :src="curso.img"
      class="curso-img mb-2 rounded-lg"
      :class="imgClase"
      height="200"
      contain
    />
    <v-card-title class="text-lg font-semibold" :class="titleClase">
      {{ curso.nombre }}
    </v-card-title>
    <v-card-text class="curso-card-text">
      <p class="text-sm line-clamp-2" :class="textClase">{{ curso.descripcion }}</p>
      <small v-if="curso.inscritos" class="text-gray-500">👥 {{ curso.inscritos }} inscritos</small><br />
      <small class="text-gray-500">💰 {{ curso.precio }}</small>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CursoCard',
  props: {
    curso: { type: Object, required: true },
    cardClase: { type: String, default: '' },
    imgClase: { type: String, default: '' },
    titleClase: { type: String, default: '' },
    textClase: { type: String, default: 'text-gray-700' },
    width: { type: [String, Number], default: '100%' }
  }
}
</script>

<style scoped>
.curso-card-item {
  display: flex;
  flex-direction: column;
  height: 100%; 
  min-height: 380px; /* altura uniforme */
  border: 1px solid #ddd; /* borde visible */
  border-radius: 8px; 
  box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* sombra ligera */
  background-color: #fff; /* contraste con el fondo */
}

.curso-card-text {
  flex-grow: 1;
}

.curso-img {
  width: 100%;
  object-fit: cover; 
  border-radius: 8px;
  height: 200px; 
}

/* Clases utilitarias */
.opacity-70 {
  opacity: 0.7;
}
.grayscale {
  filter: grayscale(100%);
}
</style>
