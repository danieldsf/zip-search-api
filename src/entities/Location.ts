import { v4 } from 'uuid'

export class Location{

    public readonly id?: string;
    public zip: string;
    public country: string;
    public city?: string;
    public province?: string;
    public street?: string;
    public province_code?: string;
    public country_code?: string;
    public county?: string;

    constructor(props: Location){
        Object.assign(this, props)
        this.id = props?.id || v4()
    }
}