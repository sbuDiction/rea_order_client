import React from 'react'
import { Header, Table, Icon } from 'semantic-ui-react'
import _ from 'lodash';


export default class TableExampleCollapsing extends React.Component {

    render() {
        let orders = window.localStorage.getItem('orders');
        let cleanApi = JSON.parse(orders);
        return (
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Orders</Table.HeaderCell>
                        <Table.HeaderCell>Total cost per order</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {_.map(cleanApi, (item) => (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4' image>
                                    {/* <Image src='/images/avatar/small/lena.png' rounded size='mini' /> */}
                                    <Icon name='food' />
                                    <Header.Content>
                                        {item.order_title}
                                        <Header.Subheader>{item.order_count}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{'R ' + item.order_price.toFixed(2)}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        );
    }
}