import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adminlogin',
  standalone: true,
  imports: [ CommonModule,FormsModule],
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {
  constructor(private adminApi:ApiService,private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('admintoken')
    if (token) {
      this.router.navigate(['/admin'])
    }
  }
  onSubmit(form: NgForm,f1:HTMLInputElement,f2:HTMLInputElement): void {
    this.adminApi.login(form.value).subscribe(
      (response) => {
      localStorage.setItem('admintoken', response.adminToken)
        this.router.navigate(['admin'])
      },
      (error) => {
        f1.style.border='1px solid red'
        f2.style.border='1px solid red'
        setTimeout(()=>{
        f1.style.border=''
        f2.style.border=''
        },5000)
        console.error( error);
      }
    );
  }
  navigateHome():void{
    this.router.navigate([''])
  }

}
