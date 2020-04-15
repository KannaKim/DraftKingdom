using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Models
{
    public class ChampionStyle
    {
        public string sessID { get; set; }
        public Dictionary<string, ChampionStyleProperty> infoDic { get; set; }
        public ChampionStyle(string sessID,Dictionary<string, ChampionStyleProperty> infoDic)
        {
            this.infoDic = infoDic;
            this.sessID = sessID;
        }
    }
    public class ChampionStyleProperty
    {
        public bool draggable = true;
        public string filter= "none";
        public string cursor = "pointer";
        public ChampionStyleProperty(bool draggable, string filter, string cursor)
        {
            this.draggable = draggable;
            this.filter = filter;
            this.cursor = cursor;
        }
    }
}
