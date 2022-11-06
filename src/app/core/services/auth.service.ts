import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

import { LoginData } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = getAuth();

  login({ email, password }: LoginData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
