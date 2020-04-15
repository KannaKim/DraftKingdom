using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

using LOL_pick_and_ban.Models;
using System.Text;
using LOL_pick_and_ban.Constant;
using System.Linq;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Util
{
    public class Generate
    {
        public static ChampionStyle GenerateStyle(string sessID,string[] championList)
        {
            Dictionary<string, ChampionStyleProperty> champStyleDic = new Dictionary<string, ChampionStyleProperty>();
            for(int i = 0; i < championList.Length; i++)
            {
                champStyleDic.Add(championList[i], new ChampionStyleProperty(true, "none", "pointer"));
            }

            return new ChampionStyle(sessID,champStyleDic);
        }
        public static async Task GeneratePickBanStyleFileAsync(string sessID, string path)
        {

            PickAndBan pb = new PickAndBan(sessID);
            string json_in = JsonConvert.SerializeObject(pb, Formatting.Indented);
            byte[] tmp = Encoding.ASCII.GetBytes(json_in);
            while (IO_Related.IsFileLocked(new FileInfo(path), FileMode.Create, FileAccess.Write))
            {
            }
            using (var fs = File.Open(path, FileMode.Open, FileAccess.Write, FileShare.Write))
            {
                await fs.WriteAsync(tmp);
            }
        }
        public static async Task GenerateChampionStyleFileAsync(string sessID,string path)
        {

            //init style per session
            string[] champion_name = Directory.GetFiles(UserDataConstant.ChampionSquareDir).Select(s => Path.GetFileName(s).Replace("_", "").Replace("Square.png", "").ToLower()).ToArray();
            //Util.Generate.SerializeStyleDic(champion_name, StylePerSess_path);
            ChampionStyle ch = GenerateStyle(sessID, champion_name);
            string json_in = JsonConvert.SerializeObject(ch, Formatting.Indented);
            byte[] tmp = Encoding.ASCII.GetBytes(json_in);
            while (IO_Related.IsFileLocked(new FileInfo(path), FileMode.Create, FileAccess.Write))
            {
            }
            using (var fs = File.Open(path, FileMode.Open, FileAccess.Write, FileShare.Write))
            {
                await fs.WriteAsync(tmp);
            }
            
        }


        public static string GenerateRandomID(int digits,string[] ranges)
        {
            string result = "";
            Random rand = new Random();

            List<char> randomCharNominees = new List<char>();

            for(int i =0; i< ranges.Length; i++)
            {
                randomCharNominees.AddRange(GenerateCharListInBetweenRange(ranges[i]));
            }


            for (int i = 0; i < digits; i++)
            {
                int randomIndex = rand.Next(0, randomCharNominees.Count-1);
                result += randomCharNominees[randomIndex];
            }
            return result;
        }
        public static List<char> GenerateCharListInBetweenRange(string range)
        {
            List<char> result = new List<char>();
            if (range[1] != '-' || range.Length != 3)
            {
                throw new FormatException(string.Format("format range {0} is not supported", range));
            }
            int startIndex = range[0];
            int endIndex = range[2];
            if (startIndex > endIndex)
            {
                throw new FormatException(string.Format("start index {0} can't be greater than end index {1}", startIndex, endIndex));
            }
            for(int i=startIndex; i<=endIndex; i++)
            {
                result.Add((char)i);
            }
            return result;
        }
    }
}
