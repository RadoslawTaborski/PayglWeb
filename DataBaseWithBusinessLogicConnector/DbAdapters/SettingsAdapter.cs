using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class SettingsAdapter : IAdapter<DalSettings>
    {
        private const string Table = "settings";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["json"] = DataType.String,
            ["user_id"] = DataType.IntegerNullable,
        };

        private readonly AdapterHelper _adapterHelper;

        public SettingsAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalSettings> GetAll(string filter = "")
        {
            var result = new List<DalSettings>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalSettings(int.Parse(dataRow[0].ToString()), dataRow[1].ToString(), int.Parse(dataRow[2].ToString())));
            }

            return result;
        }

        public DalSettings GetById(int? id)
        {
            DalSettings result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalSettings(int.Parse(dataRow[0].ToString()), dataRow[1].ToString(), int.Parse(dataRow[2].ToString()));
            }

            return result;
        }

        public int Insert(DalSettings entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var json = _adapterHelper.ToStr(entity.Json, _columns["json"]);

            return _adapterHelper.Insert(id, json, userId);
        }

        public void Update(DalSettings entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var json = _adapterHelper.ToStr(entity.Json, _columns["json"]);

            _adapterHelper.Update(id, json, userId);
        }
    }
}
