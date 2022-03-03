import { Location } from '../entities/Location';
import { IZipData } from '../providers/IZipSearchProvider';

export interface ILocationsRepository{
    findByZipAndCountry(zip: string, country: string): Promise<Location>
    save(location: Location | IZipData): Promise<void>
}