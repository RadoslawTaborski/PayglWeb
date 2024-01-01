using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Importer
{
    internal class AliorImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            var flag = false;
            foreach (var line in lines)
            {
                var currentLine = line;
                if (currentLine.Contains("Kryteria transakcji :") || currentLine.Contains("Data transakcji;Data księgowania;"))
                {
                    flag = true;
                    continue;
                }
                if (!flag)
                {
                    continue;
                }
                var cells = Regex.Split(currentLine, "[;]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
                if (cells[0] == "")
                {
                    break;
                }

                var date = DateTime.ParseExact(cells[0], "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(new Transaction(date, cells[2].Trim(), cells[4].Trim() + " [Alior]", cells[9], "", "",
                        decimal.Parse(cells[5]), cells[6]));
            }
            return result;
        }
    }
}