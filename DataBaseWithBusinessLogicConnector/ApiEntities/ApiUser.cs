using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiUser : IEntity
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public string Login { get;  set; }
        public ApiLanguage Language { get;  set; }
        public ApiUserDetails Details { get;  set; }

        public ApiUser(int? id, string login, ApiLanguage language, ApiUserDetails details)
        {
            Id = id;
            Login = login;
            Language = language;
            Details = details;
        }

        public ApiUser()
        {
        }
        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
