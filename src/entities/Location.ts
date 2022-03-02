import { uuid } from 'uuidv4'
export class Location{
    public readonly id: string;
    private zip: string;
    private city: string;
    private province: string;
    private street: string;
    private country: string = 'US';
    private province_code: string;
    private country_code: string;

    constructor(props: Omit<Location, 'id'>, id?: string){
        Object.assign(this, props)
        this.id = id || uuid()
    }
    
}