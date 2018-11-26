import * as React from 'react';
import { User } from './user.obs'
import Bind from './bind.component'

class Page1 extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Bind $={User}>
                    {(err, data, instance) => {
                        if (err && err.message !== 'user not found') {
                            return <div style={{ background: 'red' }}>{err.message}</div>
                        }
                        const f = React.createRef<HTMLInputElement>()
                        return <form onSubmit={(e) => {
                            e.preventDefault()
                            const id = Number.parseInt(f.current!.value, 10)
                            f.current!.value = Number.isNaN(id) ? '' : id.toString()
                            instance.shiftUser(id)

                        }}>
                            <input type="text" ref={f} placeholder="input some id to login, like: 1,2,3,4,5,6" style={{ width: 300 }} />
                        </form>
                    }}
                </Bind>

                <Bind $={User}>
                    {(err, data, instance) => {
                        console.log(err)
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
            </div>
        );
    }
}

export default Page1;
