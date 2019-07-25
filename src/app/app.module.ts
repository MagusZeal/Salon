import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LOCALE_ID, NgModule } from '@angular/core';
import LocaleCL from '@angular/common/locales/es-CL';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { MainNavModule } from './main-nav/main-nav.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthGuard } from './auth.guard';
import { CustomPreloadingStrategy } from './custom-preloading-strategy.service';
import { environment } from '../environments/environment';
import { HttpInterceptProviders } from './http-interceptors';


registerLocaleData(LocaleCL);

@NgModule({
  declarations: [
    AppComponent,
  
    
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MainNavModule,
    
  ],
  providers: [CustomPreloadingStrategy,
    AuthGuard,
    HttpInterceptProviders,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],



})
export class AppModule { }
