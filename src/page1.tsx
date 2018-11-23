import * as React from 'react';
import { crateUser$ } from './user.obs'
import Bind from './bind.component'

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Bind $={crateUser$}>
                    {(err, payload) => {
                        console.log(err, payload)
                        return <div>123</div>
                    }}
                </Bind>
            </div>
        );
    }
}

export default Page1;
