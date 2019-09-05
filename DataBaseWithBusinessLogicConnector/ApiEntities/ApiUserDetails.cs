using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiUserDetails : IEntity
    {
        public int? Id { get;  set; }
        public bool IsDirty { get; set; }
        public string LastName { get;  set; }
        public string FirstName { get;  set; }

        public ApiUserDetails(int? id, string lastName, string firstName)
        {
            Id = id;
            LastName = lastName;
            FirstName = firstName;
        }

        public ApiUserDetails()
        {
        }
        public void UpdateId(int? id)
        {
            Id = id;
        }
    }
}
