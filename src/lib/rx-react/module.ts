import { Observable } from "rxjs";
export abstract class Icreateable<T> {
    abstract obs: Observable<T>
}
export interface Ioptions {
    singleton?: boolean
    keepAlive?: boolean
}


export class Module {
    map:  { [name: string]: any } = {}
    Factors: { [name: string]: any } = {}
    constructor(providers: Array<{ new(): any }> = []) {
        providers.forEach((provider) => {
            this.Factors[provider.name] = provider
        })
    }
    create(factorName: string) {
        const cache = this.map[factorName]
        if (cache) {
            return cache;
        }
        const Factor = this.Factors[factorName]
        const instance = new Factor()
        this.map[factorName] = instance
        return instance
    }

}