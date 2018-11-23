import * as React from 'react';
import { Observable, of, iif, BehaviorSubject } from 'rxjs';
import { create, Ioptions } from './lib/rx-react/store'
import { catchError, map, switchMap } from 'rxjs/operators';

interface Iprops<T> {
    $: () => Observable<T>
    options?: Ioptions
    children: (err: Error | undefined, payload: T) => React.ReactElement<any>
}
const defaultOptions: Ioptions = { singleton: true, keepAlive: false }

class Bind<T> extends React.PureComponent<Iprops<T>, { payload?: any, err?: Error }> {
    private didMount$ = new BehaviorSubject(false)
    state = { payload: undefined, err: undefined }
    constructor(props: Iprops<T>) {
        super(props)
        const { $, options } = this.props
        const opts = { ...defaultOptions, ...options }
        const origin = create($, opts)
        this.didMount$.pipe(
            switchMap(
                didmount => iif(
                    () => didmount,
                    origin
                )
            ),
            map<any, { payload: any }>(payload => ({ payload })),
            catchError<any, { err: Error }>(err => of({ err }))
        ).subscribe(
            ({ payload, err }) => {
                this.setState({ payload, err })
            }
        )
    }
    componentDidMount() {
        this.didMount$.next(true)
    }
    componentWillUnmount() {
        this.didMount$.complete()
    }
    render() {
        const { payload, err } = this.state
        const { children } = this.props
        return payload ? children(err, payload) : "";
    }
}

export default Bind;
