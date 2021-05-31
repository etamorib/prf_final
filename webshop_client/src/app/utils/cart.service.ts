import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { take, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, public datePipe: DatePipe) {
    let existingCartItems = JSON.parse(localStorage.getItem('products'));
    if (!existingCartItems) {
      existingCartItems = [];
    }
    this.itemsSubject.next(existingCartItems);
  }
  private ngUnsubscribe = new Subject();
  private itemsSubject = new BehaviorSubject<Product[]>([]);
  items$ = this.itemsSubject.asObservable();


  addToCart(product: Product) {
    this.items$.pipe(
      take(1),
      map((products) => {
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
      }),
    ).subscribe();
  }

  removeFromCar(product: Product) {
    this.items$.pipe(
      take(1),
      map((products) => {
        const index: number = products.indexOf(product);
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
      }),
    ).subscribe();
  }

  checkout() {
    this.items$.pipe(
      take(1),
      map((products) => {
        products.forEach(product => {
          console.log(product._id)
          this.postTransaction(product).subscribe(msg => {
            console.log(msg);
          });
        })
        this.removeAll();
        console.log('done');
        localStorage.removeItem('products');
      }),
    ).subscribe();

    
  }

  removeAll() {
    this.items$.pipe(
      take(1),
      map((products) => {
        products.splice(0);
      })
    ).subscribe();
  }

  postTransaction(product: Product) {
    let date = new Date();
    let curr_date = this.datePipe.transform(date , 'yyyy-MM-dd');
    console.log(environment.springUrl + '/transaction');
    return this.http.post(environment.springUrl + '/transaction', {product: product._id, price: product.productPrice, date: curr_date},
    {withCredentials: true, responseType: 'text'});
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
