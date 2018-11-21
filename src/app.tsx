import * as React from 'react';
import { Provider, manager } from './dataManager'
import UserUI from './user';

class App extends React.Component {
    state = { value: 1 }
    onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ value: event.target.value })
    }
    render() {
        return (
            <Provider value={manager}>
                <UserUI />
            </Provider>

        );
    }
}

export default App;
