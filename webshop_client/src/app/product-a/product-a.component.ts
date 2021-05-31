import { Component, OnInit } from '@angular/core';
import { ProductService } from '../utils/product.service';
import { Product } from '../utils/product.interface'
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CartService } from '../utils/cart.service';

@Component({
  selector: 'app-product-a',
  templateUrl: './product-a.component.html',
  styleUrls: ['./product-a.component.css']
})
export class ProductAComponent implements OnInit {

  category = '';

  productList!: Observable<Product[]>;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private cartService: CartService) {

  }

  ngOnInit(): void {
    this.productList = this.activatedRoute.paramMap.pipe(
      map((paramMap) => paramMap.get('category')),
      filter((category):category is string => !!category), switchMap(category => this.productService.getProducts(category))
    );

  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }


}


