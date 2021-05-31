import { Component, OnInit } from '@angular/core';
import { CartService } from '../utils/cart.service';
import { Product } from '../utils/product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

  items$ = this.cartService.items$;
  ngOnInit(): void {
  }

  remove(item: Product) {
    this.cartService.removeFromCar(item);
  }

  checkout() {
    console.log('checkout')
    this.cartService.checkout();
  }

}
