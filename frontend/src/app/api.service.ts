import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private arraySubject: BehaviorSubject<
    { name: string; price: string; id: string; pid: string; pname: string }[]
  >;
  public array$: Observable<
    { name: string; price: string; id: string; pid: string; pname: string }[]
  >;
  private arrayLengthSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public arrayLength$: Observable<number> =
    this.arrayLengthSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedValue = localStorage.getItem('cart');
    const array = storedValue ? JSON.parse(storedValue) : [];

    this.arraySubject = new BehaviorSubject<
      { name: string; price: string; id: string; pid: string; pname: string }[]
    >(array);
    this.array$ = this.arraySubject.asObservable();
    this.arrayLengthSubject = new BehaviorSubject<number>(array.length);
    this.arrayLength$ = this.arrayLengthSubject.asObservable();
  }

  updateArray(item: any): void {
    const currentArray = this.arraySubject.value;
    const newArray = [...currentArray, item];
    this.saveArrayToLocalStorage(newArray);
  }

  saveArrayToLocalStorage(array: any[]): void {
    localStorage.setItem('cart', JSON.stringify(array));
    this.arraySubject.next(array);
    this.arrayLengthSubject?.next(array.length);
  }
  removeItemByIndex(index: number): void {
    const currentArray = this.arraySubject.value;
    if (index < 0 || index >= currentArray.length) {
      return;
    }

    const newArray = [
      ...currentArray.slice(0, index),
      ...currentArray.slice(index + 1),
    ];
    this.saveArrayToLocalStorage(newArray);
  }

  getArray(): {
    name: string;
    price: string;
    id: string;
    pid: string;
    pname: string;
  }[] {
    return this.arraySubject.value;
  }
  getArrayLength(): Observable<number> {
    return this.arrayLength$;
  }
  getService(): Observable<
    [
      {
        name: string;
        description: string;
        img: string;
        _id: string;
        product: string[];
      }
    ]
  > {
    return this.http.get<
      [
        {
          name: string;
          description: string;
          img: string;
          _id: string;
          product: string[];
        }
      ]
    >(environment.apiUrl + '/api/getService');
  }
  getProduct(id: string): Observable<{
    name: string;
    products: [
      {
        name: string;
        description: string;
        img: string;
        _id: string;
        price: string;
      }
    ];
  }> {
    return this.http.get<{
      name: string;
      products: [
        {
          name: string;
          description: string;
          img: string;
          _id: string;
          price: string;
        }
      ];
    }>(environment.apiUrl + '/api/getProduct/' + id);
  }
  bookAppointment(data: {
    name: string;
    number: number;
    totalprice: number;
    orders: string;
  }): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      environment.apiUrl + '/api/book',
      data
    );
  }
  login(data: {
    username: string;
    password: string;
  }): Observable<{ adminToken: string }> {
    return this.http.post<{ adminToken: string }>(
      environment.apiUrl + '/admin/login',
      data
    );
  }
  addService(data: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.apiUrl + '/admin/addService',
      data
    );
  }
  addProduct(data: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      environment.apiUrl + '/admin/addProduct',
      data
    );
  }
  deleteService(id: string): Observable<void> {
    return this.http.delete<void>(
      environment.apiUrl + '/admin/deleteService/' + id
    );
  }
  deleteProduct(pid: string, sid: string): Observable<void> {
    const url = `${environment.apiUrl}/admin/deleteProduct/?pid=${pid}&sid=${sid}`;
    return this.http.delete<void>(url);
  }
  dashboard(): Observable<
    [
      {
        _id: string;
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
  > {
    return this.http.get<
      [
        {
          _id: string;
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
    >(environment.apiUrl + '/admin/dashboard');
  }

  complete(id:string): Observable<void> {
    return this.http.get<void>(environment.apiUrl + '/admin/completeOrder/' + id);
  }
}
