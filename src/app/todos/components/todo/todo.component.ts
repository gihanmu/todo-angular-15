import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITodo } from "../../types/todos.interface";

@Component({
    selector: 'app-todos-todo',
    templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
   
    @Input('todo') todoProps: ITodo;
    @Input('isEditing') isEditingProps: boolean
    @Output('setTodoInEditMode') setTodoInEditModeEvent = new EventEmitter<string | null>();
    @Output('updateTodo') updateTodoEvent = new EventEmitter< {todo: ITodo | null, removeEdit?: boolean}>();
    inputText: string;
    @Output('removeTodo') removeTodoEvent = new EventEmitter<string>();
    
    ngOnInit(): void {
       this.inputText = this.todoProps.name;
    }

    setTodoInEditMode() {
        this.setTodoInEditModeEvent.emit(this.todoProps.id);
    }

    toggleTodo() {
        const updatedTodo: ITodo = {
            ...this.todoProps,
            isCompleted: !this.todoProps.isCompleted
            
        }
        this.updateTodoEvent.emit({todo: updatedTodo});
    }

    changeText(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.inputText = target.value;

    }

    updateTodo() {
        const updatedTodo: ITodo = {
            ...this.todoProps,
            name: this.inputText
            
        }
        this.updateTodoEvent.emit({todo: updatedTodo, removeEdit: true});
       
    }

    removeTodo() {
        this.removeTodoEvent.emit(this.todoProps.id);
    }
}