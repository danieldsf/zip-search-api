import qs from 'qs'
import { IHttpClientProvider } from "../providers/IHttpClientProvider"
import { IZipData, IZipInputQuery, IZipSearchProvider } from "../providers/IZipSearchProvider"
import { IFixtureProvider } from "../providers/IFixtureProvider"
import { AbbreviationHelper } from "../helpers/AbbreviationHelper"

export class USPSZipSearchProvider implements IZipSearchProvider{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider
    ){}
    
    async getLocationFromQueryProvided(inputQuery: IZipInputQuery): Promise<IZipData> {
        const uspsURL: string = 'https://tools.usps.com/tools/app/ziplookup/cityByZip'
        const config: any = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        const requestBody = {
            zip: inputQuery.zip
        }
        let resultItem: IZipData = { zip: '', country: '', city: '', province: '' }

        let abbreviationHelper = new AbbreviationHelper(this.iFixtureProvider) 
        
        try {
            let data: any = await this.iHttpClientProvider.post(uspsURL, qs.stringify(requestBody), config)
            
            if(!(data.resultStatus == 'SUCCESS')){
                throw new Error("Location not found")
            }

            resultItem.zip = data.zip5
            resultItem.city = data.defaultCity
            resultItem.province = abbreviationHelper.execute(data.defaultState, inputQuery.country)
            resultItem.country = 'us'
            return resultItem
        } catch (error) {
            throw new Error("Location not found")
        } 
    }

}