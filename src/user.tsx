import * as React from 'react';
import { Consumer, manager } from './dataManager'

class UserUI extends React.Component {
    private user$ = manager.inject('user$')
    constructor(props: any) {
        super(props)
        console.log(this.user$)
    }
    onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ value: event.target.value })
    }
    render() {
        return (
            <Consumer>
                {value => {
                    console.log(value)
                    return <div>
                        123
                    </div>
                }}
            </Consumer>
        );
    }
}

export default UserUI;
