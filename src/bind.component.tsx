import * as React from 'react';
import { of, iif, BehaviorSubject } from 'rxjs';
import { create, Ioptions } from './lib/rx-react/store'
import { catchError, map, switchMap } from 'rxjs/operators';
import { Icreateable } from './lib/rx-react/store'


interface Iprops<U extends Icreateable<any>> {
    $: { new(): U }
    options?: Ioptions
    children: (
        err: Error | undefined,
        payload: (U extends Icreateable<infer T> ? T : never) | undefined,
        instance: U
    ) => React.ReactElement<any>
}

const defaultOptions: Ioptions = { singleton: true, keepAlive: false }

class Bind<U extends Icreateable<any>> extends React.PureComponent<Iprops<U>, { payload?: any, err?: Error }> {
    private didMount$ = new BehaviorSubject(false)
    state = { payload: undefined, err: undefined }
    instance: U;
    constructor(props: Iprops<U>) {
        super(props)
        const { $, options } = this.props
        const opts = { ...defaultOptions, ...options }
        this.instance = create($, opts)
        this.didMount$.pipe(
            switchMap(
                didmount => iif(
                    () => didmount,
                    this.instance.obs
                )
            ),
            map<any, { payload: any }>(payload => ({ payload })),
            catchError<any, { err: Error }>(err => of({ err }))
        ).subscribe(
            ({ payload, err }) => {
                console.log({ payload, err })
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
        return payload || err ? children(err, payload, this.instance) : "";
    }
}

export default Bind;
