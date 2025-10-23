import { mount } from '@vue/test-utils'
import CursoGrid from '../CursoGrid.vue'

describe('CursoGrid.vue', () => {
  const mockCourses = [
    { id: 1, title: 'Vue 3 desde cero', subtitle: 'Aprende los fundamentos', img: 'https://via.placeholder.com/150' },
    { id: 2, title: 'JavaScript Avanzado', subtitle: 'Domina el lenguaje', img: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Tailwind CSS', subtitle: 'Estilos modernos', img: 'https://via.placeholder.com/150' }
  ]

  it('logs the rendered HTML to inspect what is being output', () => {
    const wrapper = mount(CursoGrid, {
      props: { courses: mockCourses },
      global: {
        stubs: {
          'v-container': true,
          'v-row': true,
          'v-col': true,
          'v-card': true,
          'v-btn': true,
          'v-img': true,
          'curso-card': { template: '<div class="curso-card-stub"></div>' }
        }
      }
    })

    console.log(wrapper.html()) // 👈 muestra qué se está renderizando
    expect(wrapper.exists()).toBe(true)
  })
})
