using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class FrequencyMapper
    {
        public IEnumerable<Frequency> ConvertToEntitiesCollection(IEnumerable<ApiFrequency> dataEntities)
        {
            var result = new List<Frequency>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public Frequency ConvertToEntity(ApiFrequency dataEntity)
        {
            var result = new Frequency(dataEntity.Id, dataEntity.Text);
            return result;
        }

        public IEnumerable<ApiFrequency> ConvertToApiEntitiesCollection(IEnumerable<Frequency> dataEntities)
        {
            var result = new List<ApiFrequency>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiFrequency ConvertToApiEntity(Frequency dataEntity)
        {
            var result = new ApiFrequency(dataEntity.Id, dataEntity.Text);
            return result;
        }
    }
}
