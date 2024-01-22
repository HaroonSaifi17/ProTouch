import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  public popup: boolean = false;

  productId!: string | null;
  products$:
    | Observable<{
        name: string;
        products: [
          {
            name: string;
            description: string;
            img: string;
            price: string;
            _id: string;
          }
        ];
      }>
    | undefined;

  apiUrl = environment.apiUrl;
  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productId = id;
      this.products$ = this.api.getProduct(id!);
    });
  }
  addToCart(
    name: string,
    price: string,
    id: string,
    ff: HTMLAnchorElement,
    pname: string
  ): void {
    if (ff.innerText == 'Add to Cart') {
      const pid = this.productId;
      this.api.updateArray({ name, price, id, pid, pname });
      ff.innerText = 'Successfully Added';
      ff.style.background = 'gray';
    }
  }
  delete(id: string) {
    this.api.deleteProduct(id, this.productId!).subscribe((e) => {
      this.products$ = this.api.getProduct(this.productId!);
    });
  }
  onSubmit(form: NgForm, img: HTMLInputElement) {
    let data = new FormData();
    data.append('name', form.value.name);
    data.append('description', form.value.description);
    data.append('img', img.files![0]);
    data.append('price', form.value.price);
    data.append('id', this.productId!);
    this.api.addProduct(data).subscribe((e) => {
      this.popup = false;
      this.products$ = this.api.getProduct(this.productId!);
    });
  }
}
