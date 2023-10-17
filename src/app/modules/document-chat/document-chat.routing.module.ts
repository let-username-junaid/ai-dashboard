import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { MainScreenComponent } from "./components/main-screen/main-screen.component";

const routes:Route[]=[{
    path:"",
    component:MainScreenComponent
}]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DocumentChatRoutingModule{}
