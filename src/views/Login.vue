<template>
  <v-container class="py-4" max-width="400">
    <v-card>
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="login" ref="formRef">
          <v-text-field
            data-testid="email-input"
            v-model="email"
            label="Email"
            type="email"
            required
          />
          <v-text-field
            data-testid="password-input"
            v-model="password"
            label="Password"
            type="password"
            required
          />

          <v-btn type="submit" color="primary" class="mt-2" block>
            Ingresar
          </v-btn>

          <router-link class="v-btn v-btn--text mt-2" to="/register">
            Registrarse
          </router-link>
        </v-form>

        <!-- Alerta de éxito/error -->
        <v-alert
          v-if="alert.show"
          :type="alert.type"
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { auth, signInWithEmailAndPassword } from '../firebase'

const email = ref('')
const password = ref('')
const formRef = ref(null)
const store = useStore()
const router = useRouter()

// Alerta
const alert = ref({
  show: false,
  message: '',
  type: 'success', // 'success', 'error', 'warning', 'info'
})

const showAlert = (message, type = 'success') => {
  alert.value.message = message
  alert.value.type = type
  alert.value.show = true
}

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    await store.dispatch('listenAuthState')
    showAlert('✅ Inicio de sesión exitoso', 'success')
  } catch (e) {
    showAlert('❌ Error al iniciar sesión: ' + e.message, 'error')
  }
}
</script>
