import * as React from 'react';
import { createManager } from './lib/rx-react/index'
import { of } from 'rxjs'

export const manager = createManager()
export const context = React.createContext(manager)

manager.registerService('user$', [() => {
    return of({ user_id: '111', user_name: 'xiongjie' })
}])


context.displayName = 'dataManager'
export const { Provider, Consumer } = context

