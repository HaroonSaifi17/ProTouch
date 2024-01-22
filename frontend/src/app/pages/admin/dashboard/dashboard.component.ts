import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public data$:
    | Observable<
        [
          {
       _id:string;
            name: string;
            number: number;
            totalprice: number;
            pending: boolean;
            items: {
              name: string;
              price: string;
              id: string;
              pid: string;
              pname: string;
            }[];
          }
        ]
      >
    | undefined;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.data$ = this.api.dashboard();
  }
  totalSales(
    data: [
      {
       _id:string;
        name: string;
        number: number;
        totalprice: number;
        pending: boolean;
        items: {
          name: string;
          price: string;
          id: string;
          pid: string;
          pname: string;
        }[];
      }
    ]
  ): number {
    let price=0
    data.forEach(item=>{
      price=price+item.totalprice
    })
    return price;
  }
  totalprice(
    data:{
        items: {
          name: string;
          price: string;
          id: string;
          pid: string;
          pname: string;
        }[]
}
  ): number {
    let price=0
    data.items.forEach(item=>{
      price=price+parseInt(item.price)
    })
    return price;
  }
  complete(id:string){
     this.api.complete(id).subscribe(e=>{
    this.data$ = this.api.dashboard();
    })
  }
}
