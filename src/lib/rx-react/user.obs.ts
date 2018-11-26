import { Icreateable } from './store'
import { timer, Subject, merge, of, Observable } from 'rxjs'
import { mapTo, map, catchError, startWith, tap, shareReplay } from 'rxjs/operators'


const existUsers = [
    { user_id: 1, user_name: '林冲' },
    { user_id: 2, user_name: '宋江' },
    { user_id: 3, user_name: '晃盖' },
    { user_id: 4, user_name: '悟空' },
]

export interface ImaybeUser {
    payload?: {
        user_id: number
        user_name: string
    }
    err?: Error
    isLoading?: boolean
}
export class User extends Icreateable<ImaybeUser> {
    // 假如使用该默认用户自动登录
    private defaultUser = timer(500).pipe(
        mapTo<number, ImaybeUser>({ payload: { user_id: 1, user_name: '林冲' } })
    )
    // 使用过程中可以随便切换账号
    private shiftUserId$ = new Subject<number>()
    private shiftUser$ = this.shiftUserId$.pipe(
        map<number, ImaybeUser>(
            id => {
                const user = existUsers.find(x => x.user_id === id)
                if (!user) {
                    return { err: new Error('user not found') }
                }
                return { payload: user };
            }
        )
    )
    public obs = merge(
        this.defaultUser,
        this.shiftUser$
    ).pipe(
        startWith<ImaybeUser>({ isLoading: true }),
        shareReplay(1)
    )
    public shiftUser(id: number) {
        this.shiftUserId$.next(id)
    }
}