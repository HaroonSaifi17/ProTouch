import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  constructor(
    private router: Router,
    private api: ApiService,
  ) {}
  services:
    | Observable<
        [
          {
            name: string;
            description: string;
            img: string;
            _id: string;
          },
        ]
      >
    | undefined;
  apiUrl = environment.apiUrl;
  ngOnInit(): void {
    this.services = this.api.getService();
  }
  navigateProduct(id: string): void {
    this.router.navigate(['/product/' + id]);
  }
}
