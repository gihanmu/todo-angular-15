import { Component } from "@angular/core";
import { map, Observable } from "rxjs";
import { TodosService } from "../../services/todos.service";
import { FilterEnum } from "../../types/filter.enum";

@Component({
    selector: 'app-todos-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    noTodosClass$: Observable<boolean>;
    activeTodosCount$: Observable<number>;
    activeCountText$: Observable<string>;
    filter$: Observable<FilterEnum>;
    readonly filterEnumValues = FilterEnum;

    constructor(private todoService: TodosService) {
        this.noTodosClass$ = this.todoService.todos$.pipe(
            map(todos => todos.length === 0)
        );


        this.activeTodosCount$ = this.todoService.todos$.pipe(
            map(todos => todos.filter(todo => ! todo.isCompleted).length)
        );

        this.activeCountText$ = this.activeTodosCount$.pipe(
            map(todos => todos === 1 ? 'item' : 'items')
        )
        this.filter$ = this.todoService.filter$;


    }

    changeFilter(event: Event, value: FilterEnum): void {
        event.preventDefault();
        this.todoService.updateFilter(value);
        
    }

}