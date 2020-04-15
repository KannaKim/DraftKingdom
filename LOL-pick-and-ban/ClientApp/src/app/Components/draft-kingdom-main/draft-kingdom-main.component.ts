import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeagueService } from 'src/app/Services/league.service';
import { PickBanService } from 'src/app/Services/pick-ban.service';
import { PickAndBan, PickAndBanStyles } from 'src/app/Models/PickAndBan'
import { ChampionStyle } from 'src/app/Models/champion-style'
import { LeagueModel } from 'src/app/Models/league-model'
import { DomSanitizer } from '@angular/platform-browser'
import { Router } from '@angular/router';
import { Misc } from 'src/app/Components/draft-kingdom-main/misc'
interface IPerson {
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-draft-kingdom-main',
  templateUrl: './draft-kingdom-main.component.html',
  styleUrls: ['./draft-kingdom-main.component.css']
})
export class DraftKingdomMainComponent implements OnInit,AfterViewInit {

  champion_id:string[];
  
  pick_original_width:number;
  pick_original_height:number;
  pick_original_margin:number;

  
  pick_highlighted_increment:number = 10;

  dragged_img_src:string;
  dragged_event;

  lastTypedWord = ""

  ms: Misc

  champList:LeagueModel[]



  pb: PickAndBan
 
  champStylePerSession: ChampionStyle

  session_id = this.router.url.replace("/","")

