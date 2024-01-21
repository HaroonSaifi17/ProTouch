import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard  {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('admintoken');
    if (token) {
      return true;
    } else {
      this.router.navigate(['adminlogin'])
      return false;
    }
  }
}
