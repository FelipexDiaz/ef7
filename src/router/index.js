import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Admin from '../views/Admin.vue'
import EditCourse from '../views/EditCourse.vue'
import store from '../stores'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  { path: '/register', name: 'Register', component: Register, meta: { guest: true } },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAuth: true } },
  { path: '/edit/:id', name: 'EditCourse', component: EditCourse, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔹 Guard global de rutas
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const guest = to.meta.guest
  const user = store.getters['auth/getUser']

  // Si la ruta requiere autenticación y no hay usuario → login
  if (requiresAuth && !user) return next('/login')

  // Si la ruta es guest (login/register) y hay usuario → admin
  if (guest && user) return next('/admin')

  next()
})

export default router
