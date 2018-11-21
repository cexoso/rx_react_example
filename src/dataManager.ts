import * as React from 'react';
import { createManager } from './lib/rx-react/index'
import 'rxjs'
// of('1')
const _manager = createManager()
const content = React.createContext(_manager.content)

setTimeout(() => {
    _manager.registerService('user$', [() => {
        return '11'// of({ user_id: '111', user_name: 'xiongjie' })
    }])
}, 500)


content.displayName = 'dataManager'

export const { Provider, Consumer } = content
export const manager = _manager
