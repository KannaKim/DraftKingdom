using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using LOL_pick_and_ban.Constant;
using LOL_pick_and_ban.Models;
using LOL_pick_and_ban.Util;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChampionStyleController : ControllerBase
    {
        [HttpGet("{id}")]
        public ChampionStyle GetChampionStyleListAsync(string id)
        {
            //byte[] buffer=new byte[20000];

            while (IO_Related.IsFileLocked(new FileInfo(UserDataConstant.GetChampionStylePerSessFilePath(id)),FileMode.Open,FileAccess.Read))
            {
            }
            //using (var fs = System.IO.File.Open(UserDataConstant.GetChampionStylePerSessFilePath(id), FileMode.Open, FileAccess.Read))
            //{
            //    await fs.ReadAsync(buffer);
            //}
            //string json_out = Encoding.UTF8.GetString(buffer);
            string json_out = System.IO.File.ReadAllText(UserDataConstant.GetChampionStylePerSessFilePath(id));
            ChampionStyle result = JsonConvert.DeserializeObject<ChampionStyle>(json_out);
            return result;
        }
        [HttpPost]
        public void UpdateChampionStyleListAsync(ChampionStyle champStyle)
        {
            string json_out = JsonConvert.SerializeObject(champStyle, Formatting.Indented);
            //byte[] buffer = Encoding.UTF8.GetBytes(json_out);

            //var buffer = Encoding.UTF8.GetBytes(json_out);
            while (IO_Related.IsFileLocked(new FileInfo(UserDataConstant.GetChampionStylePerSessFilePath(champStyle.sessID)), FileMode.Open, FileAccess.Write))
            {
            }
            System.IO.File.WriteAllText(UserDataConstant.GetChampionStylePerSessFilePath(champStyle.sessID), json_out);
            //using (var fs = System.IO.File.Open(UserDataConstant.GetChampionStylePerSessFilePath(champStyle.sessID), FileMode.Open))
            //{
            //    await fs.WriteAsync(buffer);
            //}
        }
    }
}