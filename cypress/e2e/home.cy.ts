describe('Главная страница', () => {
  it('успешно загружается и содержит правильный текст', () => {
    cy.visit('/');
    cy.contains('Home page').should('be.visible');
  });
});

