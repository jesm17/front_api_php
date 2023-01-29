import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.base_url_back;
  token = sessionStorage.getItem('token');
  constructor(private http: HttpClient) {}
  register(user: User) {
    return this.http.post(`${this.url}/register/user`, user);
  }
  getFavorites(id: string) {
    return this.http.get(`${this.url}/user/get/favorites/${id}`, {
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }
  addFavorite(favorite: Favorite) {
    return this.http.post(`${this.url}/user/add/favorites`, favorite, {
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }
  removeFavorite(id: number) {
    return this.http.delete(`${this.url}/user/delete/favorites/${id}`, {
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }
  getUser(id: number) {
    return this.http.get(`${this.url}/user/${id}`, {
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }
  updateAdditionalInfo(user: User) {
    return this.http.put(`${this.url}/user/update/addional-info`, user, {
      headers: { Authorization: 'Bearer ' + this.token },
    });
  }
}
