import { Icreateable } from './module'
import { of } from 'rxjs'

export interface ImaybeProject {
    payload?: Array<{
        proj_id: string
        proj_name: string
    }>
    err?: Error
    isLoading?: boolean
}
export class Project extends Icreateable<ImaybeProject> {
    public obs = of({
        payload: [{
            proj_id: 'xxx',
            proj_name: '222'
        }]
    })
}
