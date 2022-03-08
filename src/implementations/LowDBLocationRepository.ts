import { Location } from "@src/entities/Location";
import { logMessage } from "@src/helpers/logger";
import { ILocationsRepository } from "@src/repositories/ILocationsRepository";
import { Low, JSONFile } from 'lowdb'
import { join } from 'path'

type Data = {
    locations: Location[] // Expect locations to be an array of Location
}

export class LowDBLocationRepository implements ILocationsRepository{
    
    private database: Low<Data>;

    constructor(){
        const adapter = new JSONFile<Data>(join(__dirname, '..', '..', 'fixtures', 'database.json'))
        this.database = new Low<Data>(adapter);
        (this.database.read())  
    }
    
    async findByZipAndCountry(zip: string, country: string): Promise<Location> {
        await this.database.read()
        return this.database.data.locations.filter((currentLocation) => currentLocation.zip == zip && currentLocation.country == country)[0]
    }
    
    async save(location: Location): Promise<void> {
        logMessage(location, 'info')
        this.database.data.locations.push(location)
        await this.database.write()
    }
}