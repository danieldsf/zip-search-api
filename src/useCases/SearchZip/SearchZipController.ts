import { Request, Response } from "express"
import { SearchZipUseCase } from "@src/useCases/SearchZip/SearchZipUseCase"
import { SearchZipFactory } from "@src/useCases/SearchZip/SearchZipFactory"
import { IHttpClientProvider } from "@src/providers/IHttpClientProvider"
import { IFixtureProvider } from "@src/providers/IFixtureProvider"
import { IHtmlParserProvider } from "@src/providers/IHtmlParserProvider"
import { logMessage } from "@src/helpers/logger"


export class SearchZipController{

    constructor(
        private iHttpClientProvider: IHttpClientProvider,
        private iFixtureProvider: IFixtureProvider,
        private iHtmlParserProvider: IHtmlParserProvider,
        private searchZipUseCase: SearchZipUseCase
    ){}

    async handle(request: Request, response: Response): Promise<Response>{
        const { zip }: any = request.params
        const { country = 'us' }: any = request.query
        logMessage({ zip, country }, 'info')
        const iZipSearchProvider = new SearchZipFactory(this.iHttpClientProvider, this.iFixtureProvider, this.iHtmlParserProvider)
        .handle(country)
        this.searchZipUseCase.setLocationsRepository(iZipSearchProvider)

        try {
            let location = await this.searchZipUseCase.execute({ zip, country })
            logMessage(location, 'info')
            return response.status(200).json(location)
        } catch (error) {
            return response.status(404).json({
                error: error.message || 'Unexpected error'
            })
        }
    }
}