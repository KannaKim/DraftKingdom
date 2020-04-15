using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LOL_pick_and_ban.Util
{
    public class IO_Related
    {
        public static bool IsFileLocked(FileInfo file, FileMode fileMode, FileAccess fileRead)
        {   //from https://stackoverflow.com/questions/876473/is-there-a-way-to-check-if-a-file-is-in-use
            try
            {
                using (FileStream stream = file.Open(fileMode, fileRead, FileShare.None))
                {
                    stream.Close();
                }
            }
            catch (IOException)
            {
                //the file is unavailable because it is:
                //still being written to
                //or being processed by another thread
                //or does not exist (has already been processed)
                return true;
            }

            //file is not locked
            return false;
        }
    }
}
