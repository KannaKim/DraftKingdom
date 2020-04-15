import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ChampionStyle } from '../Models/champion-style';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  base_url: string
  constructor(private http: HttpClient, @Inject('BASE_URL') base_url)
  {
    this.base_url = base_url
  }
  getChampionInfo():Observable<string[]>
  {
    return this.http.get<string[]>(this.base_url +"api/ChampionsName")
  }

}
