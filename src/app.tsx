import * as React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Page1 from './page1';
import Page2 from './page2';
import LoginPage from './regist'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/Page1" component={Page1} />
                    <Route path="/Page2" component={Page2} />
                    <Route path="/login" component={LoginPage} />
                    <Redirect to="./login" />
                </Switch>
            </Router>
        );
    }
}

export default App;
