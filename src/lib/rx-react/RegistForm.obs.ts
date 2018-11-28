import { Icreateable } from './module'
import { timer, of, iif, concat, merge, BehaviorSubject } from 'rxjs'
import { map, startWith, debounceTime, switchMap, filter, scan, switchMapTo } from 'rxjs/operators'

function fakeRemoteValiate(name: string) {
    return timer(1000).pipe(switchMapTo(
        iif(
            () => ['xiaom', 'xiongj', 'dc'].indexOf(name) !== -1,
            of<IValidate>({ validateMsg: `名称: ${name}, 已经存在`, duringValidating: false, isValidate: false, hasValidate: true }),
            of<IValidate>({ duringValidating: false, isValidate: true, hasValidate: true, validateMsg: "" })
        )
    ))
}
interface IValidate {
    duringValidating?: boolean
    validateMsg?: string
    isValidate?: boolean
    hasValidate?: boolean
}
interface IRegisterForm {
    values: {
        name: string
        password: string
    }
    status: IValidate
}
const initValue: IRegisterForm = {
    values: {
        name: "",
        password: ""
    },
    status: {
        duringValidating: false,
        validateMsg: "",
        isValidate: true,
        hasValidate: false
    }
}

export class RegistForm extends Icreateable<IRegisterForm> {
    public changeName = (e: any) => {
        this.name$.next(e.target.value)
    }
    public changePassword = (e: any) => {
        this.password$.next(e.target.value)
    }
    private name$ = new BehaviorSubject<string>('')
    private password$ = new BehaviorSubject<string>('')
    private nameValidate$ = this.name$.pipe(
        debounceTime(300),
        filter(x => !!x),
        switchMap(name => concat(of<IValidate>({ duringValidating: true }), fakeRemoteValiate(name))),
        scan<IValidate>(
            (acc, x) => ({ ...acc, ...x }),
            {
                duringValidating: false,
                validateMsg: "",
                isValidate: true,
                hasValidate: false
            }
        ),
        startWith<IValidate>({ duringValidating: false, hasValidate: false })
    )
    public obs = merge(
        this.nameValidate$.pipe(
            map(
                validate => ({
                    type: 'validate',
                    payload: { status: validate }
                })
            )
        ),
        this.name$.pipe(            
            map(
                name => ({ type: 'fill', payload: { name } })
            )
        ),
        this.password$.pipe(
            map(
                password => ({ type: 'fill', payload: { password } })
            )
        )
    ).pipe(
        scan<Iaction, IRegisterForm>(
            (acc, x) => {
                switch (x.type) {
                    case 'validate':
                        return { ...acc, ...x.payload }
                    case 'fill':
                        Object.assign(acc.values, x.payload)
                }
                return { ...acc }
            },
            initValue
        )
    )
}
