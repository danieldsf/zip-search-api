import cheerio from 'cheerio'
import { IHtmlParserProvider } from "../providers/IHtmlParserProvider";

export class CheerioHtmlParserProvider implements IHtmlParserProvider{
    
    getStreet(html: string): string{
        let $ = cheerio.load(html)
        return $('span[dir=ltr] > div').html().split('<br>')[0].replace(/[^ -~]+/g, ' ').trim() || ''
    }
}