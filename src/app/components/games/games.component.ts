import {Component, OnInit} from '@angular/core';
import {Game} from "../../models/game";
import {GameService} from "../../services/game.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{
  favorites = false;
  itemList: Game[] = [];
  items: Game[] = [];

  constructor(private gameService: GameService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadGames();
  }

  changeFavorite(item: any){
    item.favorite = !item.favorite;
    this.gameService.updateGame(item).subscribe(
      data => {
        if(item.favorite) {
          this.snackBar.open(
            'Añadido a favoritos', 'Close', {duration: 2000});
        } else this.snackBar.open(
          'Eliminado de favoritos', 'Close', {duration: 2000});

        this.loadFavorites();
      }
    )
  }

  favoriteList(){
    this.favorites = !this.favorites;
    this.loadFavorites();
  }

  search(event: any){
    this.itemList = this.items.filter(
      (item) => (item.title.toLowerCase().indexOf(event)>=0 ||
      item.subtitle.toLowerCase().indexOf(event)>=0 ||
      item.description.toLowerCase().indexOf(event)>=0 )
    );
  }

  deleteGame(game: Game) {
    if (confirm('Desea borrar el juego ' + game.title + '?')) {
      if (game.id) this.gameService.deleteGame(game.id).subscribe(
        (data: any) => {
          this.snackBar.open(
            data.message, 'Close', {duration: 2000});
          this.loadGames();
        }
      )
    }
  }

  private loadGames() {
    this.gameService.getGames().subscribe(
      (datos: Game[]) => {
        this.itemList = datos;
        this.items = datos;
      }
    )
  }

  private loadFavorites() {
    if(this.favorites) {
      this.itemList = this.items.filter(
        (item) => item.favorite
      )
    } else this.itemList = this.items;
  }
}
