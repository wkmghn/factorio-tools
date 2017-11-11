using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

namespace RenameIcon
{
    class Program
    {
        static void Main(string[] args)
        {
            string path = @"G:\data\Documents\GitHub\factorio-tools\Recipe\images\item-icons";
            foreach (string filename in Directory.EnumerateFiles(path))
            {
                string s = Path.GetFileName(filename);
                while (true)
                {
                    int index = s.IndexOf('_');
                    if (index < 0)
                    {
                        break;
                    }

                    s = s.Remove(index, 1);
                    s = s.Insert(index, s[index].ToString().ToUpper());
                    s = s.Remove(index + 1, 1);
                }

                string newFilename = Path.Combine(Path.GetDirectoryName(filename), s);
                if (newFilename != filename)
                {
                    if (File.Exists(newFilename))
                    {
                        File.Delete(newFilename);
                    }
                    File.Move(filename, newFilename);
                }
            }
        }
    }
}