  constructor(private router: Router, private _LeagueService: LeagueService, private _PickBanService: PickBanService, private _sanitization: DomSanitizer) {
    console.log("this is pick ban service")

    this.pb = new PickAndBan(this.session_id)
    this.ms = new Misc()

    this.champList = []
    this.champion_id = []


    console.log(this.pb)

    console.log("init")
    this._PickBanService.getChampionStyle().subscribe(championStylePerSession => {
      this.champStylePerSession = championStylePerSession
    })
    this._LeagueService.getChampionInfo().subscribe(champion_list => this.champListInit(champion_list)
      , () => { })


    this.RefreshesDataPerInterval(500)
  }
  ngOnInit(){
    //this.RefreshPickAndBans()
    
  }
  RefreshesDataPerInterval(interval: number) {
    setInterval(() => this.RefreshPickAndBans(), interval)
    setInterval(() => this.RefreshChampStylePerSession(), interval)
  }
  champListInit(champion_list: string[]) {
   
    console.log(this.champList)
    for (let i = 0; i < champion_list.length; i++) {
      this.champion_id.push(champion_list[i].replace("Square.png", "").replace(/_/g,"").toLowerCase())
      this.champList.push({
        name: champion_list[i], cursor: "pointer",
        draggable: true, filter: "none", visible: true
      })
    }
    console.log("id")
    console.log(this.champion_id)
   }

  
  ngAfterViewInit(){
    this.pick_original_width = document.querySelector<HTMLImageElement>(".pick img").width; 
    this.pick_original_height = document.querySelector<HTMLImageElement>(".pick img").height; 
    this.pick_original_margin = Number(window.getComputedStyle(document.querySelector<HTMLImageElement>(".pick")).margin.replace("px",""));
  }
  RefreshChampStylePerSession() {
    this._PickBanService.getChampionStyle().subscribe(championStylePerSession => {
      this.champStylePerSession = championStylePerSession
    }, () => { })
    for (let i = 0; i < this.champList.length; i++) {
      this.champList[i].filter = this._sanitization.bypassSecurityTrustStyle(this.champStylePerSession.infoDic[this.champion_id[i]].filter)
      this.champList[i].draggable = this.champStylePerSession.infoDic[this.champion_id[i]].draggable;
      this.champList[i].cursor = this.champStylePerSession.infoDic[this.champion_id[i]].cursor;
    }
 }
  RefreshPickAndBans() {
    this._PickBanService.getPickAndBan().subscribe(pb => {
      this.pb = pb
      console.log("pb")
      console.log(this.pb)
    })
  }
  TrackByIndex(index,item){
    return index
  }
  PickDragLeave(event){
    this.UnHighlightPick(event)
  }
  BluePickDrop(event){
    console.log("BluePickDrop")
    console.log(this.pb.blue_pick)
    this.SwapImageEvent(event, "bluePick-", this.pb.blue_pick)
    this.UnHighlightPick(event)
    this._PickBanService.updatePickAndBan(this.pb)
  }
  RedPickDrop(event){
    console.log("RedPickDrop")
    console.log(event)
    this.SwapImageEvent(event,"redPick-",this.pb.red_pick)
    this.UnHighlightPick(event)
    this._PickBanService.updatePickAndBan(this.pb)
  }
  BlueBanDrop(event){
    console.log("BlueBanDrop")
    this.SwapImageEvent(event, "blueBan-", this.pb.blue_ban)
    this._PickBanService.updatePickAndBan(this.pb)
  }
  RedBanDrop(event){
    console.log("RedBanDrop")
    this.SwapImageEvent(event, "redBan-", this.pb.red_ban)
    this._PickBanService.updatePickAndBan(this.pb)
  }
  DisableSelectedChampion(selected_champion_id:number)
  {
    console.log("disabled " + selected_champion_id)

    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].filter = "grayscale(1)"
    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].draggable = false
    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].cursor = "default"

    this.champList[selected_champion_id].filter = this._sanitization.bypassSecurityTrustStyle(this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].filter)
    this.champList[selected_champion_id].draggable = this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].draggable;
    this.champList[selected_champion_id].cursor = this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].cursor;

    this._PickBanService.updateChampionStyle(this.session_id, this.champStylePerSession.infoDic)
    console.log("asd")
  }
  ReEnableSelectedChampion(selected_champion_id: number) {
    console.log("reEnable")
    console.log(selected_champion_id)
    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].filter = "none"
    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].draggable = true
    this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].cursor = "pointer"

    this.champList[selected_champion_id].filter = this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].filter
    this.champList[selected_champion_id].draggable = this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].draggable;
    this.champList[selected_champion_id].cursor = this.champStylePerSession.infoDic[this.champion_id[selected_champion_id]].cursor

    this._PickBanService.updateChampionStyle(this.session_id, this.champStylePerSession.infoDic)
  }
  SwapImageEvent(event, img_target_disc, swapSource: PickAndBanStyles[]) {
    console.log("SwapImageEvent")
    let id = Number(String(event.target.id).replace(img_target_disc,""))
    let tmp = swapSource[Number(id)].img_src //the one that's about to be overrided
    swapSource[id].img_src = this.dragged_img_src 

    let dragged_index = this.dragged_event.target.getAttribute("data-champion-index")
    let drop_to_index = event.target.getAttribute("data-champion-index")
    if(this.dragged_event.target.className == "champion-list-thumbnail"){

      if(tmp != this.ms.original_pre_pick_src){ // if there's already a champion that's already being hovered
        this.ReEnableSelectedChampion(drop_to_index)
      }
      this.DisableSelectedChampion(dragged_index)
      event.target.setAttribute("data-champion-index",dragged_index)
    }
    else{
      event.target.setAttribute("data-champion-index",dragged_index)
      this.dragged_event.target.setAttribute("data-champion-index",drop_to_index)
      if(this.dragged_event.target.parentNode.className == "pick"){
        if(String(this.dragged_event.target.id).startsWith("bluePick-")){
          let id = String(this.dragged_event.target.id).replace("bluePick-","")
          this.pb.blue_pick[Number(id)].img_src = tmp
        }
        else if(String(this.dragged_event.target.id).startsWith("redPick-")){
          let id = String(this.dragged_event.target.id).replace("redPick-","")
          this.pb.red_pick[Number(id)].img_src = tmp
        }
      }
      else if(this.dragged_event.target.parentNode.parentNode.classList.contains("ban-phase")){
        if(String(this.dragged_event.target.id).startsWith("blueBan-")){
          let id = String(this.dragged_event.target.id).replace("blueBan-","")
          this.pb.blue_ban[Number(id)].img_src= tmp
        }
        else if(String(this.dragged_event.target.id).startsWith("redBan-")){
          let id = String(this.dragged_event.target.id).replace("redBan-","")
          this.pb.red_ban[Number(id)].img_src= tmp
        }
      }
    }
  }
  BanDragEnter(event){
    console.log("BanDragEnter")
  }
  BanDragLeave(event){
    console.log("BanDragLeave")
  }

  UnHighlightPick(event){
    event.target.style.width = this.pick_original_width.toString()+"px"
    event.target.style.height = this.pick_original_height.toString()+"px"
    event.target.parentNode.style.margin = (this.pick_original_margin).toString()+"px"
  }
  HighlightPick(event){
    event.target.style.width = (this.pick_original_width + this.pick_highlighted_increment).toString()+"px"
    event.target.style.height = (this.pick_original_height + this.pick_highlighted_increment).toString()+"px"
    event.target.parentNode.style.margin = (this.pick_original_margin - this.pick_highlighted_increment).toString()+"px"
  }
  DragOver(event){
    event.preventDefault();
    console.log("DragOver")
    console.log(event)
    console.log(event.target)
  }
  DragStart(event){
    this.dragged_img_src = event.target.src
    this.dragged_event = event
    console.log("Drag Start")
    console.log(event.target.src)
    console.log(this.dragged_event)
  }
  ChampionContainerDrop(event){
    console.log("champlist")
    if(this.dragged_event.target.parentNode.className == "pick"){
      if(String(this.dragged_event.target.id).startsWith("bluePick-")){
        let dropping_to_id = Number(String(this.dragged_event.target.id).replace("bluePick-", ""))
        let selected_champion_index = this.dragged_event.target.getAttribute("data-champion-index")
        console.log(this.dragged_event.target.getAttribute("data-champion-index"))
        this.ReEnableSelectedChampion(selected_champion_index)
        console.log("originaled")
        this.pb.blue_pick[dropping_to_id].img_src = this.ms.original_pre_pick_src
        this.pb.blue_pick[dropping_to_id].data_source_index = null;
        //this.dragged_event.target.removeAttribute("data-champion-index")
      }
      else if(String(this.dragged_event.target.id).startsWith("redPick-")){
        let dropping_to_id = Number(String(this.dragged_event.target.id).replace("redPick-",""))
        let selected_champion_index = Number(this.dragged_event.target.getAttribute("data-champion-index"))
        this.ReEnableSelectedChampion(selected_champion_index)
        console.log("originaled")
        this.pb.red_pick[dropping_to_id].img_src = this.ms.original_pre_pick_src
        this.pb.red_pick[dropping_to_id].data_source_index = null
        //this.dragged_event.target.removeAttribute("data-champion-index")
      }
    }
    else if(this.dragged_event.target.parentNode.parentNode.classList.contains("ban-phase")){
      if(String(this.dragged_event.target.id).startsWith("blueBan-")){
        let dropping_to_id = Number(String(this.dragged_event.target.id).replace("blueBan-",""))
        let selected_champion_index = Number(this.dragged_event.target.getAttribute("data-champion-index"))
        this.ReEnableSelectedChampion(selected_champion_index)
        console.log("originaled")
        this.pb.blue_ban[dropping_to_id].img_src = this.ms.original_pre_pick_src
        this.pb.blue_ban[dropping_to_id].data_source_index = null;
        //this.dragged_event.target.removeAttribute("data-champion-index")
      }
      else if(String(this.dragged_event.target.id).startsWith("redBan-")){
        let dropping_to_id = Number(String(this.dragged_event.target.id).replace("redBan-",""))
        let selected_champion_index = Number(this.dragged_event.target.getAttribute("data-champion-index"))
        this.ReEnableSelectedChampion(selected_champion_index)
        console.log("originaled")
        this.pb.red_ban[dropping_to_id].img_src = this.ms.original_pre_pick_src
        this.pb.red_ban[dropping_to_id].data_source_index = null;
        //this.dragged_event.target.removeAttribute("data-champion-index")
      }
    }
    this._PickBanService.updatePickAndBan(this.pb)
  }
  ChampDrageEnd(event){
    
  }
  PickDragEnter(event){
    console.log("Enter")
    console.log(event)
    this.HighlightPick(event)
  }


  ChampSearch(event){
    let typedWord:string = event.target.value.trim();
    
    console.log("champion "+this.champion_id)
    for(let i=0;i<this.champion_id.length;i++){
      let last_j = -1;
      let missmatched = false; //flag to see if mismatch has occured
      for(let typed_i=0;typed_i<typedWord.length;typed_i++){
        for(let j=last_j+1;j<this.champion_id[i].length;j++){
          if(this.champion_id[i].charAt(j)==typedWord[typed_i]){
            last_j = j

            if(j == this.champion_id[i].length-1 && typedWord.length - typed_i -1 > 0 ){
              this.champList[i].visible = false
              missmatched = true
            }
            break
          }
          else if(j == this.champion_id[i].length -1 ){
            //.... and hasn't been matched then it is not matched
            this.champList[i].visible = false
            missmatched = true
          }
        } 
      }
      if(missmatched == false){
        this.champList[i].visible=true
      }
    }
    
    
    this.lastTypedWord = typedWord
  }

}
