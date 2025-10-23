import { mount } from '@vue/test-utils'
import CourseFormModal from '../CourseFormModal.vue'

describe('CourseFormModal.vue', () => {
  it('mounts without crashing', () => {
    const wrapper = mount(CourseFormModal)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains a form or modal title', () => {
    const wrapper = mount(CourseFormModal)
    // Ajusta el texto según el título real de tu modal
    expect(wrapper.html()).toContain('Agregar nuevo curso')
  })
})
