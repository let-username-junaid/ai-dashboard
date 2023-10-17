import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentChatService } from '../../document-chat.service';
import { FileDetails } from '../../document-chat.model';
import { ToastrService } from 'ngx-toastr';  
import { BadRequestError } from 'src/app/modules/shared/errors/bad-request-error';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-uploaded-documents',
  templateUrl: './uploaded-documents.component.html',
  styleUrls: ['./uploaded-documents.component.scss']
})
export class UploadedDocumentsComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selecteFileName="";
  displayedColumns: string[] = ["originalFileName","numberOfToken","totalCost","createdOn","actions"];
  dataSource = new MatTableDataSource<FileDetails>();
  isLoading=false;
  isFileUploading=false;


  constructor(
    private documentChatService:DocumentChatService,
    private toasterService:ToastrService
  ){}

  ngOnInit(){
    this.getUploadedDocuments()
  }

  selectDocument(event:any){
    this.selecteFileName=event.target.files[0].name
    this.uploadDocument(event.target.files[0])
  }

  uploadDocument(file:File){
    this.isFileUploading=true
    this.documentChatService.uploadDocument(file).subscribe({
      next:()=>{
        this.toasterService.success("Document uploaded successfully")
        this.getUploadedDocuments()
        this.isFileUploading=false
      },
      error:(err)=>{
        this.isFileUploading=false
        if (err instanceof BadRequestError)
          this.toasterService.error(err.originalError.message)
        else throw(err)
      }
    })
  }

  getUploadedDocuments(){
    this.isLoading=true
    this.documentChatService.getUploadedDocuments().subscribe({
      next:(fileDetails:FileDetails[])=>{
        this.selecteFileName=""
        this.dataSource.data=fileDetails
        this.dataSource.paginator=this.paginator
        this.dataSource.sort=this.sort
        this.isLoading=false
      },
      error:(err)=>{
        this.isLoading=false
        throw(err)
      }
    })
  }

  deleteDocument(id:string){
    this.isLoading=true
    this.documentChatService.deleteDocument(id).subscribe({
      next:()=>{
        this.dataSource.data=this.dataSource.data.filter(item=>item._id!==id)
        this.toasterService.success("Document deleted successfully")
        this.isLoading=false
      },
      error:(err)=>{
        this.isLoading=false
        if (err instanceof BadRequestError)
          this.toasterService.error(err.originalError.message)
        else if (err instanceof NotFoundError)
          this.toasterService.error("Document wit given id does not exists")
        else throw(err)
      }
    })
  }

 
}
