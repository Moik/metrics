import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyDsF2WktxElNwaCXjg26IXuKCUnA83WK68',
        authDomain: 'ta-metrics.firebaseapp.com',
        databaseURL: 'https://ta-metrics-default-rtdb.europe-west1.firebasedatabase.app',
        projectId: 'ta-metrics',
        storageBucket: 'ta-metrics.appspot.com',
        messagingSenderId: '534795041184',
        appId: '1:534795041184:web:80dbef0d0113c0fe7a4cc5',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
