import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    handleError(error: any){
        console.log(error)
    }
}