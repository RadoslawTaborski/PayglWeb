namespace Importer
{
    internal class IngCreditCardFactory : ImportFactory
    {
        public const string ID = "ING CC";
        public override IImporter CreateImporter()
        {
            return new IngCreditCardImporter();
        }
    }
}