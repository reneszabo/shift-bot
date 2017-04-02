import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShiftService } from './services/shift/shift.service';
// App views
import { MainViewModule } from './views/main-view/main-view.module';
import { MinorViewModule } from './views/minor-view/minor-view.module';
// App modules/components
import { LayoutsModule } from './components/common/layouts/layouts.module';
import { SocketIoService } from './services/socket/socket-io.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    // Views
    MainViewModule,
    MinorViewModule,
    // Modules
    LayoutsModule,
  ],
  providers: [ShiftService, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
