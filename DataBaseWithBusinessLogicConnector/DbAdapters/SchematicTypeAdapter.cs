using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class SchematicTypeAdapter : IAdapter<DalSchematicType>
    {
        private const string Table = "schematic_types";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["name"] = DataType.String,
        };

        private readonly AdapterHelper _adapterHelper;

        public SchematicTypeAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalSchematicType> GetAll(string filter = "")
        {
            var result = new List<DalSchematicType>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalSchematicType(int.Parse(dataRow[0].ToString()), dataRow[1].ToString()));
            }

            return result;
        }

        public DalSchematicType GetById(int? id)
        {
            DalSchematicType result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalSchematicType(int.Parse(dataRow[0].ToString()), dataRow[1].ToString());
            }

            return result;
        }

        public int Insert(DalSchematicType entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);

            return _adapterHelper.Insert(id, name);
        }

        public void Update(DalSchematicType entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);

            _adapterHelper.Update(id, id, name);
        }
    }
}
