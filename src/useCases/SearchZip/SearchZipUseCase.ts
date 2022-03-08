import { IZipSearchProvider } from "@src/providers/IZipSearchProvider"
import { ILocationsRepository } from "@src/repositories/ILocationsRepository"
import { ISearchZipRequestDTO } from "@src/useCases/SearchZip/SearchZipDTO"
import { Location } from "@src/entities/Location"

export class SearchZipUseCase{

    private iZipSearchProvider: IZipSearchProvider;

    constructor(
        private locationsRepository: ILocationsRepository
    ){}

    public setLocationsRepository(zipSearchProvider: IZipSearchProvider){
        this.iZipSearchProvider = zipSearchProvider
    }

    public async execute(data: ISearchZipRequestDTO) : Promise<Location>{
        if(!this.iZipSearchProvider){
            throw new Error("Location repository not set")
        }
        
        let foundLocation = await this.locationsRepository.findByZipAndCountry(data.zip, data.country)
        
        if(foundLocation){
            return foundLocation
        }

        let providerLocation: any = await this.iZipSearchProvider.getLocationFromQueryProvided(data)
        
        if(!providerLocation){
            throw new Error("Location not found!")
        }

        Object.assign(providerLocation, data)
        
        let location = new Location(providerLocation)
        
        await this.locationsRepository.save(location)
        
        return location
    }
}