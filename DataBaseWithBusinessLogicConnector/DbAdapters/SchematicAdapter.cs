using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class SchematicAdapter : IAdapter<DalSchematic>
    {
        private const string Table = "schematics";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["type_id"] = DataType.IntegerNullable,
            ["json"] = DataType.String,
            ["user_id"] = DataType.IntegerNullable,
        };

        private readonly AdapterHelper _adapterHelper;

        public SchematicAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalSchematic> GetAll(string filter = "")
        {
            var result = new List<DalSchematic>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalSchematic(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), int.Parse(dataRow[3].ToString())));
            }

            return result;
        }

        public DalSchematic GetById(int? id)
        {
            DalSchematic result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalSchematic(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), int.Parse(dataRow[3].ToString()));
            }

            return result;
        }

        public int Insert(DalSchematic entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var json = _adapterHelper.ToStr(entity.Json, _columns["json"]);
            var typeId = _adapterHelper.ToStr(entity.TypeId, _columns["type_id"]);

            return _adapterHelper.Insert(id, typeId, json, userId);
        }

        public void Update(DalSchematic entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var json = _adapterHelper.ToStr(entity.Json, _columns["json"]);
            var typeId = _adapterHelper.ToStr(entity.TypeId, _columns["type_id"]);

            _adapterHelper.Update(id, id, typeId, json, userId);
        }
    }
}
