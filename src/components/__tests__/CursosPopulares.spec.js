import { mount } from '@vue/test-utils'
import CursosPopulares from '../CursosPopulares.vue'

describe('CursosPopulares.vue', () => {
  const mockCourses = [
    { id: 1, title: 'Vue 3 desde cero', subtitle: 'Aprende los fundamentos', img: 'https://via.placeholder.com/150' },
    { id: 2, title: 'JavaScript Avanzado', subtitle: 'Domina el lenguaje', img: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Tailwind CSS', subtitle: 'Estilos modernos', img: 'https://via.placeholder.com/150' }
  ]

  const globalStubs = {
    'v-container': true,
    'v-row': true,
    'v-col': true,
    'v-card': true,
    'v-btn': true,
    'v-img': true,
    'curso-card': {
      props: ['curso'],
      template: '<div class="curso-card-stub">{{ curso.title }}</div>'
    }
  }

  it('mounts without crashing', () => {
    const wrapper = mount(CursosPopulares, {
      props: { cursos: mockCourses },
      global: { stubs: globalStubs }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct number of popular courses', () => {
    const wrapper = mount(CursosPopulares, {
      props: { cursos: mockCourses },
      global: { stubs: globalStubs }
    })

    const courseCards = wrapper.findAll('.curso-card-stub')
    expect(courseCards.length).toBe(mockCourses.length)
  })

  it('passes the correct course data to each card', () => {
    const wrapper = mount(CursosPopulares, {
      props: { cursos: mockCourses },
      global: { stubs: globalStubs }
    })

    const courseCards = wrapper.findAll('.curso-card-stub')
    courseCards.forEach((card, index) => {
      expect(card.text()).toContain(mockCourses[index].title)
    })
  })
})
