using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace Importer
{
    class PKOImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            foreach (var line in lines.Skip(1))
            {
                var currentLine = line;
                var cells = SkipQuotations(Regex.Split(currentLine, "[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))"));

                var date = DateTime.ParseExact(cells[0], "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                result.Add(new Transaction(date, "", Join(cells[6], cells[7], cells[8], cells[9], "[PKO]"), "", "", "", decimal.Parse(cells[3], System.Globalization.CultureInfo.InvariantCulture), cells[4]));
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

        private string Join(params string[] strings)
        {
            return string.Join(" ", strings.Where(s => !string.IsNullOrEmpty(s)));
        }
    }
}
