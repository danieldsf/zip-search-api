import { stringify } from 'qs'
import { IHttpClientProvider } from '@src/providers/IHttpClientProvider'
import { IZipData, IZipInputQuery, IZipSearchProvider } from '@src/providers/IZipSearchProvider'
import { IFixtureProvider } from '@src/providers/IFixtureProvider'
import { AbbreviationHelper } from '@src/helpers/AbbreviationHelper'
import { StreetPostcodeBase } from '@src/helpers/StreetPostcodeBaseHelper'
import { IHtmlParserProvider } from '@src/providers/IHtmlParserProvider'
import { logMessage } from '@src/helpers/logger'

export class USPSZipSearchProvider implements IZipSearchProvider{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider,
        private iHtmlParserProvider: IHtmlParserProvider
    ){}
    
    async getLocationFromQueryProvided(inputQuery: IZipInputQuery): Promise<IZipData> {
        
        const uspsURL: string = 'https://tools.usps.com/tools/app/ziplookup/cityByZip'
        const config: any = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        
        const cleanZip = inputQuery.zip.slice(0, 5)

        const requestBody = {
            zip: cleanZip
        }

        let resultItem: IZipData = { zip: '', country: '', city: '', province: '' }

        const abbreviationHelper = new AbbreviationHelper(this.iFixtureProvider) 
        
        try {
            let responseFromClient: any = await this.iHttpClientProvider.post(uspsURL, stringify(requestBody), config)
            logMessage(responseFromClient)
            if(!(responseFromClient.resultStatus == 'SUCCESS')){
                throw new Error("Location not found")
            }

            resultItem.zip = responseFromClient.zip5
            resultItem.city = responseFromClient.defaultCity
            resultItem.province_code = responseFromClient.defaultState
            resultItem.province = abbreviationHelper.getLongName(responseFromClient.defaultState, inputQuery.country)
            resultItem.country = inputQuery.country || 'us'
            
            if(inputQuery.zip.length > 5){
                //
                const streetCodeBase = new StreetPostcodeBase(this.iHttpClientProvider, this.iHtmlParserProvider)
                //
                try {
                    let data = await streetCodeBase.execute(responseFromClient.defaultState, inputQuery.zip)
                    resultItem = { ...resultItem, ...data }
                } catch (error) {
                    logMessage(error)
                }
            }

            return resultItem
        } catch (error) {
            throw new Error("Location not found")
        } 
    }

}