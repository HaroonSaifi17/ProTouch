import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {

    this.route.paramMap.subscribe((params) => {
      const idFromUrl = params.get('id') })
  }
}
