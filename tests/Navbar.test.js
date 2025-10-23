// tests/Navbar.test.js
import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, vi } from 'vitest'
import Navbar from '../src/components/Navbar.vue'
import { createStore } from 'vuex'
import { createRouter, createMemoryHistory } from 'vue-router'

// Vuetify
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

describe('Navbar.vue', () => {
  it('renders nav items and user info correctly', async () => {
    const signOutMock = vi.fn()

    const store = createStore({
      getters: {
        'auth/getUser': () => ({ email: 'test@example.com' }),
      },
      actions: {
        signOutAction: signOutMock,
      },
    })

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/login' }],
    })
    router.push('/')
    await router.isReady()

    render(Navbar, {
      global: {
        plugins: [store, router, vuetify],
      },
    })

    // Verificar que se muestran los nav items
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()

    // Verificar que se muestra el email del usuario
    expect(screen.getByText('test@example.com')).toBeInTheDocument()

    // Hacer click en logout
    const logoutBtn = screen.getByRole('button', { name: /logout/i })
    await fireEvent.click(logoutBtn)

    expect(signOutMock).toHaveBeenCalled()
  })

  it('shows login button if no user', async () => {
    const store = createStore({
      getters: {
        'auth/getUser': () => null,
      },
      actions: {
        signOutAction: vi.fn(),
      },
    })

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/login' }],
    })
    router.push('/')
    await router.isReady()

    render(Navbar, {
      global: {
        plugins: [store, router, vuetify],
      },
    })

    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
