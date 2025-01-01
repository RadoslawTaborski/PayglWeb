using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace Importer
{
    internal class IngCreditCardImporter : IImporter
    {
        public IEnumerable<Transaction> ReadTransactions(IEnumerable<string> lines)
        {
            var result = new List<Transaction>();

            var idx1 = 1;
            var idx2 = 0;
            var date = DateTime.Today;
            var name = "";
            while (idx1 < lines.Count())
            {
                var line = lines.ElementAt(idx1);
                if (string.IsNullOrEmpty(line))
                {
                    idx2 = 0;
                    date = DateTime.Today;
                    name = "";
                    ++idx1;
                    continue;
                }

                switch (idx2)
                {
                    case 0:
                        ++idx2;
                        MatchCollection mc = Regex.Matches(line, @"\d{2}\.\d{2}\.\d{4}");

                        foreach (Match m in mc)
                        {
                            DateTime.TryParse(m.ToString(), out date);
                            break;
                        }
                        break;
                    case 2:
                        ++idx2;
                        name = line.Trim();
                        break;
                    case 3:
                    case 4:
                        if (line.StartsWith("Data "))
                        {
                            ++idx2;
                            break;
                        }
                        var parts = line.Trim().Split(' ');
                        decimal.TryParse(parts[0].Replace(',','.').Replace('−', '-'), NumberStyles.Number, CultureInfo.InvariantCulture, out var amount);
                        var currency = parts[1];
                        result.Add(new Transaction(date, "", name + " [ING CC]", "", "", "", amount, currency));
                        idx2 = 0;
                        date = DateTime.Today;
                        name = "";
                        break;
                    default:
                        ++idx2;
                        break;
                }
                ++idx1;
            }

            return result;
        }


    }
}