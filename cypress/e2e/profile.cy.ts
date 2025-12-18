describe('Профиль пользователя', () => {
  beforeEach(() => {
    // Мокаем профиль
    cy.intercept('GET', '**/users/profile', {
      fixture: 'profile.json'
    }).as('getProfile');
    
    // Имитируем наличие токена (если он хранится в localStorage)
    // Если используется Zustand с persist, нужно знать ключ.
    // Если просто в памяти, то проще зайти через логин или установить стейт.
  });

  it('отображает данные профиля', () => {
    // Если страница защищена AuthPageGuard, нам нужно сначала "залогиниться"
    // Для простоты мокаем логин и переходим на профиль
    cy.intercept('POST', '**/auth/login', { fixture: 'auth.json' });
    
    cy.visit('/login');
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button[type="submit"]').click();

    cy.visit('/profile');
    cy.wait('@getProfile');

    cy.contains('Name: Иван Иванов').should('be.visible');
    cy.contains('Email: ivan@example.com').should('be.visible');
    cy.contains('Created at: 01.01.2023').should('be.visible'); // Формат зависит от локали
  });
});

