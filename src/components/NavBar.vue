<template>
  <!-- Drawer y App Bar separados del v-main -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    app
  >
    <v-list>
      <v-list-item
        v-for="item in navItems"
        :key="item.title"
        :to="item.to"
        @click="drawer = false"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Adweb Online</v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-if="user">
      <span class="me-3">{{ user.email }}</span>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <v-btn text :to="{ path: '/login' }" aria-label="Logout">Login</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const user = computed(() => store.getters['auth/getUser'])

const drawer = ref(false)

const logout = async () => {
  await store.dispatch('signOutAction')
  router.push('/login')
}

const navItems = computed(() => [
  { title: 'Home', to: '/', visible: true },
  { title: 'Admin', to: '/admin', visible: user.value }
].filter(item => item.visible))
</script>

<style scoped>
.me-3 {
  margin-right: 1rem;
}
</style>
