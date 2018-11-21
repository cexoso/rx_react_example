import { of } from "rxjs";

class Obs {

}

class Manager {
    private serviceHub: { [name: string]: any } = {}
    private instanceMap: { [name: string]: any } = {}
    public registerService(serviceName: string, factor: Array<string | (() => any)>) {
        this.serviceHub[serviceName] = factor;
    }
    public inject(serviceName: string) {
        const cache = this.instanceMap[serviceName];
        if (cache) { return cache }
        const factor = this.serviceHub[serviceName]
        if (!factor) {
            throw new Error(`service: ${serviceName} not found`)
        }
        // TODO 解决依赖 验证类型
        const fn = factor[factor.length - 1]
        const service = fn()
        this.instanceMap[serviceName] = service
        return service
    }
}
export function createManager() {
    return new Manager
}