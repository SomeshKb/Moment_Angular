import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userLogged: BehaviorSubject<boolean> = new BehaviorSubject(this.isAuthenticated());

  constructor(private router:Router) { }

  isAuthenticated(): boolean {
    return localStorage.getItem('userData') ? true : false;
  }

  logOutUser(){
    localStorage.clear();
    this.userLogged.next(false);
    this.router.navigateByUrl('/login')
  }

  tokenExpire(){
    localStorage.clear();
    this.userLogged.next(false);
    this.router.navigateByUrl('/login')
  }

}
