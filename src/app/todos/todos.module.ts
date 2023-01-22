import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainComponent } from "./components/main/main.component";
import { TodoComponent } from "./components/todo/todo.component";
import { TodosComponent } from "./components/todos/todos.component";
import { TodosService } from "./services/todos.service";

const routes : Routes = [
 {
    path: '',
    component: TodosComponent
 }
]

@NgModule({
    declarations: [TodosComponent, TodoComponent, HeaderComponent, MainComponent, FooterComponent],
    exports: [TodosComponent],
    imports: [RouterModule.forChild(routes), CommonModule],
    providers: [TodosService]
})
export class TodosModule {

}