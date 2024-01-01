using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Importer
{
    internal class IngImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            var flag = false;
            foreach (var line in lines)
            {
                var currentLine = line;
                if (currentLine.Contains("\"Data transakcji\";\"Data księgowania\";"))
                {
                    flag = true;
                    continue;
                }
                if (!flag)
                {
                    continue;
                }
                currentLine = currentLine.Replace("\"", "");
                currentLine = currentLine.Replace("\'", "");
                var cells = Regex.Split(currentLine, "[;]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
                if (cells[0] == "")
                {
                    break;
                }

                var date = DateTime.ParseExact(cells[0], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(cells[8] == ""
                    ? new Transaction(date, cells[2].Trim(), cells[3].Trim() + " [ING]", cells[4], cells[5], cells[6],
                        decimal.Parse(cells[10]), cells[11])
                    : new Transaction(date, cells[2].Trim(), cells[3].Trim() + " [ING]", cells[4], cells[5], cells[6],
                        decimal.Parse(cells[8]), cells[9]));
            }

            return result;
        }
    }
}