import { createStore } from 'vuex'
import Papa from 'papaparse'
import cursosCSV from '../assets/cursos.csv?url'
import {
  auth,
  onAuthStateChanged,
  signOut,
  db,
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs
} from '../firebase'

// Creamos el store
const store = createStore({
  state() {
    return {
      user: null,
      cursos: [],
      snackbar: { show: false, message: '', color: 'success' } // estado global para snackbar
    }
  },
  getters: {
    'auth/getUser': state => state.user,
    'courses/all': state => state.cursos,
    'snackbar/get': state => state.snackbar // getter opcional
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
    hideSnackbar(state) {
      state.snackbar.show = false
    }
  },
  actions: {
    // Autenticación
    listenAuthState({ commit }) {
      onAuthStateChanged(auth, user => {
        if (user) {
          commit('setUser', { uid: user.uid, email: user.email })
          commit('showSnackbar', { message: `👤 Bienvenido, ${user.email}!`, color: 'success' }) // snackbar en lugar de console.log
        } else {
          commit('clearUser')
        }
      })
    },
    async signOutAction({ commit }) {
      await signOut(auth)
      commit('clearUser')
      commit('showSnackbar', { message: '🔓 Sesión cerrada', color: 'info' }) // opcional: mensaje al cerrar sesión
    },

    // Cursos
    listenCursos({ commit, dispatch }) {
      const colRef = collection(db, 'cursos')
      onSnapshot(colRef, async snapshot => {
        const arr = []
        snapshot.forEach(docu => arr.push({ id: docu.id, ...docu.data() }))
        commit('setCursos', arr)

        // Si no hay cursos, los insertamos desde CSV
        if (arr.length === 0) {
          console.warn('⚙️ No hay cursos en Firestore. Insertando cursos desde CSV...')
          await dispatch('seedCursosFromCSV')
        }
      })
    },

// 🔹 Sembrar cursos desde CSV solo si la colección está vacía
    async seedCursosFromCSV({ commit }) {
      try {
        const colRef = collection(db, 'cursos')
        const snapshot = await getDocs(colRef)

        // ✅ Si ya existen cursos, salir sin hacer nada
        if (!snapshot.empty) {
          console.log('📚 Ya existen cursos en Firestore, no se cargan de nuevo.')
          return
        }

        // Cargar CSV
        const response = await fetch(cursosCSV)
        const csvText = await response.text()
        const { data } = Papa.parse(csvText, { header: true })

        // Insertar cursos en Firestore
        for (const curso of data) {
          await addDoc(colRef, {
            ...curso,
            estado: curso.estado === 'true',
            cupos: Number(curso.cupos),
            inscritos: Number(curso.inscritos),
            precio: curso.precio
          })
        }

        commit('showSnackbar', {
          message: '✅ Cursos cargados desde CSV a Firestore',
          color: 'success'
        })
      } catch (error) {
        commit('showSnackbar', {
          message: '❌ Error cargando cursos desde CSV',
          color: 'error'
        })
        console.error('❌ Error cargando cursos desde CSV:', error)
      }
    },

    
    async addCurso({ commit }, payload) {
      const colRef = collection(db, 'cursos')
      await addDoc(colRef, payload)
//      commit('showSnackbar', { message: '✅ Curso agregado correctamente', color: 'success' })
    },
    async deleteCurso({ commit }, id) {
      const docRef = doc(db, 'cursos', id)
      await deleteDoc(docRef)
//      commit('showSnackbar', { message: '🗑️ Curso eliminado correctamente', color: 'error' })
    },
    async updateCurso({ commit }, { id, data }) {
      const docRef = doc(db, 'cursos', id)
      await updateDoc(docRef, data)
//      commit('showSnackbar', { message: '✏️ Curso actualizado correctamente', color: 'success' })
    }
  }
})

export default store
