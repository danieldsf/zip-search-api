import { AbbreviationHelper } from "@src/helpers/AbbreviationHelper";
import { logMessage } from "@src/helpers/logger";
import { IFixtureProvider } from "@src/providers/IFixtureProvider";
import { IHttpClientProvider } from "@src/providers/IHttpClientProvider";
import { IZipData, IZipInputQuery, IZipSearchProvider } from "@src/providers/IZipSearchProvider";

export class ZippopotamusZipSearchProvider implements IZipSearchProvider{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider
    ){}
    
    async getLocationFromQueryProvided(inputQuery: IZipInputQuery): Promise<IZipData> {
        const zippopotamusURL: string = 'http://api.zippopotam.us';
        const queryUrl: string = `${zippopotamusURL}/${inputQuery.country}/${inputQuery.zip}`
        let resultItem: IZipData = { zip: '', country: '', city: '', province: '' }
        let abbreviationHelper = new AbbreviationHelper(this.iFixtureProvider)
        let result = await this.iHttpClientProvider.get(queryUrl)
        logMessage({ result, queryUrl})
        resultItem.zip = inputQuery.zip
        resultItem.country = inputQuery.country
        resultItem.city = result.places[0]['place name']
        resultItem.province_code = result.places[0]['state']
        resultItem.province = abbreviationHelper.getLongName(result.places[0]['state'], inputQuery.country)
        return resultItem
    }
}