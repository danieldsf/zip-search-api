export interface IHttpClientProvider{
    get(url: string): Promise<any>
    post(url: string, body?: any, config?: any): Promise<any>
}