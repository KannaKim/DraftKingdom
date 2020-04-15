using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LOL_pick_and_ban.Constant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LOL_pick_and_ban.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChampionsNameController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> GetChampionList()
        {
            return Directory.GetFiles(UserDataConstant.ChampionSquareDir).Select(s => Path.GetFileName(s));
        }
    }
}