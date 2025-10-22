<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>Agregar nuevo curso</v-card-title>
      <v-card-text>
        <v-form ref="formRef" @submit.prevent="onSubmit">
          <v-text-field
            v-model="form.codigo"
            label="Código"
            :rules="[v => !!v || 'El código es requerido']"
            required
            data-testid="codigo-input"
          />
          <v-text-field
            v-model="form.nombre"
            label="Nombre"
            :rules="[v => !!v || 'El nombre es requerido']"
            required
            data-testid="nombre-input"
          />
          <v-text-field
            v-model="form.img"
            label="Imagen URL"
            :rules="[v => !!v || 'La URL es requerida']"
            required
            data-testid="img-input"
          />
          <v-textarea
            v-model="form.descripcion"
            label="Descripción"
            :rules="[v => !!v || 'La descripción es requerida']"
            required
            data-testid="descripcion-input"
          />
          <v-text-field
            v-model="form.duracion"
            label="Duración"
            :rules="[v => !!v || 'La duración es requerida']"
            required
            data-testid="duracion-input"
          />
          <v-text-field
            v-model.number="form.cupos"
            label="Cupos"
            type="number"
            :rules="[v => v > 0 || 'Debe ingresar al menos 1 cupo']"
            required
            data-testid="cupos-input"
          />
          <v-text-field
            v-model.number="form.inscritos"
            label="Inscritos"
            type="number"
            :rules="[v => v >= 0 || 'No puede ser negativo']"
            required
            data-testid="inscritos-input"
          />
          <v-text-field
            v-model="form.precio"
            label="Precio"
            :rules="[v => !!v || 'El precio es requerido']"
            required
            data-testid="precio-input"
          />
          <v-checkbox
            v-model="form.estado"
            label="Activo"
          />

          <div class="d-flex justify-end mt-3">
            <v-btn
              color="secondary"
              @click="close"
              data-testid="cancelar-btn"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              type="submit"
              class="ms-2"
              data-testid="agregar-btn"
            >
              Agregar Curso
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false }
})
const emit = defineEmits(['update:show', 'save'])

const dialog = ref(props.show)
watch(() => props.show, val => (dialog.value = val))
watch(dialog, val => emit('update:show', val))

const formRef = ref(null)

const form = ref({
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

async function onSubmit() {
  console.log('Submit clicked, current form:', form.value)

  if (!formRef.value) {
    console.log('Form ref is missing')
    return
  }

  // Validación correcta en Vuetify 3
  const result = await formRef.value.validate()
  console.log('Validation result:', result)

  if (!result.valid) {
    console.log('Form is invalid, not emitting save')
    return
  }

  console.log('Form is valid, emitting save')
  emit('save', { ...form.value })
  close()
}

function close() {
  dialog.value = false
  if (formRef.value) formRef.value.resetValidation()
  form.value = {
    codigo: '',
    nombre: '',
    descripcion: '',
    duracion: '',
    cupos: 0,
    inscritos: 0,
    precio: '',
    estado: false,
    img: ''
  }
}
</script>
