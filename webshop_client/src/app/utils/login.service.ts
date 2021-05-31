import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(environment.serverUrl + '/login', {email: email, password: password}, 
    {withCredentials: true, 
    responseType: 'text', observe: 'response' as 'response'});
  }

  logout() {
    return this.http.get(environment.serverUrl + '/logout', 
    {withCredentials: true, responseType: 'text'});
  }

  register(user: User) {
    return this.http.post(environment.serverUrl + '/register', user,
    {withCredentials: true, 
      responseType: 'text', observe: 'response' as 'response'})
  }
}
