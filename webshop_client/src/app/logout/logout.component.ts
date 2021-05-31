import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email') && localStorage.getItem('lastName')) {
      localStorage.removeItem('email');
      localStorage.removeItem('lastName');
      this.loginService.logout().subscribe(msg => {
        console.log(msg);
        this.router.navigate(['main']);

      }, error => {
        console.log(error);
      });
    }
  }


}
