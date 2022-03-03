import { IZipSearchProvider } from "../../providers/IZipSearchProvider";
import { ILocationsRepository } from "../../repositories/ILocationsRepository";
import { ISearchZipRequestDTO } from "./SearchZipDTO";
import { Location } from "./../../entities/Location"

export class SearchZipUseCase{

    public foundLocation: Location;

    constructor(
        private locationsRepository: ILocationsRepository,
        private iZipSearchProvider: IZipSearchProvider
    ){
        
    }

    public async execute(data: ISearchZipRequestDTO) : Promise<void>{
        let foundLocation = await this.locationsRepository.findByZipAndCountry(data.zip, data.country)

        let providerLocation: any = !foundLocation && await this.iZipSearchProvider.getLocationFromQueryProvided(data)
        
        if(!providerLocation){
            throw new Error("Location not found!")
        }

        Object.assign(providerLocation, data)
        
        let location = new Location(providerLocation)
        
        await this.locationsRepository.save(location)
        
        this.foundLocation = location
    }
}