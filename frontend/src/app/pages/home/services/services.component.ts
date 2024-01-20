import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit{
  services:Observable<[{
    name:string,
    description:string,
    img:string
  }]> | undefined
  apiUrl= environment.apiUrl
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.services= this.api.getService()
  }

}
