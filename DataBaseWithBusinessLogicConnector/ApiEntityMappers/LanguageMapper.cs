using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class LanguageMapper
    {
        public IEnumerable<Language> ConvertToEntitiesCollection(IEnumerable<ApiLanguage> dataEntities)
        {
            var result = new List<Language>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Language ConvertToEntity(ApiLanguage dataEntity)
        {
            var result = new Language(dataEntity.Id, dataEntity.ShortName, dataEntity.FullName);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }

        public IEnumerable<ApiLanguage> ConvertToApiEntitiesCollection(IEnumerable<Language> dataEntities)
        {
            var result = new List<ApiLanguage>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiLanguage ConvertToApiEntity(Language dataEntity)
        {
            var result = new ApiLanguage(dataEntity.Id, dataEntity.ShortName, dataEntity.FullName);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }
    }
}
