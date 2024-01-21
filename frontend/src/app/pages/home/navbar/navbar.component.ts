import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  cartLength$:Observable<number>|undefined
  constructor(private router: Router,private api:ApiService) { }
  ngOnInit(): void {
    this.cartLength$=this.api.getArrayLength()
  }
  public navStatus: boolean = false
  toggleClass(list: HTMLDivElement): void {
    if(window.innerWidth>=640){
      return
    }
    if (list.style.right == '0px') {
      list.style.right = '-100%'
      this.navStatus = false
      document.body.classList.remove('scroll-lock')
    } else {
      list.style.right = '0px'
      this.navStatus = true
      document.body.classList.add('scroll-lock')
    }
  }
  adminLogin() {
    this.router.navigateByUrl('adminlogin')
  }
  navigate(fregment: string): void {
    this.router.navigateByUrl('' + fregment)
  }
}
