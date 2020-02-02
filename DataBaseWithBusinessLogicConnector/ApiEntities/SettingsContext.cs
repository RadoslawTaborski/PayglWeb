namespace DataBaseWithBusinessLogicConnector.ApiEntities
{
    public class SettingsContext
    {
        public string PathToImportFiles { get; set; }
        public int Bank { get; set; }

        public SettingsContext() { }

        public SettingsContext(string pathToImportFiles, int bank)
        {
            PathToImportFiles = pathToImportFiles;
            Bank = bank;
        }
    }
}