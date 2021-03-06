import { Icreateable } from './module'
import { module } from './store'
import { User } from './user.obs'
import { switchMap, map, shareReplay } from 'rxjs/operators';
import { of, timer, concat } from 'rxjs';

const existProject = [
    { proj_id: '1', proj_name: '狗不理包子店' },
    { proj_id: '2', proj_name: 'KTV' },
    { proj_id: '3', proj_name: '网咖不在这' },
    { proj_id: '4', proj_name: '鬼知道是什么' },
]

export interface ImaybeProject {
    payload?: {
        proj_id: string
        proj_name: string
    }
    err?: Error
    isLoading?: boolean
}
export class Project extends Icreateable<ImaybeProject> {
    private user$ = module.create(User)
    public obs = this.user$.obs.pipe(
        switchMap<any, ImaybeProject>(mUser => {
            if (mUser.err || mUser.isLoading) {
                return of({
                    err: mUser.err,
                    isLoading: mUser.isLoading,
                })
            }
            const fakeFetch = concat(of({ isLoading: true }), timer((Math.random() + 0.7) * 1000).pipe(map(
                () => {
                    const uid = mUser.payload.user_id
                    const found = existProject.find(p => p.proj_id === uid)
                    if (found) {
                        return { payload: found }
                    } else {
                        return { err: new Error('project no found') }
                    }
                }
            )))
            return fakeFetch
        }),
        shareReplay(1)
    )
}
