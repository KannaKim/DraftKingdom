export class ChampionStyle {
  //public Dictionary<string, ChampionStyleProperty> champStyle { get; set; }
  sessID: string
  infoDic: { [id: string]: ChampionStyleProperty }
}
export class ChampionStyleProperty{
  draggable: boolean;
  cursor: string;
  filter: string;
}
