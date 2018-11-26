import * as React from 'react';
import { User } from './lib/rx-react/user.obs'
import Bind from './lib/rx-react/bind.component'
import { Project } from './lib/rx-react/project.obs';
import { Link } from 'react-router-dom'

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Link to='Page2'>
                    Page2
                </Link>
                <Bind $={User}>
                    {(err, data, instance) => {
                        if (err && err.message !== 'user not found') {
                            return <div style={{ background: 'red' }}>{err.message}</div>
                        }
                        const f = React.createRef<HTMLInputElement>()
                        return <form onSubmit={
                            (e) => {
                                e.preventDefault()
                                instance.shiftUser(f.current!.value)
                            }
                        }>
                            <input type="text" ref={f} placeholder="input some id to login, like: 1,2,3,4,5,6" style={{ width: 300 }} />
                        </form>
                    }}
                </Bind>

                <Bind $={User}>
                    {(err, data, instance) => {
                        const error = err || data!.err
                        if (error) {
                            return <div style={{ background: 'red' }}>{error.message}</div>
                        }
                        if (data!.isLoading) {
                            return <div>isLoading</div>
                        }
                        return <p>
                            user_id: {data!.payload!.user_id}<br />
                            user_name: {data!.payload!.user_name}
                        </p>
                    }}
                </Bind>

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

export default Page1;
