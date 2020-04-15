using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using LOL_pick_and_ban.Models;
using System.Net.Http;
using System.IO;
using Newtonsoft.Json;
using System.Text;
using LOL_pick_and_ban.Util;
using LOL_pick_and_ban.Constant;

namespace LOL_pick_and_ban.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PickAndBansController : ControllerBase
    {
        [HttpGet("{id}")]
        public PickAndBan GetPickAndBanAsync(string id)
        {
            byte[] buffer = new byte[20000];

            while (IO_Related.IsFileLocked(new FileInfo(UserDataConstant.GetPickBanStylePerSessFilePath(id)), FileMode.Open, FileAccess.Read))
            {
            }
            //using (var fs = System.IO.File.Open(UserDataConstant.GetPickBanStylePerSessFilePath(id), FileMode.Open, FileAccess.Read/*, FileShare.Read*/))
            //{
            //    await fs.ReadAsync(buffer);
            //}
            //string json_out = Encoding.UTF8.GetString(buffer);
            string json_out = System.IO.File.ReadAllText(UserDataConstant.GetPickBanStylePerSessFilePath(id));
            PickAndBan result = JsonConvert.DeserializeObject<PickAndBan>(json_out);
            return result;
        }
        [HttpPost]
        public void UpdatePickAndBanAsync(PickAndBan pb)
        {
            string json_out = JsonConvert.SerializeObject(pb, Formatting.Indented);
            //byte[] buffer = Encoding.UTF8.GetBytes(json_out);

            //var buffer = Encoding.UTF8.GetBytes(json_out);
            while (IO_Related.IsFileLocked(new FileInfo(UserDataConstant.GetPickBanStylePerSessFilePath(pb.sessID)), FileMode.Open, FileAccess.Read))
            {
            }
            System.IO.File.WriteAllText(UserDataConstant.GetPickBanStylePerSessFilePath(pb.sessID), json_out);
            //using (var fs = System.IO.File.Open(UserDataConstant.GetPickBanStylePerSessFilePath(pb.sessID), FileMode.Open, FileAccess.Write))
            //{
            //    fs.Write(buffer);
            //}
        }
        //// POST: api/PickAndBans
        //// To protect from overposting attacks, please enable the specific properties you want to bind to, for
        //// more details see https://aka.ms/RazorPagesCRUD.
        //[HttpPost]
    }
}
