import { AbbreviationHelper } from "@src/helpers/AbbreviationHelper";
import { logMessage } from "@src/helpers/logger";
import { IFixtureProvider } from "@src/providers/IFixtureProvider";
import { IHttpClientProvider } from "@src/providers/IHttpClientProvider";
import { IZipData, IZipInputQuery, IZipSearchProvider } from "@src/providers/IZipSearchProvider";

export class ViaCEPZipSearchProvider implements IZipSearchProvider{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider
    ){}
    
    async getLocationFromQueryProvided(inputQuery: IZipInputQuery): Promise<IZipData> {
        const viaCEPURL: string = 'https://viacep.com.br/ws';
        const queryUrl: string = `${viaCEPURL}/${inputQuery.zip}/json/unicode/`

        let resultItem: IZipData = { zip: '', country: '', city: '', province: '' }
        let abbreviationHelper = new AbbreviationHelper(this.iFixtureProvider)
        let responseFromClient = await this.iHttpClientProvider.get(queryUrl)

        logMessage({ responseFromClient, queryUrl})
        
        resultItem.zip = inputQuery.zip
        resultItem.country = inputQuery.country
        resultItem.city = responseFromClient.localidade
        resultItem.province_code = responseFromClient.uf
        resultItem.province = abbreviationHelper.getLongName(responseFromClient.uf, inputQuery.country)
        if(responseFromClient.bairro){
            resultItem.street = [responseFromClient.bairro, responseFromClient.logradouro, responseFromClient.complemento]
            .filter(x => x).join(', ')
        }
        
        return resultItem
    }
}