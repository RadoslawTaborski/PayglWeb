using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Importer
{
    class MillenniumImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            foreach (var line in lines.Skip(1))
            {
                var currentLine = line;
                var cells = SkipQuotations(currentLine.Split(new char[] { ',' }));
                if (cells[0] == "")
                {
                    break;
                }

                var date = DateTime.ParseExact(cells[1], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(cells[7] == ""
                    ? new Transaction(date, cells[5], cells[6] + " [Millenium]", cells[4], cells[0], cells[3], decimal.Parse(cells[8], System.Globalization.CultureInfo.InvariantCulture), cells[10])
                    : new Transaction(date, cells[5], cells[6] + " [Millenium]", cells[4], cells[0], cells[3], decimal.Parse(cells[7], System.Globalization.CultureInfo.InvariantCulture), cells[10]));
            }

            return result;
        }

        private string[] SkipQuotations(string[] cells)
        {
            var result = new List<string>();
            foreach(var res in cells)
            {
                result.Add(res.Replace("\"", ""));
            }
            return result.ToArray();
        }
    }
}
