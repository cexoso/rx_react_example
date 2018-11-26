import * as React from 'react';
import Bind from './lib/rx-react/bind.component'
import { Project } from './lib/rx-react/project.obs';
import { Link } from 'react-router-dom'
class Page2 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Link to='Page1'>
                    Page1
                </Link>
                <Bind $={Project}>
                    {(err, data, instance) => {
                        const error = err || data!.err
                        if (error) {
                            return <div style={{ background: 'red' }}>{error.message}</div>
                        }
                        if (data!.isLoading) {
                            return <div>isLoading</div>
                        }
                        return <p>
                            proj_id: {data!.payload!.proj_id}<br />
                            proj_name: {data!.payload!.proj_name}
                        </p>
                    }}
                </Bind>
            </div>

        );
    }
}

export default Page2;
