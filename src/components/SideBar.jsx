import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React from 'react';
import { Icon } from 'semantic-ui-react';
import Menu from './Menu';
import ContextRender from './Context';


export default class SideBar extends React.Component {
    state = { activeItem: 'home' }
    onSelect = (selected) => {
        // console.log(selected);
        this.setState({ activeItem: selected })
    }

    render() {
        const activeItem = this.state.activeItem
        console.log(activeItem);
        return (
            <div className='app-container'>
                <SideNav className="sidebar"
                    onSelect={this.onSelect} >
                    <SideNav.Toggle className='toggleBtn' />
                    <SideNav.Nav className='' defaultSelected="home">
                        <NavItem eventKey="home">
                            <NavIcon>
                                <Icon name='home' style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>Home</NavText>
                        </NavItem>
                        <NavItem className='sideNavItem' eventKey="menu">
                            <NavIcon>
                                <Icon name='food' style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>Menu</NavText>
                        </NavItem>
                        <NavItem eventKey="profile">
                            <NavIcon>
                                <Icon name='settings' style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>Settings</NavText>
                            <NavItem eventKey="settings/profile">
                                <NavText>Profile</NavText>
                            </NavItem>
                            {/* <NavItem eventKey="charts/barchart">
                            <NavText>Bar Chart</NavText>
                        </NavItem> */}
                        </NavItem>
                        <NavItem className='sideNavItem' eventKey="logout">
                            <NavIcon>
                                <Icon name='power' style={{ fontSize: '1.75em' }} />
                            </NavIcon>
                            <NavText>Sign Out</NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <div className='main'>
                    {/* {console.log(activeItem)} */}
                    <Menu />
                    <ContextRender menuItem={activeItem} />
                </div>
            </div>

        )
    }
}
