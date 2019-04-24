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



registerLocaleData(LocaleCL);

@NgModule({
  declarations: [
    AppComponent,
  
    
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAEuWcpnCL2ctm5lc0Wu-7ho1TaORoxMJQ",
      authDomain: "devs-c9cdc.firebaseapp.com",
      databaseURL: "https://devs-c9cdc.firebaseio.com",
      projectId: "devs-c9cdc",
      storageBucket: "devs-c9cdc.appspot.com",
      messagingSenderId: "477801868148"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MainNavModule,
    
  ],
  providers: [CustomPreloadingStrategy,
    AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    { provide: LOCALE_ID, useValue: 'es-CL' }],
  bootstrap: [AppComponent],



})
export class AppModule { }
