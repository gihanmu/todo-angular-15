import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { FilterEnum } from '../types/filter.enum';
import { ITodo } from '../types/todos.interface';

@Injectable()
export class TodosService {
  todos$: BehaviorSubject<ITodo[]> = new BehaviorSubject<ITodo[]>([]);
  filter$: BehaviorSubject<FilterEnum> = new BehaviorSubject<FilterEnum>(
    FilterEnum.ALL
  );

  addTodos(name: string): void {
    const newTodo: ITodo = {
      id: crypto.randomUUID(),
      name,
      isCompleted: false,
    };
    const updatedTodos: ITodo[] = [...this.todos$.getValue(), newTodo];
    this.todos$.next(updatedTodos);
  }

  updateAllTodos(isCompleted: boolean): void {
    const updatedTodos: ITodo[] = this.todos$.getValue().map((todo) => {
      return {
        ...todo,
        isCompleted,
      };
    });
    this.todos$.next(updatedTodos);
  }

  updateFilter(value: FilterEnum): void {
    this.filter$.next(value);
  }

  updateTodo(todo: ITodo): void {
    const updatedTodos = [...this.todos$.getValue()];
    const index = updatedTodos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      updatedTodos[index] = todo;
      this.todos$.next(updatedTodos);
    }
  }

  removeTodo(id: string): void {
    const updatedTodos = [...this.todos$.getValue()].filter(
      (todo) => todo.id !== id
    );
    this.todos$.next(updatedTodos);
  }
}
