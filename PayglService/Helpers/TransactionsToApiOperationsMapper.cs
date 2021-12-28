using DataBaseWithBusinessLogicConnector.ApiEntities;
using Importer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace PayglService.Helpers
{
    internal class TransactionsToApiOperationsMapper
    {
        public IEnumerable<ApiSchematic> Schematics { get; private set; }

        public void setSchematics(IEnumerable<ApiSchematic> schematics)
        {
            this.Schematics = schematics;
        }

        public IEnumerable<ApiOperation> ConvertToEntitiesCollection(IEnumerable<Transaction> transactions, ApiUser user, List<ApiImportance> importances, List<ApiFrequency> frequencies, List<ApiTag> tags, List<ApiTransactionType> transactionsType, List<ApiTransferType> transfersType)
        {
            var result = new List<ApiOperation>();
            foreach (var item in transactions)
            {
                result.Add(Convert(item, user, importances, frequencies, tags, transactionsType, transfersType));
            }

            return result;
        }

        public ApiOperation Convert(Transaction transaction, ApiUser user, List<ApiImportance> importances, List<ApiFrequency> frequencies, List<ApiTag> tags, List<ApiTransactionType> transactionsType, List<ApiTransferType> transfersType)
        {
            ApiOperation result;
            var schematic = FindSchematicInPattern(transaction);
            var description = string.IsNullOrWhiteSpace(transaction.ContractorData) ? transaction.Title : transaction.ContractorData + "; " + transaction.Title;
            if (transaction.Amount < 0)
            {
                result = new ApiOperation(null, null, user, -1 * transaction.Amount, transactionsType[1], transfersType[1], null, null, transaction.DateTime.ToString("yyyy-MM-dd"), "", new List<ApiRelTag>().ToArray(), new List<ApiOperationDetails>().ToArray(), description);
            }
            else
            {
                result = new ApiOperation(null, null, user, transaction.Amount, transactionsType[0], transfersType[1], null, null, transaction.DateTime.ToString("yyyy-MM-dd"), "", new List<ApiRelTag>().ToArray(), new List<ApiOperationDetails>().ToArray(), description);
            }

            if (schematic != null)
            {
                result.Description = schematic.Context.Description;
                result.Frequency = ConvertStringHelper.ConvertToFrequency(schematic.Context.Frequency, frequencies);
                result.Importance = ConvertStringHelper.ConvertToImportance(schematic.Context.Importance, importances);
                var tagsList = new List<ApiRelTag>();
                foreach (var tagString in schematic.Context.Tags)
                {
                    var tag = ConvertStringHelper.ConvertToTag(tagString, tags);
                    if (tag != null)
                    {
                        tagsList.Add(new ApiRelTag(null, tag));
                    }
                }
                result.Tags = tagsList.ToArray();
            }

            return result;
        }


        private ApiSchematic FindSchematicInPattern(Transaction transaction)
        {
            foreach (var pattern in Schematics)
            {
                if (pattern.Context.DescriptionRegex == "")
                {
                    pattern.Context.DescriptionRegex = ".*";
                }

                if (pattern.Context.TitleRegex == "")
                {
                    pattern.Context.TitleRegex = ".*";
                }

                if (Regex.Match(transaction.ContractorData, pattern.Context.DescriptionRegex).Success && Regex.Match(transaction.Title, pattern.Context.TitleRegex).Success)
                {
                    return pattern;
                }
            }
            return null;
        }
    }
}
