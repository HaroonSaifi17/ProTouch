import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  public isClassAdded: Boolean = false
  public height: number = 0
  public hi1:string=''
  constructor(private router: Router) {
    this.height = window.innerHeight
    this.hi1=`${this.height}px`
  }

  ngOnInit(): void {
  }
  logout(): void {
    localStorage.removeItem('admintoken')
    this.router.navigate(['adminlogin'])
  }
  goHome(): void {
    this.router.navigate(['/'])
  }
}
