import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Home from '../main/Home';
import Orders from '../main/Orders';
import Carts from '../main/Carts';


export default function Navigation() {
    const [value, setValue] = React.useState('home');
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);

    const renderScreen = () => {
        let screen = '';

        switch (value) {
            case 'home':
                screen = <Home />
                break;
            case 'carts':
                screen = <Carts />
                break;
            case 'orders':
                screen = <Orders />
                break;
            default:
                break;
        }
        return (
            screen
        );

    }



    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            {renderScreen()}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    style={{ backgroundColor: 'rgba(255, 255, 255)' }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value='home' label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction value='carts' label="Carts" icon={<ShoppingCartIcon />} />
                    <BottomNavigationAction value='orders' label="Orders" icon={<LocalMallIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}