import { IZipSearchProvider } from "@src/providers/IZipSearchProvider"
import { ZippopotamusZipSearchProvider } from "@src/implementations/ZippopotamusZipSearchProvider"
import { IHttpClientProvider } from "@src/providers/IHttpClientProvider"
import { IFixtureProvider } from "@src/providers/IFixtureProvider"
import { USPSZipSearchProvider } from "@src/implementations/USPSZipSearchProvider"
import { IHtmlParserProvider } from "@src/providers/IHtmlParserProvider"
import { ViaCEPZipSearchProvider } from "@src/implementations/ViaCEPZipSearchProvider"


export class SearchZipFactory{

    constructor(private iHttpClientProvider: IHttpClientProvider, 
        private iFixtureProvider: IFixtureProvider, 
        private iHtmlParserProvider: IHtmlParserProvider
    ){}

    public handle(country: string): IZipSearchProvider{
        switch(country) {
            case 'us':
                return new USPSZipSearchProvider(this.iHttpClientProvider, this.iFixtureProvider, this.iHtmlParserProvider)
            case 'br':
                return new ViaCEPZipSearchProvider(this.iHttpClientProvider, this.iFixtureProvider) 
            default:
                return new ZippopotamusZipSearchProvider(this.iHttpClientProvider, this.iFixtureProvider)
        } 
    }
}