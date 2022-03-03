import { IFixtureProvider } from "../providers/IFixtureProvider";

export class AbbreviationHelper{

    constructor(private iFixtureProvider: IFixtureProvider){

    }

    execute(state: string, country: string){
        let foundStates = this.iFixtureProvider.getContent(`./../../fixtures/${country.toLocaleLowerCase()}/states.json`)
        if(state.length > 2){
            for (let index = 0; index < foundStates.length; index++) {
                let element = foundStates[index]
                let key = Object.keys(element)[0]
                if(element[key].toUpperCase() == state.toUpperCase()){
                    return key.toUpperCase()
                }
            }
        }
        return state.toUpperCase()
    }
}