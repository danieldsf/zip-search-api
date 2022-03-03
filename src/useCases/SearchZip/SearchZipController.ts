import { Request, Response } from "express";
import { SearchZipUseCase } from "./SearchZipUseCase";


export class SearchZipController{

    constructor(private searchZipUseCase: SearchZipUseCase){

    }

    async handle(request: Request, response: Response): Promise<Response>{
        const { zip, country = 'us' }: any = request.path

        try {
            await this.searchZipUseCase.execute({ zip, country })

            return response.status(201).json(this.searchZipUseCase.foundLocation)
        } catch (error) {
            return response.status(404).json({
                error: error.message || 'Unexpected error'
            })
        }
    }
}