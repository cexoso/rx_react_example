import * as React from 'react';
import { User, ImaybeUser } from './user.obs'
import Bind from './bind.component'

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Bind $={User}>
                    {(err, data, instance) => {
                        if (err) {
                            return <div style={{ background: 'red' }}>{err.message}</div>
                        }
                        if (data.isLoading) {
                            return <div>isLoading</div>
                        }
                        // onClick={() => instance.}
                        return <p>
                            user_id: {data.payload!.user_id}<br />
                            user_name: {data.payload!.user_name}
                        </p>
                    }}
                </Bind>
            </div>
        );
    }
}

export default Page1;
