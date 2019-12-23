using DataBaseWithBusinessLogicConnector.DalEntities;
using DataBaseWithBusinessLogicConnector.Interfaces.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseWithBusinessLogicConnector.DbAdapters
{
    public class FilterAdapter : IAdapter<DalFilter>
    {
        private const string Table = "filters";

        private readonly Dictionary<string, DataType> _columns = new Dictionary<string, DataType>
        {
            ["id"] = DataType.IntegerNullable,
            ["user_id"] = DataType.IntegerNullable,
            ["name"] = DataType.String,
            ["query"] = DataType.String,
        };

        private readonly AdapterHelper _adapterHelper;

        public FilterAdapter(DbConnector connector)
        {
            _adapterHelper = new AdapterHelper(connector, Table, _columns.Keys.ToList());
        }

        public void Delete(int? id)
        {
            _adapterHelper.Delete(id);
        }

        public IEnumerable<DalFilter> GetAll(string filter = "")
        {
            var result = new List<DalFilter>();

            var data = _adapterHelper.GetAll(filter);

            for (var i = 0; i < data.Tables[0].Rows.Count; ++i)
            {
                var dataRow = data.Tables[0].Rows[i].ItemArray;
                result.Add(new DalFilter(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), dataRow[3].ToString()));
            }

            return result;
        }

        public DalFilter GetById(int? id)
        {
            DalFilter result = null;

            var data = _adapterHelper.GetById(id);

            if (data.Tables.Count > 0)
            {
                var dataRow = data.Tables[0].Rows[0].ItemArray;
                result = new DalFilter(int.Parse(dataRow[0].ToString()), int.Parse(dataRow[1].ToString()), dataRow[2].ToString(), dataRow[3].ToString());
            }

            return result;
        }

        public int Insert(DalFilter entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);
            var query = _adapterHelper.ToStr(entity.Query, _columns["query"]);

            return _adapterHelper.Insert(id, userId, name, query);
        }

        public void Update(DalFilter entity)
        {
            var id = _adapterHelper.ToStr(entity.Id, _columns["id"]);
            var userId = _adapterHelper.ToStr(entity.UserId, _columns["user_id"]);
            var name = _adapterHelper.ToStr(entity.Name, _columns["name"]);
            var query = _adapterHelper.ToStr(entity.Query, _columns["query"]);

            _adapterHelper.Update(id, id, userId, name, query);
        }
    }
}
