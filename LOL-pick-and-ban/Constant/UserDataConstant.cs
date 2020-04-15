using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Constant
{
    public static class UserDataConstant
    {
        public static readonly string ChampionSquareDir = @"./ClientApp/src/assets/lol-champion-square-img";
        
        public static readonly string UserDataDir = @"./UserData";

        public static readonly string StyleFileName = "style.json";
        public static readonly string PickAndBanFileName = "pickban.json";

        public static string GetChampionStylePerSessFilePath(string sessID)
        {
            return Path.Join(UserDataDir, sessID, StyleFileName);
        }
        public static string GetPickBanStylePerSessFilePath(string sessID)
        {
            return Path.Join(UserDataDir, sessID, PickAndBanFileName);
        }
    }
}
