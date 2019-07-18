using DataAccess;
using DataAccess.Interfaces;
using DataBaseWithBusinessLogicConnector;
using DataBaseWithBusinessLogicConnector.Dal.Adapters;
using DataBaseWithBusinessLogicConnector.Dal.DalEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PayglService
{
    public static class Service
    {
        private static DatabaseManager DbManager { get; set; }
        private static DbConnector DbConnector { get; set; }
        static Service()
        {
            ConfigurationManager.ReadConfig();
            var dataBaseData = ConfigurationManager.DataBaseData();
            DbManager = new DatabaseManager(new MySqlConnectionFactory(), dataBaseData.Address, dataBaseData.Port, dataBaseData.Table, dataBaseData.Login, dataBaseData.Password);
            DbConnector = new DbConnector(DbManager);
        }

        public static IEnumerable<DalUser> getUser()
        {
            var userAdapter = new UserAdapter(DbConnector);
            return userAdapter.GetAll();
        }
    }
}
