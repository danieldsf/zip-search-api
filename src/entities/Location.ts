import { uuid } from 'uuidv4'

export class Location{

    public readonly id: string;
    public zip: string;
    public country: string;
    public city?: string;
    public province?: string;
    public street?: string;
    public province_code?: string;
    public country_code?: string;

    constructor(props: Omit<Location, 'id'>, id?: string){
        Object.assign(this, props)
        this.id = id || uuid()
    }
}