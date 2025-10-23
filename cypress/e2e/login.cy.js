describe('Admin: login y logout', () => {
  it('loguearse, entrar a admin y desloguearse', () => {

    const email = 'iamfelipediaz@gmail.com'
    const password = 'iamfelipediaz@gmail.com'

    // 1️⃣ Visitar la página principal
    cy.visit('http://localhost:5173')

    // 2️⃣ Presionar botón Login (usa aria-label="Logout" por error en el template, corregido aquí)
    cy.contains('Login').click()

    // 3️⃣ Llenar los campos de email y contraseña
    cy.get('[data-testid="email-input"]').type(email)
    cy.get('[data-testid="password-input"]').type(password)

    // 4️⃣ Presionar botón de submit para loguearse
    cy.get('button[type="submit"]').click()

    // 5️⃣ Verificar que redirige al Admin (el componente lo hace según store)
    cy.url().should('include', '/admin')

    // 6️⃣ Verificar que aparece el email del usuario en la app bar
    cy.contains(email).should('be.visible')

    // 7️⃣ Abrir el menú lateral
    cy.get('button.v-app-bar__nav-icon, i.mdi-menu').click()

    // 8️⃣ Entrar al panel de administración
    cy.contains('Admin').click({ force: true })
    cy.url().should('include', '/admin')

    // 9️⃣ Presionar el botón de logout (mdi-logout)
    cy.get('button:has(.mdi-logout)').click({ force: true })

    // 🔟 Verificar que se redirige al login
    cy.url().should('include', '/login')

    // 1️⃣1️⃣ Confirmar que ya no aparece el correo del usuario
    cy.contains(email).should('not.exist')
  })
})
