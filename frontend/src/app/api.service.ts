import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getService(): Observable<
    [
      {
        name: string;
        description: string;
        img: string;
        _id: string;
        product: string[];
      },
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
        },
      ]
    >(environment.apiUrl + '/api/getService');
  }
}
