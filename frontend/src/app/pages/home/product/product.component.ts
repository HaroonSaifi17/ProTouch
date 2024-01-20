import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  private cartItems: { name: string; price: number,id:string }[] = [];
  products$:
    | Observable<
        [
          {
            name: string;
            description: string;
            img: string;
            price: string;
            _id:string;
          },
        ]
      >
    | undefined;

  apiUrl = environment.apiUrl;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
  ) {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.products$ = this.api.getProduct(id!);
    });
  }
  addToCart(name: string, price: number,id:string): void {
    this.cartItems.push({ name, price,id });
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
