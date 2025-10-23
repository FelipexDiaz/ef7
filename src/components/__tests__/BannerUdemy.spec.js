import { mount } from '@vue/test-utils'
import BannerUdemy from '../BannerUdemy.vue'

describe('BannerUdemy.vue', () => {
  it('mounts without crashing', () => {
    const wrapper = mount(BannerUdemy)
    expect(wrapper.exists()).toBe(true)
  })

  it('contains at least one slide title', () => {
    const wrapper = mount(BannerUdemy)
    // Solo verificamos que el HTML tenga el título del primer slide
    expect(wrapper.html()).toContain('Consejo de experto:')
  })
})
