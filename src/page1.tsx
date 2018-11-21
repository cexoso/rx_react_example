import * as React from 'react';
import UserUI from './user';

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                page1.
                <UserUI />
            </div>
        );
    }
}

export default Page1;
