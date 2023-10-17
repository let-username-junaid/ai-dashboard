import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadedDocumentsComponent } from './components/uploaded-documents/uploaded-documents.component';
import { DocumentChatRoutingModule } from './document-chat.routing.module';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    UploadedDocumentsComponent,
    MainScreenComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    DocumentChatRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class DocumentChatModule { }
