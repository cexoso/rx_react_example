import * as React from 'react';
import { crateUser$ } from './user.obs'
import Bind from './bind.component'

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Bind $={crateUser$}>
                    {(err, data) => {
                        if (err) {
                            console.log(err)
                        }
                        console.log(data)
                        return <div>123</div>
                    }}
                </Bind>
            </div>
        );
    }
}

export default Page1;
