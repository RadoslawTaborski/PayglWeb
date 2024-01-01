using System;
using System.Collections.Generic;
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

            var idx1 = 0;
            while (idx1 < lines.Count())
            {
                var line = lines.ElementAt(idx1);
                var idx2 = 0;

                var date = DateTime.Today;
                var name = "";
                var amount = decimal.Zero;
                var currency = "PLN";

                while (!line.StartsWith(","))
                {
                    switch (idx2)
                    {
                        case 0:
                            MatchCollection mc = Regex.Matches(line, @"\d{2}\.\d{2}\.\d{4}");

                            foreach (Match m in mc)
                            {
                                DateTime.TryParse(m.ToString(), out date);
                                break;
                            }
                            break;
                        case 3:
                            name = line.Trim();
                            break;
                        case 6:
                            var parts = line.Trim().Split(' ');
                            decimal.TryParse(parts[0], out amount);
                            currency = parts[1];
                            break;
                    }
                    ++idx1;
                    ++idx2;
                    if (idx1 < lines.Count())
                    {
                        line = lines.ElementAt(idx1);
                    } else
                    {
                        break;
                    }
                }
                ++idx1;
                result.Add(new Transaction(date, "", name + " [ING CC]", "", "", "", amount, currency));
            }

            return result;
        }


    }
}