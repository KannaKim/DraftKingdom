import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  option_img_opacity = "0.2"
  popup_menu_opacity = "0.4"
  popup_menu_visibility = "hidden"

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }
  PopupMouseLeave(event) {
    this.popup_menu_opacity = "0.4"
  }
  PopupMouseEnter(event) {
    this.popup_menu_opacity = "0.8"
  }
  OptionsMouseEnter(event) {
    console.log("OptionsMouseEnter")
    this.option_img_opacity = "1"
  }
  OptionsMouseLeave(event) {
    console.log("OptionsMouseLeave")
    this.option_img_opacity = "0.2"
  }
  OptionsClick(event) {
    console.log("OptionsClick")
    if (this.popup_menu_visibility == "visible") {
      this.popup_menu_visibility = "hidden"
    }
    else {
      this.popup_menu_visibility = "visible"
    }
  }
}
