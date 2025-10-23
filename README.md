# 📚 Sistema de Administración de Cursos — Adweb Online

Proyecto desarrollado en **Vue.js** con integración a **Firebase (Firestore + Authentication)**.  
Permite la **gestión completa de cursos** en una plataforma de enseñanza en línea, con autenticación de usuarios, CRUD de cursos y despliegue final en **Firebase Hosting**.

---

## 🚀 Tecnologías Utilizadas

- **Vue.js 3** (creado con Vue CLI)
- **Vue Router** — Manejo y protección de rutas
- **Vuex** — Gestión del estado global
- **Firebase** (Authentication + Firestore + Hosting)
- **vuetify** — Framework de UI
- **Vitest** — Pruebas unitarias de componentes Vue
- **Cypress / Jest** — Test Suite End-to-End

---

## 🧱 Estructura del Proyecto

```
ef7/
│
├── src/
│   ├── assets/              # Recursos estáticos
│   ├── components/          # Componentes reutilizables
│       └── __tests__/       # Tests con Vitest de Componentes
│   ├── router/              # Configuración de rutas (Vue Router)
│   ├── store/               # Estado global (Vuex)
│   ├── views/               # Vistas principales (Login, Registro, Home, Admin, EditarCurso)
│   ├── firebase/            # Configuración de Firebase
│   └── main.js              # Punto de entrada del proyecto
│
├── cypress/                   # Pruebas unitarias y E2E
│   └── e2e/                 # Tests End-to-End
│
├── public/                  # Archivos públicos
├── package.json
└── README.md
```

---

## 🔥 Funcionalidades Principales

### 🔐 Autenticación de Usuarios
- **Registro** con correo y contraseña (`createUserWithEmailAndPassword`)
- **Inicio de sesión** (`signInWithEmailAndPassword`)
- **Cierre de sesión** (`signOut`)
- Detección del estado de autenticación en tiempo real (`onAuthStateChanged`)
- Modal de bienvenida al ingresar correctamente

### 🏠 Interfaz Principal (Home)
- Visualización de todos los cursos desde **Firestore**
- Renderizado dinámico mediante **cards**

### ⚙️ Panel de Administración (Solo usuarios autenticados)
- Listado de cursos en tabla
- **Agregar**, **editar** y **eliminar** cursos
- Confirmación mediante modales antes de realizar acciones
- Actualización en tiempo real con `onSnapshot`

### 📦 CRUD con Firestore
- `add` — Agregar curso nuevo  
- `update/set` — Editar curso existente  
- `delete` — Eliminar curso  
- `onSnapshot` — Escuchar cambios en tiempo real  

### 🎨 Interfaz de Usuario
- **vuetify** aplicado en toda la interfaz
- **NavBar** con:
  - Correo del usuario logueado
  - Botón de “Cerrar Sesión”
  - Enlaces de navegación a las vistas principales

---

## ⚙️ Configuración del Proyecto

### 1️⃣ Clonar el Repositorio
```bash
git clone https://github.com/FelipexDiaz/ef7.git
cd ef7
```

### 2️⃣ Instalar Dependencias
```bash
npm install
```

### 3️⃣ Configurar Firebase
Crea un proyecto en [Firebase Console](https://console.firebase.google.com/), habilita:
- **Authentication → Email/Password**
- **Cloud Firestore**
- **Hosting**

Copia tus credenciales y crea un archivo:

`src/firebase/config.js`
```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHAkrZS2X3kwzJrIIxNeQWid6Lhz65lE0",
  authDomain: "test1-7dc10.firebaseapp.com",
  projectId: "test1-7dc10",
  storageBucket: "test1-7dc10.firebasestorage.app",
  messagingSenderId: "639660119751",
  appId: "1:639660119751:web:d7d530b57aceb3cd0bd0e2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
```

### 4️⃣ Ejecutar en Modo Desarrollo
```bash
npm run serve
```

### 5️⃣ Compilar para Producción
```bash
npm run build
```

---

## 🔁 Vuex — Estructura del Estado

- **state:**  
  - `user`: Datos del usuario autenticado  
  - `courses`: Lista de cursos obtenidos de Firestore  

- **getters:**  
  - `getCourses`, `getUser`

- **mutations:**  
  - `setUser`, `setCourses`, `addCourse`, `removeCourse`, `updateCourse`

- **actions:**  
  - `loginUser`, `logoutUser`, `registerUser`
  - `fetchCourses`, `createCourse`, `deleteCourse`, `editCourse`

---

## 🧪 Pruebas y Testing

### ✅ Tests de Componentes (Vitest)
El proyecto incluye **pruebas unitarias** de componentes Vue utilizando **[Vitest](https://vitest.dev/)**.

Ejecutar pruebas unitarias:
```bash
npm run test:unit
```

Ejemplos de componentes probados:
- `LoginView.vue` — Verifica validaciones de formulario.
- `CourseCard.vue` — Comprueba el renderizado dinámico de información.
- `Navbar.vue` — Testea el cierre de sesión y render del usuario.

### ✅ Test Suite End-to-End
También incluye pruebas **E2E** (con Cypress o Jest) para verificar:
1. **Eliminación de cursos** correctamente desde la interfaz.
2. **Inicio de sesión** con correo y contraseña, validando que la sesión permanezca activa.

Ejecutar pruebas E2E:
```bash
npm run test:e2e
```

---

## ☁️ Deploy en Firebase Hosting

1. Instalar herramientas de Firebase:
   ```bash
   npm install -g firebase-tools
   ```

2. Iniciar sesión:
   ```bash
   firebase login
   ```

3. Inicializar hosting en el proyecto:
   ```bash
   firebase init hosting
   ```

4. Seleccionar carpeta `dist/` como directorio público.

5. Desplegar:
   ```bash
   firebase deploy
   ```

---

## 📌 Sprint de Entrega

✔️ Proyecto creado con **Vue CLI**  
✔️ Integración completa con **Firebase Authentication y Firestore**  
✔️ Manejo de estados con **Vuex**  
✔️ Protección de rutas con **Vue Router**  
✔️ Estilizado con **vuetify**  
✔️ **Tests de componentes con Vitest**  
✔️ **Test End-to-End funcionales**  
✔️ Despliegue final en **Firebase Hosting**

---

## 🧑‍💻 Autores

- **Felipe Díaz** — [GitHub: @FelipexDiaz](https://github.com/FelipexDiaz)
