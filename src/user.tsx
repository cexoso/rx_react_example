import * as React from 'react';
import { context } from './dataManager'

class UserUI extends React.Component<any, any> {
    private user$ = this.context.inject('user$')
    render() {
        console.log(this.user$)
        return (
            <div>
                123
            </div>
        );
    }
}
UserUI.contextType = context;
export default UserUI;
