import { HashRouter, Switch, Route } from 'react-router-dom';
import ReaOrderApp from './App/ReaOrder';
import AdminPage from './app-components/Admin';

const Router = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={ReaOrderApp} />
            {/* <Route exact path='/order/:id' component={HomePage} /> */}
            <Route exact path='/admin' component={AdminPage} />
            {/* <Route exact path='/checkout' component={CheckoutPage} /> */}
        </Switch>
    </HashRouter>
)

// const privateRoute = ({ component: Component, ...rest }) => {
//     <Route
//         {...rest}
//         render={props => 2 ? (
//             <Component {...props} />
//         ) : (
//             <Redirect
//                 to={{
//                     pathname: '/login'
//                 }}
//             />
//         )
//         }
//     />
// };

export default Router;