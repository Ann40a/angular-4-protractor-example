import { browser, element, by, Key } from 'protractor';

export class TodoAppPage {
  todoSelector = '.todo-list li';
  completeToggleSelector = '.toggle';
  deleteBtnSelector = '.destroy';

  navigateTo() {
    return browser.get('/');
  }

  getAppHeader() {
    return element(by.css('app-root h1')).getText();
  }

  getNewTodoInput() {
    return element(by.css('input.new-todo'));
  }

  addTodo(text: string) {
    this.getNewTodoInput().sendKeys(text, Key.ENTER);
  }

  getTodos() {
    return element.all(by.css(this.todoSelector));
  }

  findTodo(text: string) {
    return element(by.cssContainingText(this.todoSelector, text));
  }

  getCompletionToggle(text: string) {
    return this.findTodo(text).element(by.css(this.completeToggleSelector));
  }

  changeTodoCompletion(text: string) {
    this.getCompletionToggle(text).click();
  }

  deleteTodo(text: string) {
    const todo = this.findTodo(text);
    this.hoverElement(todo); // In order to make delete button visible
    todo.element(by.css(this.deleteBtnSelector)).click();
  }

  isTodoCompeted(text: string) {
    return this.getCompletionToggle(text).isSelected();
  }

  hoverElement(elem) {
    browser.actions().mouseMove(elem).perform();
  }
}
