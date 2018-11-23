export interface Ioptions {
    singleton?: boolean
    keepAlive?: boolean
}
export function create<T>(factor: () => T, option: Ioptions): T {
    return factor()
}
