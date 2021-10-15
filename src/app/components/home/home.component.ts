import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/entittes';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  selectOptions: string[] = ["name", "released", "added", "created", "-created", "updated", "rating", "-rating", "metacritic",]
  selected = ""
  routeSub!: Subscription
  games$: Observable<APIResponse<Game>> | undefined;
  constructor(private http: HttpService, private router: Router

    , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      if (params["game-search"]) {
        this.searchGames(this.selected, params["game-search"])
      }
      else {
        this.searchGames(this.selected)
      }
    })
  }

  searchGames(sort: string, searh?: string): void {
    this.games$ = this.http.getGamesList(sort, searh)
  }
  openGameInfo(id: string): void {
    if (id)
      this.router.navigate(["details", id])
  }
  ngOnDestroy(): void {
    if (this.routeSub)
      this.routeSub.unsubscribe()
  }
}
