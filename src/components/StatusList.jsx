import React from 'react'
import { List } from 'semantic-ui-react'

const ListExampleIcon = () => (
    <List>
        <List.Item>
            <List.Icon name='spinner' color='red' loading />
            <List.Content>Preparing your order</List.Content>
        </List.Item>
        <List.Item>
            <List.Icon name='building' />
            <List.Content>Your order is ready for pick up</List.Content>
        </List.Item>
    </List>
)

export default ListExampleIcon