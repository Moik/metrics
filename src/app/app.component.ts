import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  email = 'turangr@gmail.com';
  password = 'D3rb1sh1r3';

  constructor(private firestore: Firestore) {}

  login(): void {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        const collect = collection(this.firestore, 'heartRate');
        collectionData(collect).subscribe(val => console.log(val.map(item => item['date'].toDate())));
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
