import { mount } from '@vue/test-utils'
import CursoGridInactivos from '../CursoGridInactivos.vue'

describe('CursoGridInactivos.vue', () => {
  // Datos de ejemplo
  const mockCourses = [
    { id: 1, title: 'Curso Inactivo 1', subtitle: 'Pendiente de revisión', img: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Curso Inactivo 2', subtitle: 'En espera de aprobación', img: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Curso Inactivo 3', subtitle: 'Desactivado temporalmente', img: 'https://via.placeholder.com/150' }
  ]

  // Stubs de Vuetify y del componente de tarjeta inactiva
  const globalStubs = {
    'v-container': true,
    'v-row': true,
    'v-col': true,
    'v-card': true,
    'v-btn': true,
    'v-img': true,
    // Nombre exacto del componente repetido en el template (kebab-case)
    'curso-card-inactivo': {
      props: ['course'],
      template: '<div class="curso-card-inactivo-stub">{{ course.title }}</div>'
    }
  }

  it('mounts without crashing', () => {
    const wrapper = mount(CursoGridInactivos, {
      props: { cursos: mockCourses },
      global: { stubs: globalStubs }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('passes the correct course data to each card', () => {
    const wrapper = mount(CursoGridInactivos, {
      props: { cursos: mockCourses },
      global: { stubs: globalStubs }
    })

    const inactiveCards = wrapper.findAll('.curso-card-inactivo-stub')
    inactiveCards.forEach((card, index) => {
      expect(card.text()).toContain(mockCourses[index].title)
    })
  })
})
