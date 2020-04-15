using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LOL_pick_and_ban.Util;
using LOL_pick_and_ban.Models;
using LOL_pick_and_ban.Constant;
using System.IO;


namespace LOL_pick_and_ban.Controllers
{
    [Route("")]
    [ApiController]
    public class HomeController : ControllerBase
    {

        [HttpGet]
        public async Task<IActionResult> RedirectToRandomID()
        {
            
            string id = Generate.GenerateRandomID(5, new string[] { "A-Z", "a-z", "0-9" });

            while(Directory.Exists(Path.Join(UserDataConstant.UserDataDir,id)) == true)
            {
                //if there's already same id then re-roll
                id = Generate.GenerateRandomID(5, new string[] { "A-Z", "a-z", "0-9" });
            }


            PickAndBan pick_and_ban = new PickAndBan(id);

            string user_data_per_sess_dir = Path.Join(UserDataConstant.UserDataDir, id);
            
            string style_per_sess_path = Path.Join(UserDataConstant.UserDataDir,id, UserDataConstant.StyleFileName);
            string pickban_style_per_sess_path = Path.Join(UserDataConstant.UserDataDir, id, UserDataConstant.PickAndBanFileName) ;
            


            if (Directory.Exists(user_data_per_sess_dir) == false)
            {
                Directory.CreateDirectory(user_data_per_sess_dir); ;
                await Generate.GenerateChampionStyleFileAsync(id, UserDataConstant.GetChampionStylePerSessFilePath(id));
                await Generate.GeneratePickBanStyleFileAsync(id, UserDataConstant.GetPickBanStylePerSessFilePath(id));
            }
            return RedirectToAction("", id);
        }
        
    }

}