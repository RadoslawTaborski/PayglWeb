using DataBaseWithBusinessLogicConnector.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class ApiSchematic : IEntity
    {
        public int? Id { get; set; }
        public bool IsDirty { get; set; }
        public bool IsMarkForDeletion { get; set; }
        public ApiSchematicType Type { get; set; }
        public SchematicContext Context { get; set; }
        public ApiUser User { get; set; }

        public ApiSchematic() { }

        public ApiSchematic(int? id, ApiSchematicType type, SchematicContext context, ApiUser user)
        {
            Id = id;
            Type = type;
            Context = context;
            User = user;
        }

        public void UpdateId(int? id)
        {
            Id = id;
        }

        public override string ToString()
        {
            return $"{Id}-{Type}: {Context}";
        }
    }
}
