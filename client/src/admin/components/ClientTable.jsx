import React from 'react';
import { Icon, Table, Checkbox } from 'semantic-ui-react';
import Axios from 'axios';

class ClientTable extends React.Component {
    constructor() {
        super();
        this.state = {
            users: [],
        }
    }

    async componentDidMount() {
        try {
            await Axios.get('http://localhost:5000/api/rea_order/users/data')
                .then(async res => {
                    if (res.data.isTrue) {
                        this.setState({ users: await res.data.data });
                    };
                });
        } catch (error) {

        };
    }

    renderTableItems = () => {
        const { users } = this.state;
        return (
            <>
                {users.map(users => (
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell>{users.id}</Table.Cell>
                            <Table.Cell>{users.name}</Table.Cell>
                            <Table.Cell>{users.last_name}</Table.Cell>
                            <Table.Cell>{users.email}</Table.Cell>
                            <Table.Cell>{users.phone_number}</Table.Cell>
                            <Table.Cell>{users.home_address}</Table.Cell>
                            <Table.Cell><Icon name='x' color='black' /> {users.verified.toString()}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </>
        );
    }

    render() {
        return (
            <div>
                <Checkbox label='Filter by verification' />
                <Table celled stackable size='small' selectable striped color='blue' inverted compact>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Last name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Cell number</Table.HeaderCell>
                            <Table.HeaderCell>Home address</Table.HeaderCell>
                            <Table.HeaderCell>Verified</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    {this.renderTableItems()}
                </Table>
            </div>
        );
    }
}

export default ClientTable;