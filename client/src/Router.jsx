import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReaOrderApp from './App/ReaOrder';
// import Checkout from './main/checkout';
import createAccount from './pages/createAccount';
import Login from './pages/logIn';
import Auth from './utils/Auth';
import Admin from './admin/Main';

const Router = (props) => (
    <HashRouter>
        <Switch>
            <Route exact path='/signup' component={createAccount} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/app' component={ReaOrderApp} />
            <Route exact path='/admin' component={Admin} />
        </Switch>
    </HashRouter>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.getAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login"
                    }}
                />
            )
        }
    />
);

export default Router;