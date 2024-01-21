import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../api.service';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

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
    pname:string
  ): void {
    if (ff.innerText == 'Add to Cart') {
      const pid = this.productId;
      this.api.updateArray({ name, price, id, pid,pname });
      ff.innerText = 'Successfully Added';
      ff.style.background = 'gray';
    }
  }
}
