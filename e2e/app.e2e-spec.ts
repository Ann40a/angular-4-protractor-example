import { TodoAppPage } from './app.po';

describe('todo-app App', () => {
  let page: TodoAppPage;

  beforeEach(() => {
    page = new TodoAppPage();
    page.navigateTo();
  });

  it('should display "Todos" header', async () => {
    expect(await page.getAppHeader()).toEqual('Todos');
  });

  describe('todos', () => {
    beforeEach(() => {
      // Simulate test data
      page.addTodo('Test TODO #1');
      page.addTodo('Test TODO #2');
      page.changeTodoCompletion('Test TODO #2');
      page.addTodo('Test TODO #3');
    });

    it('should add a todo', async () => {
      const todosCount = await page.getTodos().count();

      const testTodo = 'New Test TODO';
      page.addTodo(testTodo);

      const resultingTodos = page.getTodos();
      expect(await resultingTodos.count()).toBe(todosCount + 1);
      expect(await resultingTodos.last().getText()).toBe(testTodo);
    });

    it('should complete a todo', async () => {
      const testTodo = 'New Test TODO';
      page.addTodo(testTodo);

      page.changeTodoCompletion(testTodo);

      expect(await page.isTodoCompeted(testTodo)).toBe(true);
    });

    it('should delete a todo', async () => {
      const testTodo = 'New Test TODO';
      page.addTodo(testTodo);

      page.deleteTodo(testTodo);

      expect(await page.findTodo(testTodo).isPresent()).toBe(false);
    });
  });
});
