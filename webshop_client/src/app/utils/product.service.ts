import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from './product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(category: string): Observable<Product[]>{
    let url = environment.serverUrl + '/products/' + category;
    return this.http.get<Product[]>(url);

  }
}
