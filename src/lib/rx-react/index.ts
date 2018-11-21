
class Obs {

}

class Manager {
    public registerService(serviceName: string, factor: Array<string | (() => any)>) {

    }
    public content: any = {
        
    }
    public inject(serviceName: string) {
        return 'xx'
    }
}
export function createManager() {
    return new Manager
}