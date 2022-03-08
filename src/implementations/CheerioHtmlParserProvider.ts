import cheerio from 'cheerio'
import { IHtmlParserProvider } from '@src/providers/IHtmlParserProvider'

export class CheerioHtmlParserProvider implements IHtmlParserProvider{
    
    getStreet(html: string): string{
        let $ = cheerio.load(html)
        return ($('#page-title')?.text()?.split(',')[0]?.trim() || '').replace('Address: ', '')
    }
}