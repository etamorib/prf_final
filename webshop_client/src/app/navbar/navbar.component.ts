import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CartService } from '../utils/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  email: string;
  password: string;
  lastName: string;

  constructor(private router: Router, private cartService: CartService) {
    this.email='';
    this.password='';
    this.lastName = '';
   }

   items$ = this.cartService.items$;

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  login() {
    if(this.email != '' && this.password != '') {
      this.router.navigate(['/home'])
    }
  }

  isLocalStorageValue() {
    const val = localStorage.getItem('lastName');

    if (val != null){
      this.lastName = val;
      return true;
    }

    return false;
  }


}
