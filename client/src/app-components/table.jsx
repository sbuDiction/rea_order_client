import React from 'react'
import { Header, Table, Icon } from 'semantic-ui-react'


export default class TableExampleCollapsing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.setState({ orders: this.props.array });
    }

    render() {
        const { orders } = this.state
        console.log(orders);
        return (
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Orders</Table.HeaderCell>
                        <Table.HeaderCell>Total cost per order</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {/* {orders.map(item => ( */}
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Header as='h4'>
                                    {/* <Image src='/images/avatar/small/lena.png' rounded size='mini' /> */}
                                    <Icon name='food' />
                                    <Header.Content>
                                        Title
                                        <Header.Subheader>One</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>R12.00</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                {/* ))} */}
            </Table>
        );
    }
}