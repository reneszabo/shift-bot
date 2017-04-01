import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShiftService } from './services/shift/shift.service';
// App views
import {MainViewModule} from './views/main-view/main-view.module';
import {MinorViewModule} from './views/minor-view/minor-view.module';
import {LoginModule} from './views/login/login.module';
import {RegisterModule} from './views/register/register.module';
// App modules/components
import {LayoutsModule} from './components/common/layouts/layouts.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // Views
    MainViewModule,
    MinorViewModule,
    LoginModule,
    RegisterModule,
    // Modules
    LayoutsModule,
  ],
  providers: [ShiftService],
  bootstrap: [AppComponent]
})
export class AppModule { }
