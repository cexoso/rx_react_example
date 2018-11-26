import { Observable } from "rxjs";
export abstract class Icreateable<T> {
    abstract obs: Observable<T>
}
export interface Ioptions {
    singleton?: boolean
    keepAlive?: boolean
}


export class Module {
    map = new Map()
    Factors: { [name: string]: any } = {}
    constructor(providers: Array<{ new(): any }> = []) {
        providers.forEach((provider) => {
            this.Factors[provider.name] = provider
        })
    }
    create<B>(Factor: { new(): B }): B {
        const cache = this.map.get(Factor)
        if (cache) {
            return cache;
        }
        const instance = new Factor()
        this.map.set(Factor, instance)
        return instance
    }

}