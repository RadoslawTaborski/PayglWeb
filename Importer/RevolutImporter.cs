using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Importer
{
    class RevolutImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            foreach (var line in lines.Skip(1))
            {
                var currentLine = line;
                var cells = Regex.Split(currentLine, "[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))");
                if (cells[0] == "")
                {
                    break;
                }

                var date = DateTime.ParseExact(cells[2], "yyyy-MM-dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(new Transaction(date, "", cells[4] + " [Revolut "+ cells[7] + "]", "", "", cells[0], decimal.Parse(cells[5], System.Globalization.CultureInfo.InvariantCulture), cells[7]));
            }

            return result;
        }
    }
}
