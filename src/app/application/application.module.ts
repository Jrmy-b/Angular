import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApplicationComponent } from './components/application/application.component';
import { ApplicationStoreModule } from './+store';

import { CoreModule } from 'app/core';
import { AuthenticationModule } from 'app/authentication';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ApplicationComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // DBModule.provideDB(schema),
    ApplicationStoreModule,    
    SharedModule.forRoot(),
    AuthenticationModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [ ApplicationComponent ]
})
export class ApplicationModule { }
