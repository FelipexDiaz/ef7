import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import NavBar from '../NavBar.vue'

describe('NavBar.vue', () => {
  const store = createStore({
    state: {},
    getters: { isLoggedIn: () => true }
  })

  const globalStubs = {
    'v-app-bar': { template: '<div><slot /></div>' },
    'v-toolbar-title': { template: '<div><slot /></div>' },
    'v-btn': { template: '<button><slot /></button>' },
    'v-icon': { template: '<i></i>' },
    'router-link': { props: ['to'], template: '<a><slot /></a>' }
  }

  it('mounts without crashing', () => {
    const wrapper = mount(NavBar, {
      global: { stubs: globalStubs, plugins: [store] }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders navigation links', () => {
    const wrapper = mount(NavBar, {
      global: { stubs: globalStubs, plugins: [store] }
    })

    const links = wrapper.findAll('a, button')
    expect(links.length).toBeGreaterThan(0)
  })
})
