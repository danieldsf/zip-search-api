export interface IZipData {
    zip?: string
    country: string
    city: string
    province: string
    street?: string
    province_code?: string
    country_code?: string
}

export interface IZipInputQuery {
    zip: string
    country?: string
    state?: string
}

export interface IZipSearchProvider{
    getLocationFromQueryProvided(query: IZipInputQuery): Promise<IZipData>
}