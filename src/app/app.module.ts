import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { provideToastr } from 'ngx-toastr';
import { GlobalErrorHandler } from './modules/shared/errors/global-error-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
  providers:[
    provideToastr(),
    {provide:ErrorHandler,useClass:GlobalErrorHandler}]
})
export class AppModule { }
