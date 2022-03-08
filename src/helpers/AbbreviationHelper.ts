import { IFixtureProvider } from '@src/providers/IFixtureProvider'
import { join } from 'path'

export class AbbreviationHelper{

    constructor(private iFixtureProvider: IFixtureProvider){}

    getLongName(state: string, country: string = 'us') : string {
        let foundStates = this.iFixtureProvider.getContent(
            join(
                __dirname,
                '..',
                '..',
                'fixtures',
                country.toLocaleLowerCase(),
                'states.json'
            )
        )
        
        return foundStates[state.toUpperCase()] || ""
    }

    getShortName(state: string, country: string = 'us') : string {
        let foundStates = this.iFixtureProvider.getContent(
            join(
                __dirname,
                '..',
                '..',
                'fixtures',
                country.toLocaleLowerCase(),
                'states.json'
            )
        )

        let shortCode = ""
        
        for(let key of foundStates.keys()){
            if(foundStates[key].toLocaleLowerCase() == state.toLocaleLowerCase()){
                shortCode = key
                break
            }
        }

        return shortCode
    }
}