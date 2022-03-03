import { AbbreviationHelper } from "../helpers/AbbreviationHelper";
import { IFixtureProvider } from "../providers/IFixtureProvider";
import { IHttpClientProvider } from "../providers/IHttpClientProvider";
import { IZipData, IZipInputQuery, IZipSearchProvider } from "../providers/IZipSearchProvider";


export class ZippopotamusZipSearchProvider implements IZipSearchProvider{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider
    ){

    }
    
    async getLocationFromQueryProvided(inputQuery: IZipInputQuery): Promise<IZipData> {
        const zippopotamusURL: string = 'http://api.zippopotam.us';
        const queryUrl: string = `${zippopotamusURL}/${inputQuery.country.toLowerCase()}/${inputQuery.zip}`
        let resultItem: IZipData = { zip: '', country: '', city: '', province: '' }
        let abbreviationHelper = new AbbreviationHelper(this.iFixtureProvider)
        try {
            let result = (await this.iHttpClientProvider.get(queryUrl)).data
            resultItem.zip = inputQuery.zip
            resultItem.country = inputQuery.country
            resultItem.city = result.places[0]['place name']
            resultItem.province = abbreviationHelper.execute(result.places[0]['state'], inputQuery.country)
            return resultItem
        } catch (error) {
            throw new Error("Location not found")
        }
    }
}