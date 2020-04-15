import { Component, OnInit } from '@angular/core';
import { LeagueService } from './Services/league.service'
import { LeagueModel } from './Models/league-model';
import { timer, interval, Observable } from 'rxjs';
import { visitAll } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LOL-pick-ban';
  constructor() {

  }
}
  
