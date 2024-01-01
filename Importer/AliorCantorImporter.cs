using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Importer
{
    internal class AliorCantorImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();
            var flag = false;
            foreach (var line in lines)
            {
                var currentLine = line;
                if (currentLine.Contains("Data księgowania;Data efektywna;"))
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
                var cells = Regex.Split(currentLine, "[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
                if (cells[0] == "")
                {
                    break;
                }
                var date = DateTime.ParseExact(cells[0], "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(new Transaction(date, "", cells[2].Trim() + $" [Alior Cantor {cells[4]}]", "", "", "",
                        decimal.Parse(cells[3].Replace('.',',')), cells[4]));
            }
            return result;
        }
    }
}