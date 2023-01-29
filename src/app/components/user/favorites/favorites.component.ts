import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  constructor(
    private userService: UserService,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar,
  ) {}
  isVisibleMessage: boolean = false;
  title:string = 'Mis favoritos'
  userFavorites: any[] = [];
  message!: string;
  pokemons: any = [];
  user_id: any = sessionStorage.getItem('user_id');
  ngOnInit(): void {
    this.getFavorites();
  }
  getFavorites() {
    this.userService.getFavorites(this.user_id).subscribe(
      (res: any) => {
        console.log(res);

        if (res.message) {
          this.message = res.message;
          this.isVisibleMessage = true;
        }
        this.userFavorites = res.userFavorites;
        for (let i = 0; i < this.userFavorites.length; i++) {
          const url = this.userFavorites[i].ref_api;
          this.pokemonService.getRefApi(url).subscribe((res) => {
            this.pokemons[i] = res;
            this.pokemons[i].favoriteId = this.userFavorites[i].id;
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  removeFavorite(id: number) {
    this.userService.removeFavorite(id).subscribe(
      (res: any) => {
        this.openSnackBar(res.message);
        setTimeout(() => {
          document.location.reload();
        }, 1300);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar');
  }
}
