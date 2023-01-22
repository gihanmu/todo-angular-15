import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { ITodo } from '../../types/todos.interface';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<ITodo[]>;
  noTodosClass$: Observable<boolean>;
  isAllTodosCompleted$: Observable<boolean>;
  isEditingId: string | null = null;
  constructor(private todosService: TodosService) {
    this.isAllTodosCompleted$ = this.todosService.todos$.pipe(
      map((todos) => todos.every((todo) => todo.isCompleted))
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );

    this.visibleTodos$ = combineLatest([
      this.todosService.todos$,
      this.todosService.filter$,
    ]).pipe(
      map(([todos, filter]: [ITodo[], FilterEnum]) => {
        if (filter === FilterEnum.ACTIVE) {
          return todos.filter((todo) => !todo.isCompleted);
        } else if (filter === FilterEnum.COMPLETED) {
          return todos.filter((todo) => todo.isCompleted);
        }
        return todos;
      })
    );
  }

  updateAllTodos(event: Event) {
    const target = event.target as HTMLInputElement;

    this.todosService.updateAllTodos(target.checked);
  }

  setTodoInEditModeEvent(id: string | null) {
    this.isEditingId = id;
  }

  updateTodoEvent(data : {todo: ITodo | null, removeEdit?: boolean}) {
    if (data.todo) {
      this.todosService.updateTodo(data.todo);
    }
    if (data.removeEdit) {
        this.isEditingId = null;
    }
  }

  removeTodo(id: string) {
   this.todosService.removeTodo(id);
  }
}
