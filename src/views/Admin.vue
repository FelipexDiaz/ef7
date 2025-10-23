<template>
  <v-container class="py-4">
    <!-- Header -->
    <div class="d-flex justify-space-between align-center mb-3">
      <h2>Administrar Cursos</h2>
      <v-btn color="success" @click="showModal = true" data-testid="agregar-curso-btn">Agregar Curso</v-btn>
    </div>

    <!-- Tabla de cursos -->
<v-data-table
  :headers="fields"
  :items="cursos"
  item-key="id"
  class="elevation-1"
  dense
  :hide-default-footer="false"
  no-data-text="No hay cursos disponibles"
>
  <!-- Columna acciones -->
  <template #item.actions="{ item }">
    <v-btn class="mx-1" small color="info" @click="editCurso(item)">Editar</v-btn>
    <v-btn small class="mx-1" color="error" @click="confirmDelete(item.id)">Eliminar</v-btn>
  </template>

  <!-- Columna estado como ícono -->
  <template #item.estado="{ item }">
    <v-icon v-if="item.estado" color="green">mdi-check-circle</v-icon>
    <v-icon v-else color="grey">mdi-close-circle</v-icon>
  </template>

<!-- Columna de miniatura de imagen -->
<template #item.img="{ item }">
  <v-avatar size="48">
    <v-img
      :src="item.img"
      alt="Imagen del curso"
      cover
      v-if="item.img"
    />
    <v-icon v-else color="grey">mdi-image-off</v-icon>
  </v-avatar>
</template>

</v-data-table>

    <!-- Modal para agregar/editar curso -->
    <CourseFormModal v-model:show="showModal" @save="confirmAddCurso" />

    <!-- Dialog de confirmación para eliminar -->
    <v-dialog v-model="dialog.show" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar Eliminación</v-card-title>
        <v-card-text>
          ¿Está seguro que desea eliminar este curso?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="dialog.show = false">Cancelar</v-btn>
          <v-btn color="error" @click="deleteCurso(dialog.id)" data-testid="eliminar-confirm-btn">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog de confirmación para agregar -->
    <v-dialog v-model="addDialog.show" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirmar Agregado</v-card-title>
        <v-card-text>
          ¿Desea agregar este curso?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="addDialog.show = false">Cancelar</v-btn>
          <v-btn color="success" @click="addCurso(addDialog.payload)" data-testid="agregar-confirm-btn">Agregar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import CourseFormModal from '../components/CourseFormModal.vue'

const store = useStore()
const router = useRouter()
const showModal = ref(false)

// Snackbar
const snackbar = ref({ show: false, message: '', color: 'success' })
const showSnackbar = (message, color = 'success') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

// Cursos desde Vuex
const cursos = computed(() => {
  const lista = store.getters['courses/all'] || []
  // Orden alfabético por nombre (ignora mayúsculas/minúsculas)
  return [...lista].sort((a, b) =>
    a.nombre.toLowerCase().localeCompare(b.nombre.toLowerCase())
  )
})

// Campos de la tabla
const fields = [
  { title: 'Código', key: 'codigo' },
  { title: 'Nombre', key: 'nombre' },
  { title: 'Imagen', key: 'img' },  
  { title: 'Precio', key: 'precio' },
  { title: 'Duración', key: 'duracion' },
  { title: 'Cupos', key: 'cupos' },
  { title: 'Inscritos', key: 'inscritos' },
  { title: 'Activo', key: 'estado' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

// Escuchar cursos
onMounted(() => {
  store.dispatch('listenCursos')
})

// Dialog de confirmación
const dialog = ref({ show: false, id: null })
const confirmDelete = (id) => {
  dialog.value.id = id
  dialog.value.show = true
}

// Dialog para agregar curso
const addDialog = ref({ show: false, payload: null })
const confirmAddCurso = (nuevoCurso) => {
  addDialog.value.payload = nuevoCurso
  addDialog.value.show = true
}

// Funciones de acción
const addCurso = async (nuevoCurso) => {
  if (!nuevoCurso) return
  await store.dispatch('addCurso', nuevoCurso)
  showSnackbar('✅ Curso agregado correctamente', 'success')
  showModal.value = false
  addDialog.value.show = false
}

const deleteCurso = async (id) => {
  if (!id) return
  await store.dispatch('deleteCurso', id)
  showSnackbar('🗑️ Curso eliminado correctamente', 'error')
  dialog.value.show = false
}

const editCurso = (curso) => {
  if (!curso || !curso.id) return
  router.push(`/edit/${curso.id}`)
}
</script>
