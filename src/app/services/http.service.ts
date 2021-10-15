import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, Game } from '../entittes';
import { environment as env } from '../../environments/environment'
import { forkJoin, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }
  getGamesList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      console.log(search)
      params = params.append('search', search)
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, { params: params })
  }
  getGameDetails(gameId: number): Observable<Game> {

    const gameDetails = this.http.get(`${env.BASE_URL}/games/${gameId}`);
    const gameTrailers = this.http.get(`${env.BASE_URL}/games/${gameId}/movies`);
    const gameScreenshots = this.http.get(`${env.BASE_URL}/games/${gameId}/screenshots`)
    return forkJoin({
      gameDetails,
      gameTrailers,
      gameScreenshots,
    }).pipe(
      map((res: any) => {
        return {
          ...res['gameDetails'],
          trailers: res['gameTrailers'].results,
          screenshots: res['gameScreenshots'].results
        }
      })
    )



  }
}
