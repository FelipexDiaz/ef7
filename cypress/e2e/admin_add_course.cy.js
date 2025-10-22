describe('Admin: Agregar curso', () => {
  it('loguearse, abrir menú, entrar a admin, crear y eliminar un curso', () => {
    const codigo = 'C001'
    const nombre = 'Curso de Prueba'

    // 1️⃣ Visitar la página principal
    cy.visit('http://localhost:5173')

    // 2️⃣ Presionar botón Login
    cy.contains('Login').click()

    // 3️⃣ Llenar los campos de email y contraseña
    cy.get('[data-testid="email-input"]').type('iamfelipediaz@gmail.com')
    cy.get('[data-testid="password-input"]').type('iamfelipediaz@gmail.com')

    // 4️⃣ Presionar botón de submit para loguearse
    cy.get('button[type="submit"]').click()

    // 5️⃣ Abrir el menú y entrar al panel de administración
    cy.get('i.mdi-menu').click()
    cy.contains('Admin').click({ force: true })
    cy.url().should('include', '/admin')

    // 6️⃣ Presionar botón "Agregar Curso"
    cy.contains('Agregar Curso').click()

    // 7️⃣ Verificar que se abre el modal
    cy.get('.v-dialog').should('be.visible')
    cy.get('[data-testid="codigo-input"]').should('exist')

    // 8️⃣ Llenar el formulario
    cy.get('[data-testid="codigo-input"]').type(codigo)
    cy.get('[data-testid="nombre-input"]').type(nombre)
    cy.get('[data-testid="img-input"]').type('https://example.com/img.png')
    cy.get('[data-testid="descripcion-input"]').type('Descripción de prueba')
    cy.get('[data-testid="duracion-input"]').type('10 horas')
    cy.get('[data-testid="cupos-input"]').clear().type('5')
    cy.get('[data-testid="inscritos-input"]').clear().type('0')
    cy.get('[data-testid="precio-input"]').type('100')
    cy.contains('Activo').click()

    // 9️⃣ Click en "Agregar Curso" y confirmar
    cy.get('[data-testid="agregar-btn"]').click()
    cy.get('[data-testid="agregar-confirm-btn"]').click()

    // 🔟 Verificar que el curso se creó
    cy.contains(codigo).should('exist')
    cy.contains(nombre).should('exist')

    // 1️⃣1️⃣ Eliminar el curso recién creado
    cy.contains(nombre)
      .parents('tr') // Busca la fila donde aparece el curso
      .within(() => {
        cy.contains('Eliminar').click({ force: true }) // o cambia por el selector del icono 🗑️
      })

    // 1️⃣2️⃣ Confirmar eliminación si aparece un diálogo
    cy.get('[data-testid="eliminar-confirm-btn"]').click()

    // 1️⃣3️⃣ Verificar que ya no aparece el curso en la lista
    cy.contains(nombre).should('not.exist')
  })
})
