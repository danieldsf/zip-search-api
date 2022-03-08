import { Location } from "@src/entities/Location";
import { logMessage } from "@src/helpers/logger";
import { SUPABASE_KEY, SUPABASE_URL } from "@src/helpers/settings";
import { ILocationsRepository } from "@src/repositories/ILocationsRepository";
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export class SupabaseLocationRepository implements ILocationsRepository{
    
    private supabase: SupabaseClient;

    constructor(){
        this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
    }
    
    async findByZipAndCountry(zip: string, country: string): Promise<Location> {
        const { data, error } = await this.supabase
        .from('locations')
        .select('*')
        .eq('zip', zip)
        .eq('country', country)
        
        if(error){
            logMessage(error)
            throw new Error(error.message)
        }

        return data[0]
    }
    
    async save(location: Location): Promise<void> {
        logMessage(location, 'info')

        const { error } = await this.supabase
        .from('locations')
        .insert([
            location
        ])
        
        if(error){
            logMessage(error)
            throw new Error(error.message)
        }
    }
}