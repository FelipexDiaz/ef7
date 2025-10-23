import { mount } from '@vue/test-utils'
import CursoCard from '../CursoCard.vue'

describe('CursoCard.vue', () => {
  const props = {
    title: 'Curso de Vue 3',
    subtitle: 'Aprende Vue paso a paso',
    img: 'https://via.placeholder.com/150'
  }

  const globalStubs = ['v-card', 'v-img', 'v-btn']

  it('mounts without crashing', () => {
    const wrapper = mount(CursoCard, {
      props,
      global: { stubs: globalStubs }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the course title', () => {
    const wrapper = mount(CursoCard, {
      props,
      global: { stubs: globalStubs }
    })
    expect(wrapper.html()).toContain('Curso de Vue 3')
  })

  it('renders the course subtitle', () => {
    const wrapper = mount(CursoCard, {
      props,
      global: { stubs: globalStubs }
    })
    expect(wrapper.html()).toContain('Aprende Vue paso a paso')
  })

  it('renders an image', () => {
    const wrapper = mount(CursoCard, {
      props,
      global: { stubs: globalStubs }
    })
    expect(wrapper.html()).toContain(props.img)
  })
})
