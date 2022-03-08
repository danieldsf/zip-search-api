
import { IHtmlParserProvider } from '@src/providers/IHtmlParserProvider'
import { IHttpClientProvider } from '@src/providers/IHttpClientProvider'
import { logMessage } from '@src/helpers/logger'

export interface IZipAndStreetDTO{
    zip: string
    street: string
}

export class StreetPostcodeBase{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iHtmlParserProvider: IHtmlParserProvider
    ){}

    async execute(state: string, zip: string) : Promise<IZipAndStreetDTO>{
        let street = ''
        try {
            let url = `https://${state.toLowerCase()}.postcodebase.com/zipcode/${zip}`
            let html = await this.iHttpClientProvider.get(url) 
            street = this.iHtmlParserProvider.getStreet(html)
            return {
                zip: zip, 
                street: street
            }
        } catch (error) {
            logMessage(error)
            return {
                zip: zip.slice(0, 5), 
                street: ''
            }
        } 
    }
}
