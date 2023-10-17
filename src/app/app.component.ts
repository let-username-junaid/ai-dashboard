import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from "@angular/material/sidenav";
import { AppService } from './modules/shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  navMode:MatDrawerMode = 'side';
  title = 'Ai Dashboard';
  menus=[
    {id:1,label:"Document Chat",icon:'fa fa-file-pdf-o',path:""},
  ]
  selectedMenu=this.menus[0];

  constructor(private appService:AppService){}

  ngOnInit() {
    if (window.innerWidth < 768) {
      this.navMode = 'over';
      this.appService.sideNavBehaviourSubject.next(false)
    }else{
      this.appService.sideNavBehaviourSubject.next(true)
    }

  }
  ngAfterViewInit(){
    this.drawer.closedStart.subscribe(()=>{
      this.appService.sideNavBehaviourSubject.next(false)
    })
    this.drawer.openedStart.subscribe(()=>{
      this.appService.sideNavBehaviourSubject.next(true)
    })
  }

  @HostListener('window:resize', ['$event'])
    onResize(event:any) {
        if (event.target.innerWidth < 768) {
            this.navMode = 'over';
            this.drawer.close();
        }
        if (event.target.innerWidth > 768) {
           this.navMode = 'side';
           this.drawer.open();
        }
    }

}
