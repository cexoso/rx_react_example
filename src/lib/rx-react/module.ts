import { Observable } from "rxjs";
export abstract class Icreateable<T> {
    abstract obs: Observable<T>
}
export interface Ioptions {
    singleton?: boolean
    keepAlive?: boolean
}
const map: { [name: string]: any } = {}

export class Module {
    constructor(provider: Array<{ new(): any }>) {

    }
    create<B extends Icreateable<any>>(Factor: { new(): B }): B {
        const cache = map[Factor.name]
        if (cache) {
            return cache;
        }
        const instance = new Factor()
        map[Factor.name] = instance
        return instance
    }

}