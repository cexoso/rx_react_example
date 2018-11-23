import * as React from 'react';
import { Provider, manager } from './dataManager'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Page1 from './page1';
import Page2 from './page2';

class App extends React.Component {
    render() {
        return (
            <Provider value={manager}>
                <Router>
                    <Switch>
                        <Route path="/Page1" component={Page1} />
                        <Route path="/Page2" component={Page2} />
                        <Redirect to="Page1" />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
