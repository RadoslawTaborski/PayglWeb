using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiSettings : IEntity
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public SettingsContext Context { get; set; }
        public ApiUser User { get; set; }

        public ApiSettings() { }

        public ApiSettings(int? id, SettingsContext context, ApiUser user)
        {
            Id = id;
            Context = context;
            User = user;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return $"{Id}: {Context}";
        }
    }
}
