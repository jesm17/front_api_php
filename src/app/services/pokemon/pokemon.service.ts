import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  base_url = environment.base_url_pokeApi;
  constructor(private http: HttpClient) {}
  getPokemons(limit: number, offset: number) {
    return this.http.get(
      `${this.base_url}pokemon?offset=${offset}&limit=${limit}`
    );
  }
  getOnePokemon(id: any) {
    return this.http.get(`${this.base_url}pokemon/${id}`);
  }
  getRefApi(url: string) {
    return this.http.get(url);
  }
}
