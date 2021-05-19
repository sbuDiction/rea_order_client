import FoodMenu from './FoodCard';
import HomeMenu from './HomeCard';
import Login from './LoginAndOut';
import Profile from './Profile';
import OrderPage from './OrderPage'
import ArchivePage from './OrdersPages';

export default function ContextRender(props) {
    const menuItem = props.menuItem;
    let context;
    window.location.hash = '#home';
    switch (menuItem) {
        case 'home':
            context = <HomeMenu />
            break;
        case 'menu':
            window.location.hash = '#menu';
            context = <FoodMenu />
            break;
        case 'checkout':
            window.location.hash = '#checkout';
            context = <OrderPage />
            break;
        case 'orders':
            window.location.hash = '#orders';
            context = <ArchivePage />
            break;
        case 'logout':
            context = <Login />
            break;
        default:
            break;
    }

    return (
        <div>
            {context}
        </div>
    );
}