import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Game } from 'src/app/entittes';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit, OnDestroy {
  gameRating: number = 0
  game!: Game
  gameId: number = 0
  componentActive = true
  color: string = ''

  constructor(private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.route.params.pipe(takeWhile(() => this.componentActive)).subscribe((params: Params) => {
      if (params['id'])
        this.gameId = params['id'];
      this.getGameInfo(this.gameId);
    })
  }
  getGameInfo(gameId: number) {
    this.http.getGameDetails(gameId)
      .pipe(takeWhile(() => this.componentActive)).subscribe(res => {
        this.game = res
        console.log(this.game)
        setTimeout(() => {
          this.gameRating = res.metacritic
        }, 1000)
      })
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false
  }

}
