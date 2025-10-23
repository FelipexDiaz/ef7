import { createStore } from 'vuex'
import { auth, onAuthStateChanged, signOut, db, collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, getDocs } from '../firebase'

const store = createStore({
  state() {
    return {
      user: null,
      cursos: [],
      snackbar: { show: false, message: '', color: 'success' }
    }
  },
  getters: {
    'auth/getUser': state => state.user,
    'courses/all': state => state.cursos,
    'snackbar/get': state => state.snackbar
  },
  mutations: {
    setUser(state, user) { state.user = user },
    clearUser(state) { state.user = null },
    setCursos(state, cursos) { state.cursos = cursos },
    showSnackbar(state, { message, color = 'success' }) {
      state.snackbar.message = message
      state.snackbar.color = color
      state.snackbar.show = true
    },
    hideSnackbar(state) { state.snackbar.show = false }
  },
  actions: {
    // 🔹 Escuchar autenticación
    listenAuthState({ commit }) {
      onAuthStateChanged(auth, user => {
        if (user) {
          commit('setUser', { uid: user.uid, email: user.email })
          commit('showSnackbar', { message: `👤 Bienvenido, ${user.email}!`, color: 'success' })
        } else {
          commit('clearUser')
        }
      })
    },
    async signOutAction({ commit }) {
      await signOut(auth)
      commit('clearUser')
      commit('showSnackbar', { message: '🔓 Sesión cerrada', color: 'info' })
    },

    // 🔹 Cursos
    listenCursos({ commit }) {
      const colRef = collection(db, 'cursos')
      onSnapshot(colRef, snapshot => {
        const arr = []
        snapshot.forEach(docu => arr.push({ id: docu.id, ...docu.data() }))
        commit('setCursos', arr)
      })
    },
    async addCurso({ commit }, payload) {
      const colRef = collection(db, 'cursos')
      await addDoc(colRef, payload)
//      commit('showSnackbar', { message: '✅ Curso agregado correctamente', color: 'success' })
    },
    async updateCurso({ commit }, { id, data }) {
      const docRef = doc(db, 'cursos', id)
      await updateDoc(docRef, data)
//      commit('showSnackbar', { message: '✏️ Curso actualizado correctamente', color: 'success' })
    },
    async deleteCurso({ commit }, id) {
      const docRef = doc(db, 'cursos', id)
      await deleteDoc(docRef)
//      commit('showSnackbar', { message: '🗑️ Curso eliminado correctamente', color: 'error' })
    }
  }
})

export default store
