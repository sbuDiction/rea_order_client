import React, { Component } from 'react'
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Dashbord } from './Dashbord';



export default class MenuExampleInvertedSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu inverted secondary borderless pointing color='grey' stackable>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}>
            <Icon name='home' color='black' size='large' />Admin
          </Menu.Item>

          <Menu.Item position='right'>
            <Input placeholder='Search...' />
          </Menu.Item>

          <Menu.Item
            position='right'
            name='logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}>
            <Icon name='log out' size='large' color='black' /> Logout
          </Menu.Item>
        </Menu>
        <Dashbord />
      </div>
    )
  }
}