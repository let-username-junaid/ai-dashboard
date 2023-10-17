import { Component,ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent {
  showChat=true
  constructor(private changeDetectorRef:ChangeDetectorRef){}

  selectedIndexChange(index:number){
    this.showChat=false
    if(index==0){
      setTimeout(()=>{
        this.showChat=true
        this.changeDetectorRef.detectChanges()
      },900)
    }
  }
}
