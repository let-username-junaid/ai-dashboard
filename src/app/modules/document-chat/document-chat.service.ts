import { Injectable } from '@angular/core';
import { UrlConstants } from '../shared/constants/url-constants';
import { GenericResponse } from '../shared/models/response.models';
import { ChatData, FileDetails } from './document-chat.model';
import { GenericHttpService } from '../shared/services/generic-http.service';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentChatService {

  constructor(private genericHttpService:GenericHttpService) { }

  getUploadedDocuments(){
    return this.genericHttpService.get<GenericResponse<FileDetails[]>>(UrlConstants.uploads).pipe(
      map((res:any)=>res.data)
    )
  }

  uploadDocument(file:File){
    const formData = new FormData()
    formData.set("file",file)
    const httpOption={
      headers:new Headers().set("content-type","multipart/form-data")
    }
    return this.genericHttpService.post<GenericResponse<string>>(UrlConstants.upload,formData,httpOption)
  }

  deleteDocument(id:string){
    return this.genericHttpService.delete<GenericResponse<String>>(UrlConstants.deleteById(id))
  }

  getAnswer(query:string){
    return this.genericHttpService.post<GenericResponse<ChatData>>(UrlConstants.chat,{question:query}).pipe(
      map((res:any)=>res.data))
  }
}
