using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DalApiMappers
{
    public class UserMapper
    {
        private ApiLanguage _language;
        private ApiUserDetails _userDetails;

        public void Update(ApiLanguage language, ApiUserDetails userDetails)
        {
            _language = language;
            _userDetails = userDetails;
        }

        public ApiUser ConvertToApiEntity(DalUser dataEntity)
        {
            var result = new ApiUser(dataEntity.Id, dataEntity.Login, _language, _userDetails);
            result.IsDirty = dataEntity.IsDirty;
            return result;
        }
    }
}
