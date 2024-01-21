import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  public BookedMsg = '';
  public appointment: boolean = false;
  public cart:
    | { name: string; price: string; id: string; pid: string; pname: string }[]
    | undefined;
  total: number = 0;
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.getItems();
  }
  getItems() {
    this.cart = this.api.getArray();
    this.cart.forEach((items) => {
      this.total = this.total + parseInt(items.price);
    });
  }
  removeItem(i: number) {
    this.api.removeItemByIndex(i);
    this.getItems();
  }
  onSubmit(form: NgForm) {
    const data={
      name:form.value.name,
      number:parseInt(form.value.number),
      totalprice:this.total,
      orders:JSON.stringify(this.cart)
    }
    this.api.bookAppointment(data).subscribe((e: any) => {
      this.api.saveArrayToLocalStorage([]);
      this.getItems();
      this.appointment = false;
      this.BookedMsg =
        'Successfully booked you contact you as soon as possible. Reference Number: '+ e.id;
      setTimeout(() => {
        this.BookedMsg = '';
      }, 10000);
    });
  }
}
