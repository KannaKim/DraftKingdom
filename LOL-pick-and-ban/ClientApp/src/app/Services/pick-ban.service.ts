import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PickAndBan } from '../Models/PickAndBan'
import { Router } from '@angular/router'
import { ChampionStyle, ChampionStyleProperty } from '../Models/champion-style';
@Injectable({
  providedIn: 'root'
})
export class PickBanService {
  base_url: string
  session_id = this.router.url.replace("/", "")
  req: HttpRequest<any>
  constructor( private http: HttpClient, @Inject("BASE_URL") base_url: string, private router: Router) {
    this.base_url = base_url;
    console.log("baseurl " + base_url)
    console.log("router")
    console.log(this.router)
  }
  getPickAndBan(): Observable<PickAndBan>{
    return this.http.get<PickAndBan>(this.base_url + "api/PickAndBans/" + this.session_id)
  }
  getChampionStyle(): Observable<ChampionStyle> {
    return this.http.get<ChampionStyle>(this.base_url + "api/ChampionStyle/" + this.session_id);
  }
  updateChampionStyle(sessID, infoDic: { [id: string]: ChampionStyleProperty }) {
    this.http.post(this.base_url + "api/ChampionStyle/", { sessID: sessID, infoDic: infoDic }).subscribe(
      () => { console.log("style saved successfully")}
      )
  }
  updatePickAndBan(pb: PickAndBan) {
    //let player_pick_ban_info = new PlayerPickBanInfo(id, red_pk_img_arr, red_bn_img_arr, blue_pk_img_arr, blue_bn_img_arr)

    this.http.post(this.base_url + "api/PickAndBans/",
      {
        "sessID": pb.sessID,
        "blue_ban": pb.blue_ban,
        "blue_pick": pb.blue_pick,
        "red_ban": pb.red_ban,
        "red_pick": pb.red_pick,
      }).subscribe(() => console.log("PickAndBans successfully saved"))
    }
}

