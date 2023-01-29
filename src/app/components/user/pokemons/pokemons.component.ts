import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css'],
})
export class PokemonsComponent {
  searchForm!: FormGroup;
  pokemons: any = [];
  pokemon: any = [];
  onePokemon: any = [];
  l: any = 12; // limit
  o: any = 0; // offset
  hidden: boolean = false;
  hiddenP: boolean = true;
  isVisibleButtonNext: boolean = true;
  shearh: any = {
    name: '',
  };

  pokemonDetail: any = [{ name: '', sprites: { front_default: '' } }];
  totalPokemons: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  favorites: any[] = [];
  user_id: any = sessionStorage.getItem('user_id');
  newFavorite: Favorite = {
    ref_api: '',
    user_id: this.user_id,
  };
  constructor(
    private pokemonService: PokemonService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.initForm();
  }
  ngOnInit(): void {
    this.getFavorites();
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons(this.l, this.o).subscribe(
      (res: any) => {
        this.totalPokemons = res.count;
        this.totalPages = this.totalPokemons / 12;
        this.totalPages = parseInt(this.totalPages.toPrecision(10));

        for (let i = 0; i < res.results.length; i++) {
          const element = res.results[i];
          this.pokemons = element.name;

          this.pokemonService.getOnePokemon(this.pokemons).subscribe(
            (res: any) => {
              this.pokemon[i] = res;
              this.pokemon[i].isFavorite = false;
            },
            (err: any) => {
              console.log(err);
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFavorites() {
    this.userService.getFavorites(this.user_id).subscribe(
      (res: any) => {
        this.favorites = res.userFavorites;
        for (let i = 0; i < this.pokemon.length; i++) {
          for (let j = 0; j < this.favorites.length; j++) {
            const name = this.favorites[j].ref_api.split('/').pop();
            if (
              this.pokemon[i].name == name &&
              this.pokemon[i].isFavorite == false
            ) {
              this.pokemon[i].favoriteId = this.favorites[j].id;
              this.pokemon[i].isFavorite = true;
            }
          }
        }
        console.log(this.pokemon);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addFavorites(name: string) {
    this.newFavorite.ref_api = environment.base_url_pokeApi + `pokemon/${name}`;
    this.userService.addFavorite(this.newFavorite).subscribe(
      (res: any) => {
        this.openSnackBar(res.message);
        this.router.navigate(['/my-favorites']);
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

  nextPokemon() {
    this.hidden = true;
    this.o = this.o + 12;
    this.currentPage++;
    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages;
      this.isVisibleButtonNext = false;
    }
    this.getPokemons();
  }

  backPokemon() {
    if (this.o == 12) {
      this.hidden = false;
    }
    if (this.currentPage <= this.totalPages) {
      this.isVisibleButtonNext = true;
    }
    this.currentPage = this.currentPage - 1;
    this.o = this.o - 12;
    this.getPokemons();
  }
  getOnePokemon(id: any) {
    this.pokemonService.getOnePokemon(id).subscribe(
      (res: any) => {
        this.onePokemon[0] = res;
        this.hiddenP = false;
      },
      (err) => {
        const message = `El pokemon ${id}  no existe`;
        this.openSnackBar(message);
      }
    );
  }
  initForm(): void {
    this.searchForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar');
  }
  details(name: string) {
    this.pokemonDetail = this.pokemon.filter((e: any) => e.name == name);

    console.log(this.pokemonDetail);
  }
}
