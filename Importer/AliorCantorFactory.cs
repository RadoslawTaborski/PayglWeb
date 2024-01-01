namespace Importer
{
    internal class AliorCantorFactory : ImportFactory
    {
        public const string ID = "Alior Cantor";
        public override IImporter CreateImporter()
        {
            return new AliorCantorImporter();
        }
    }
}