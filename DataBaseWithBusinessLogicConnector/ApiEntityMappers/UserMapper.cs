using DataBaseWithBusinessLogicConnector.ApiEntities;
using DataBaseWithBusinessLogicConnector.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntityMappers
{
    public class UserMapper
    {
        private LanguageMapper _languageMapper;
        private UserDetailsMapper _userDetailsMapper;

        public UserMapper(LanguageMapper languageMapper, UserDetailsMapper userDetailsMapper)
        {
            _languageMapper = languageMapper;
            _userDetailsMapper = userDetailsMapper;
        }

        public IEnumerable<User> ConvertToEntitiesCollection(IEnumerable<ApiUser> dataEntities)
        {
            var result = new List<User>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToEntity(item));
            }

            return result;
        }

        public User ConvertToEntity(ApiUser dataEntity)
        {
            var language = _languageMapper.ConvertToEntity(dataEntity.Language);
            var userDetails = _userDetailsMapper.ConvertToEntity(dataEntity.Details);
            var result = new User(dataEntity.Id, dataEntity.Login, language, userDetails);
            return result;
        }

        public IEnumerable<ApiUser> ConvertToApiEntitiesCollection(IEnumerable<User> dataEntities)
        {
            var result = new List<ApiUser>();
            foreach (var item in dataEntities)
            {
                result.Add(ConvertToApiEntity(item));
            }

            return result;
        }

        public ApiUser ConvertToApiEntity(User dataEntity)
        {
            var language = _languageMapper.ConvertToApiEntity(dataEntity.Language);
            var userDetails = _userDetailsMapper.ConvertToApiEntity(dataEntity.Details);
            var result = new ApiUser(dataEntity.Id, dataEntity.Login, language, userDetails);
            return result;
        }
    }
}
