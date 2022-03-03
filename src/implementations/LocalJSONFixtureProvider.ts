import { IFixtureProvider } from "../providers/IFixtureProvider";
import fs from 'fs'
import path from 'path'

export class LocalJSONFixtureProvider implements IFixtureProvider{
    
    getContent(filepath: string) : any {
        try {
            const rawJsonString = fs.readFileSync(path.join(__dirname, filepath)).toString('utf8')
            return JSON.parse(rawJsonString)
        } catch(err) {
            throw new Error("File not found!")
        }
    }
}