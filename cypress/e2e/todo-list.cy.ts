describe('Список дел (Todo List)', () => {
  beforeEach(() => {
    // Перехватываем запрос к API
    cy.intercept('GET', '**/api/todos', {
      fixture: 'todos.json'
    }).as('getTodos');
  });

  it('отображает лоадер во время загрузки', () => {
    // Замедляем ответ, чтобы успеть увидеть лоадер
    cy.intercept('GET', '**/api/todos', {
      fixture: 'todos.json',
      delay: 1000
    }).as('getTodosSlow');

    cy.visit('/home/todo-list');
    cy.contains('Загрузка...').should('be.visible');
    cy.wait('@getTodosSlow');
    cy.contains('Загрузка...').should('not.exist');
  });

  it('успешно отображает список задач из фикстуры', () => {
    cy.visit('/home/todo-list');
    cy.wait('@getTodos');

    cy.get('li').should('have.length', 3);
    cy.contains('Купить молоко').should('be.visible');
    cy.contains('Изучить Cypress').should('be.visible');
    cy.contains('Написать тесты').should('be.visible');
  });
});

