namespace Importer
{
    internal class IngFactory : ImportFactory
    {
        public const string ID = "ING";
        public override IImporter CreateImporter()
        {
            return new IngImporter();
        }
    }
}