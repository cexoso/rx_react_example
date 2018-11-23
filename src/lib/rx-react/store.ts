import { Observable } from "rxjs";

export abstract class Icreateable<T> {
    abstract obs: Observable<T>
}
export interface Ioptions {
    singleton?: boolean
    keepAlive?: boolean
}
export function create<B extends Icreateable<any>>(Factor: { new(): B }, option: Ioptions): B {
    return new Factor()
}
