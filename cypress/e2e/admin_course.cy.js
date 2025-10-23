describe('Admin: Agregar, editar y eliminar curso', () => {
  it('loguearse, abrir menú, entrar a admin, crear, editar y eliminar un curso', () => {
    const codigo = 'C001'
    const nombre = 'Curso de Prueba'
    const nombreEditado = 'Curso de Prueba Editado'

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
    cy.get('[aria-label="Activo"]').click()

    // 9️⃣ Click en "Agregar Curso" y confirmar
    cy.get('[data-testid="agregar-btn"]').click()
    cy.get('[data-testid="agregar-confirm-btn"]').click()

    // 🔟 Verificar que el curso se creó
    cy.contains(codigo).should('exist')
    cy.contains(nombre).should('exist')
  // 4️⃣ Ir a la página de edición del curso
    cy.contains(nombre)
      .parents('tr')
      .within(() => {
        cy.contains('Editar').click({ force: true })
      })

    // 5️⃣ Verificar que el formulario de edición cargó usando inputs visibles
    cy.get('input[aria-label="nombre-input"]').should('exist')
    cy.get('[data-testid="editar-btn"]').should('exist')

    // 6️⃣ Modificar campos
    cy.get('input[aria-label="nombre-input"]').clear().type(nombreEditado)
    cy.get('input[aria-label="precio-input"]').clear().type('150')

    // 7️⃣ Guardar cambios
    cy.get('[data-testid="editar-btn"]').click()

    // 8️⃣ Verificar que se refleja la actualización en la lista
    cy.contains(nombreEditado).should('exist')
    cy.contains('150').should('exist')

    
    // 9️⃣ Eliminar el curso
    cy.contains(nombreEditado)
      .parents('tr')
      .within(() => {
        cy.contains('Eliminar').click({ force: true })
      })
    cy.get('[data-testid="eliminar-confirm-btn"]').click()
    cy.contains(nombreEditado).should('not.exist')
  })
})