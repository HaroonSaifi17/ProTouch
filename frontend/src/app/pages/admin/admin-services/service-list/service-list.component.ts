import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css',
})
export class ServiceListComponent implements OnInit {
  public popup: boolean = false;
  constructor(
    private router: Router,
    private api: ApiService,
  ) {}
  services$:
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
    this.services$ = this.api.getService();
  }
  navigateProduct(id: string): void {
    this.router.navigate(['/admin/services/products/' + id]);
  }
  delete(id: string) {
    this.api.deleteService(id).subscribe((e) => {
      this.services$ = this.api.getService();
    });
  }
  onSubmit(form: NgForm, img: HTMLInputElement) {
    let data = new FormData();
    data.append('name', form.value.name);
    data.append('description', form.value.description);
    data.append('img', img.files![0]);
    this.api.addService(data).subscribe((e) => {
      this.popup = false;
      this.services$ = this.api.getService();
    });
  }
}
