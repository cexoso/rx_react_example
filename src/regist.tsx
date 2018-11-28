import * as React from 'react';
import Bind from './lib/rx-react/bind.component'
import { RegistForm } from './lib/rx-react/RegistForm.obs'

class LoginPage extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Bind $={RegistForm}>
                    {(err, data, instance) => {
                        if (err) {
                            return <div style={{ background: 'red' }}>{err.message}</div>
                        }
                        console.log(data)
                        if (!data) {
                            return ''
                        }
                        return <form onSubmit={(e) => e.preventDefault()}>
                            <input type="text" value={data.values.name} style={{ width: 300 }} onChange={instance.changeName} />
                            {!data.status.isValidate && <p style={{ color: 'red' }}>
                                {data.status.validateMsg}
                            </p>}
                            <input type="text" value={data!.values.password} style={{ width: 300 }} onChange={instance.changePassword} />
                            <button type="submit">
                                注册
                            </button>
                        </form>
                    }}
                </Bind>
            </div>
        );
    }
}

export default LoginPage;
