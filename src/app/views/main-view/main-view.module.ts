import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MainViewComponent} from './main-view.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [MainViewComponent],
    imports     : [BrowserModule, ReactiveFormsModule],
})
export class MainViewModule {}
