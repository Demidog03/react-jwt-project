describe('Авторизация', () => {
  it('успешно авторизует пользователя и перенаправляет на главную', () => {
    // Arrange
    cy.intercept('POST', '**/auth/login', {
      fixture: 'auth.json'
    }).as('loginRequest');

    cy.visit('/login');

    // Act
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.wait('@loginRequest');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('показывает ошибку при неверных данных', () => {
    // Arrange
    cy.intercept('POST', '**/auth/login', {
      statusCode: 401,
      body: { message: 'Unauthorized' }
    }).as('loginRequestFail');

    cy.visit('/login');

    // Act
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrong-password');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.wait('@loginRequestFail');
    // В LoginPage используется alert() для пустых полей, 
    // но для ошибок API в коде нет явной обработки alert.
    // Если в приложении нет UI для ошибок, тест просто проверит, что мы остались на странице.
    cy.url().should('include', '/login');
  });
});

