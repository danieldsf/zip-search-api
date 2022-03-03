import axios, { AxiosInstance } from 'axios'
import { IHttpClientProvider } from "../providers/IHttpClientProvider";

export class AxiosHttpClientProvider implements IHttpClientProvider{
    public instance: AxiosInstance

    constructor(){
        this.instance = axios.create({
            timeout: 9000
        })
    }

    async get(url: string): Promise<any> {
        return await this.instance.get(url).then((data) => data.data)
    }

    async post(url: string, body?: any, config?: any): Promise<any> {
        return await axios.post(url, body, config).then(data => data.data)
    }

}