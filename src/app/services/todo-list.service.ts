import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  {title: 'Install NodeJS'},
  {title: 'Install Angular CLI'},
  {title: 'Create new App'},
  {title: 'Serve App'},
  {title: 'Develop App'},
  {title: 'Deploy App'},
];

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoList: TodoItem[];

  constructor(private storageService: StorageService) {
  this.todoList = 
    storageService.getData(todoListStorageKey) || defaultTodoList;
  }

  getTodoList() {
    return this.todoList;
  }

  addItem(item: TodoItem) { 
    this.todoList.push(item);
    this.saveList();
  }

  updateItem(item: TodoItem, changes) {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = { ...item, ...changes };
    this.saveList();
  }

  saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }

  deleteItem(item: TodoItem) {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }
}