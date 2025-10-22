<template>
  <v-container class="py-4" max-width="600">
    <h2>Editar Curso</h2>

    <v-card>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="updateCurso">
          <v-text-field
            v-model="curso.codigo"
            label="Código"
            readonly
          />
          <v-text-field
            v-model="curso.nombre"
            label="Nombre"
            :rules="[v => !!v || 'El nombre es requerido']"
            required
          />
          <v-textarea
            v-model="curso.descripcion"
            label="Descripción"
            :rules="[v => !!v || 'La descripción es requerida']"
            required
          />
          <v-text-field
            v-model="curso.duracion"
            label="Duración"
            :rules="[v => !!v || 'La duración es requerida']"
            required
          />
          <v-text-field
            v-model="curso.precio"
            label="Precio"
            :rules="[v => !!v || 'El precio es requerido']"
            required
          />
          <v-text-field
            v-model.number="curso.cupos"
            label="Cupos"
            type="number"
            :rules="[v => v > 0 || 'Debe ingresar al menos 1 cupo']"
            required
          />
          <v-text-field
            v-model.number="curso.inscritos"
            label="Inscritos"
            type="number"
            :rules="[v => v >= 0 || 'No puede ser negativo']"
            required
          />
          <v-text-field
            v-model="curso.img"
            label="Imagen URL"
            :rules="[v => !!v || 'La URL es requerida']"
            required
          />
          <v-checkbox
            v-model="curso.estado"
            label="Activo"
          />

          <div class="d-flex justify-end mt-3">
            <v-btn color="secondary" @click="cancelar">Cancelar</v-btn>
            <v-btn color="primary" type="submit" class="ms-2">Actualizar</v-btn>
          </div>
        </v-form>

        <!-- Alert de actualización -->
        <v-alert
          v-if="alert.show"
          type="success"
          dismissible
          class="mt-3"
          @click:close="alert.show = false"
        >
          {{ alert.message }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()
const id = route.params.id
const cursos = computed(() => store.getters['courses/all'])

const curso = ref({
  codigo: '',
  nombre: '',
  descripcion: '',
  duracion: '',
  cupos: 0,
  inscritos: 0,
  precio: '',
  estado: false,
  img: ''
})

watchEffect(() => {
  const c = cursos.value.find(c => c.id === id)
  if (c) curso.value = { ...c }
})

// Form ref para validación
const formRef = ref(null)

// Alert para notificación
const alert = ref({ show: false, message: '' })
const showAlert = (message) => {
  alert.value.message = message
  alert.value.show = true
}

const updateCurso = async () => {
  if (!formRef.value) return

  const isValid = await formRef.value.validate()
  if (!isValid.valid) return

  await store.dispatch('updateCurso', { id, data: curso.value })
  showAlert('✅ Curso actualizado correctamente')
  await new Promise(resolve => setTimeout(resolve, 3000))
  router.push('/admin')
}

const cancelar = () => router.push('/admin')
</script>
