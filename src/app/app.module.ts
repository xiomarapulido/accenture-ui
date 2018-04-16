import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {app_routing} from './app.routes';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientRegisterComponent } from './components/client-register/client-register.component';
import { BodyComponent } from './components/body/body.component';
import { CreditRegisterComponent } from './components/credit-register/credit-register.component';
import { FormsModule } from '@angular/forms';
import { CreditRequestService } from './services/credit-request.service';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ClientRegisterComponent,
    BodyComponent,
    CreditRegisterComponent
  ],
  imports: [
    BrowserModule,
    app_routing,    
    FormsModule,    
    HttpClientModule
  ],
  providers: [
    CreditRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
