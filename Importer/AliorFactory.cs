namespace Importer
{
    internal class AliorFactory : ImportFactory
    {
        public const string ID = "Alior";
        public override IImporter CreateImporter()
        {
            return new AliorImporter();
        }
    }
}