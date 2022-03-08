import { Router } from 'express';
import { AxiosHttpClientProvider } from '@src/implementations/AxiosHttpClientProvider';
import { CheerioHtmlParserProvider } from '@src/implementations/CheerioHtmlParserProvider';
import { LocalJSONFixtureProvider } from '@src/implementations/LocalJSONFixtureProvider';
import { SupabaseLocationRepository } from '@src/implementations/SupabaseLocationRepository';
import { SearchZipController } from '@src/useCases/SearchZip/SearchZipController';
import { SearchZipUseCase } from '@src/useCases/SearchZip/SearchZipUseCase';

const router = Router()

let supabaselocationRepository = new SupabaseLocationRepository()
let searchUseCase = new SearchZipUseCase(supabaselocationRepository)
let axiosHTTPClient = new AxiosHttpClientProvider()
let localJSONFixture = new LocalJSONFixtureProvider()
let cheerioHTMLParser = new CheerioHtmlParserProvider()

router.get('/api/v1/autocomplete/:zip', (request, response) => { 
    let controler = new SearchZipController(axiosHTTPClient, localJSONFixture, cheerioHTMLParser, searchUseCase)
    return controler.handle(request, response)
})

router.get('/', (request, response) => {
    return response.status(200).send({status: 'OK'})
})

export { router }