import { Location } from '@src/entities/Location'
import { IZipData } from '@src/providers/IZipSearchProvider'

export interface ILocationsRepository{
    findByZipAndCountry(zip: string, country: string): Promise<Location>
    save(location: Location | IZipData): Promise<void>
}