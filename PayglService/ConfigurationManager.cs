using Newtonsoft.Json;
using System.IO;
using System.Reflection;
using static PayglService.DbConfiguration;

namespace PayglService
{
    public class ConfigurationManager
    {
        private static RootObject _config;

        public static void ReadConfig()
        {
            var jsonPath = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "dbConfiguration.json");
            var json = File.ReadAllText(jsonPath);
            _config = JsonConvert.DeserializeObject<RootObject>(json);
        }

        public static DataBase DataBaseData()
        {
            return _config.Settings.DataBase;
        }
    }
}
