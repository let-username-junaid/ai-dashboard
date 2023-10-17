import { Component, ElementRef, ViewChild } from '@angular/core';
import { DocumentChatService } from '../../document-chat.service';
import { Chat, ChatData } from '../../document-chat.model';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/modules/shared/services/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild("chatInput") chatInput!:ElementRef
  query = "";
  isGeneratingAnswer = false;
  chatHistory: Chat[] = []
  sideNavSub!: Subscription;
  chatLeftSpace = '250px'

  constructor(
    private documentChatService: DocumentChatService,
    private appService:AppService,
  ) { }

  ngAfterViewInit() {
    this.watchSideNav()
  }

  generateAnswer() {
    if (!this.query) return
    const query = this.query
    const chatId = this.chatHistory.length
    this.chatHistory.push({
      id: chatId,
      question: query,
      answer: "",
      isGeneratingAnswer: true,
      isError: false
    })
    this.query = ""
    this.isGeneratingAnswer = true
    this.documentChatService.getAnswer(query).subscribe({
      next: (res: ChatData) => {
        this.chatHistory[chatId].answer = res.answer
        this.chatHistory[chatId].isGeneratingAnswer = false
        this.chatHistory[chatId].isError = false
      },
      error: (err) => {
        this.chatHistory[chatId].isGeneratingAnswer = false
        this.chatHistory[chatId].isError = true
        throw err
      }
    })
  }
  watchSideNav() {
    this.sideNavSub = this.appService.sideNavBehaviourSubject.subscribe((isOpend) => {
      if(isOpend) this.chatLeftSpace="250px"
      else this.chatLeftSpace="0"
      this.chatInput.nativeElement.focus()
    })
  }
  ngOnDestroy(){
    this.sideNavSub.unsubscribe()
  }
}
