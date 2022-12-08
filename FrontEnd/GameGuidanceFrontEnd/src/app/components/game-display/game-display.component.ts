import { Component, OnInit, Input } from '@angular/core';
import { Search } from 'src/app/interfaces/gameInfo';
import { UserFavorite } from 'src/app/interfaces/user-favorite';
import { FavoriteService } from 'src/app/services/favorite.service';
import { IgnoreService } from 'src/app/services/ignore.service';


@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {

  search: string = "";
  favorites: UserFavorite[] = [];
  ignores: UserFavorite[] = [];
  favoritesIds: Number[] = [];
  ignoreIds: Number[] = [];

  @Input() searchResult: Search[] = [];

  constructor( 
    private favorite : FavoriteService,
    private ignore: IgnoreService,) { }

  ngOnInit(): void {
    this.getFavorites();
    this.getIgnore();
  }


  
   getFavorites = () : void => {
      this.favorite.getFavorites().subscribe((data: any) => {
        this.favorites = data;
        this.getFavoritesIds();
      });
    }
  
    getIgnore = () : void => {
      this.ignore.getIgnore().subscribe((data: any) => {
        this.ignores = data;
        this.getIgnoreIds();
      });
    }
  
    getFavoritesIds = () => {
      let ids: Number[] = [];
      this.favorites.forEach((fav) => {
        ids.push(fav.gameId);
      });
      this.favoritesIds = ids;
    };
  
    getIgnoreIds = () => {
      let ids: Number[] = [];
      this.ignores.forEach((ignore) => {
        ids.push(ignore.gameId);
      });  
      this.ignoreIds = ids;
    };
  
  addToFavorites(id: number){
    this.favorite.addfavorite(id).subscribe((data: any) => {
      this.getFavorites();
      this.getIgnore();
    }); 
    };

  removeFromFavorites(id: number){
    this.favorite.removeFavorite(id).subscribe((data: any) => {
      this.getFavorites();
    }); 
    }

    addToIgnore(id: number){
      this.ignore.addIgnore(id).subscribe((data: any) => {
        this.getFavorites();
        this.getIgnore();
      }); 
      };
}
