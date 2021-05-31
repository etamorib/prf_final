import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginService } from '../utils/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  @ViewChild('container')
  containerRef?: ElementRef;
  @ViewChild('signIn')
  signInRef?: ElementRef;
  @ViewChild('signUp')
  signUpRef?: ElementRef;

  email: string;
  password: string;
  lastName: string;

  registerForm!: FormGroup;
  submitted= false;

  private ngUnsubscribe = new Subject();


  constructor(private renderer: Renderer2, private loginService: LoginService, private router: Router,
    private formBuilder: FormBuilder) {
    this.email = '';
    this.password = '';
    this.lastName = '';
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  ngAfterViewInit() {
    if (this.signUpRef) 
      this.renderer.listen(this.signUpRef.nativeElement, 'click', () => {
        this.containerRef?.nativeElement.classList.add('right-panel-active');
      });

    if (this.signInRef) {
      this.renderer.listen(this.signInRef.nativeElement, 'click', () => {
        console.log(this.containerRef?.nativeElement.classList);
        this.containerRef?.nativeElement.classList.remove('right-panel-active');
      });
    }
  }

  login() {
    if (this.email != '' && this.password != '') {
      console.log('fine')
      this.loginService.login(this.email, this.password).subscribe(msg => {
        console.log(msg.body);
        if(msg.body) {
          this.lastName = msg.body;
        }
        localStorage.setItem('email', this.email);
        localStorage.setItem('lastName', this.lastName);
        this.router.navigate(['main']);
      }, error => {
        console.log(error);
      })
    } else{
      console.log('empty fields')
    }
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.loginService.register(this.registerForm.value).subscribe(msg => {
      console.log(msg.body);
      if(msg.body) {
        this.lastName = msg.body;
      }
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    })
  } 

get f() { return this.registerForm.controls; }

ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

}
