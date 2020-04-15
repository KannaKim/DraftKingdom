import { Misc } from '../Components/draft-kingdom-main/misc'
import { Inject } from '@angular/core'
export class PickAndBan {
  sessID: string
  red_pick: PickAndBanStyles[]
  red_ban: PickAndBanStyles[]
  blue_pick: PickAndBanStyles[]
  blue_ban: PickAndBanStyles[]
  constructor(sessID:string) {
    this.sessID = sessID
    this.red_pick = [new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles()
      , new PickAndBanStyles(), new PickAndBanStyles()]
    this.red_ban = [new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles()
      , new PickAndBanStyles(), new PickAndBanStyles()]
    this.blue_pick = [new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles()
      , new PickAndBanStyles(), new PickAndBanStyles()]
    this.blue_ban = [new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles()
      , new PickAndBanStyles(), new PickAndBanStyles()]
  }
}
export class PickAndBanStyles {
  img_src: string
  data_source_index: string
  constructor() {
    this.img_src = new Misc().original_pre_pick_src
    this.data_source_index = "null";
  }
}
