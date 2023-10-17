import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from '../errors/not-found-error';
import { AppError } from '../errors/application-error';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  constructor(
    private httpClient:HttpClient,
    private toasterService:ToastrService
  ) { }

  get<T>(url:string,options?:any){
    return this.httpClient.get<T>(url,options).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  post<T>(url:string,body:any|null,options?:any){
    return this.httpClient.post<T>(url,body,options).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  put<T>(url:string,body:any|null,options?:any){
    return this.httpClient.put<T>(url,body,options).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  delete<T>(url:string,options?:any){
    return this.httpClient.delete<T>(url,options).pipe(
      catchError(this.handleError.bind(this))
    )
  }

  handleError(error:Response){
    if(error.status==400) return throwError(()=>new BadRequestError(error))
    if(error.status==404) return throwError(()=>new NotFoundError(error))
    this.toasterService.error("Sorry something went wrong.")
    return throwError(()=>new AppError(error))
  }

}
