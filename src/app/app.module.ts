import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {RippleModule} from "primeng/ripple";
import {LoginComponent} from "./modules/components/login/login.component";
import {PasswordModule} from "primeng/password";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {UserComponent} from "./modules/components/user/user.component";
import {EventComponent} from "./modules/components/event/event.component";
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ConfirmationService, MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    HttpClientModule,
    TableModule,
    CalendarModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
