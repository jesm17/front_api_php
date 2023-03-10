import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/models/login';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  endpoint = environment.base_url_back;
  constructor(private http: HttpClient) {}

  login(user: Login): Observable<any> {
    return this.http.post(`${this.endpoint}/user/login`, user);
  }
}
