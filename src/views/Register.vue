<template>
  <v-container class="py-4" max-width="400">
    <v-card>
      <v-card-title>Registro</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="register" ref="formRef">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
          />

          <v-btn type="submit" color="success" class="mt-2" block>
            Registrar
          </v-btn>

          <router-link class="v-btn v-btn--text mt-2" to="/login">
            Ya tengo cuenta
          </router-link>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth, createUserWithEmailAndPassword } from '../firebase'

const email = ref('')
const password = ref('')
const router = useRouter()
const formRef = ref(null)

// Snackbar para notificaciones
const snackbar = ref({ show: false, message: '', color: 'success' })
const showSnackbar = (message, color = 'success') => {
  snackbar.value.message = message
  snackbar.value.color = color
  snackbar.value.show = true
}

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    showSnackbar('✅ Usuario creado correctamente', 'success')
    router.push('/')
  } catch (e) {
    showSnackbar('❌ Error al crear usuario: ' + e.message, 'error')
  }
}
</script>

