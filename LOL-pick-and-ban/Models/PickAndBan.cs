using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Models
{
    public class PickAndBan
    {
        public string sessID { get; set; }
        public PickAndBanStyles[] red_pick { get; set; }
        public PickAndBanStyles[] blue_pick { get; set; }
        public PickAndBanStyles[] red_ban { get; set; }
        public PickAndBanStyles[] blue_ban { get; set; }
        public PickAndBan(string sessID)
        {
            this.sessID = sessID;
            red_pick = new PickAndBanStyles[5] { new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles(),
                                                    new PickAndBanStyles(),new PickAndBanStyles(),};
            red_ban = new PickAndBanStyles[5] { new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles(),
                                                    new PickAndBanStyles(),new PickAndBanStyles(),};
            blue_pick = new PickAndBanStyles[5] { new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles(),
                                                    new PickAndBanStyles(),new PickAndBanStyles(),};
            blue_ban = new PickAndBanStyles[5] { new PickAndBanStyles(), new PickAndBanStyles(), new PickAndBanStyles(),
                                                    new PickAndBanStyles(),new PickAndBanStyles(),};
        }
    }
    public class PickAndBanStyles
    {
        public string img_src { get; set; }
        public string data_source_index { get; set; }
        public PickAndBanStyles()
        {
            img_src = "../assets/icon/question-mark.svg";
            data_source_index = "null";
        }
    }
}
