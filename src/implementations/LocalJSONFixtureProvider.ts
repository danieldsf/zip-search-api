import { IFixtureProvider } from '@src/providers/IFixtureProvider'
import fs from 'fs'

export class LocalJSONFixtureProvider implements IFixtureProvider{
    
    getContent(filepath: string) : any {
        try {
            const rawJsonString = fs.readFileSync(filepath).toString('utf8')
            return JSON.parse(rawJsonString)
        } catch(err) {
            throw new Error("File not found!")
        }
    }
}