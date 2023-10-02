import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { LoginComponent } from './components/login/login.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RippleModule} from "primeng/ripple";
import { UserComponent } from './components/user/user.component';
import { EventComponent } from './components/event/event.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";


@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    EventComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    CardModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
  ]
})
export class ModulesModule { }
