import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'

// Vuetify 3
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: { defaultTheme: 'light' }
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.mount('#app')

// 🔹 Escuchar cambios de autenticación y cursos
store.dispatch('listenAuthState')
store.dispatch('listenCursos')

// 🔹 Redirección automática al admin si hay sesión activa
store.watch(
  (state) => state.user,
  (user) => {
    if (user && router.currentRoute.value.path === '/login') {
      router.push('/admin')
    }
  },
  { immediate: true } // Ejecuta al iniciar la app
)
