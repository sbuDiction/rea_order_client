import React from 'react'
import { Icon, Loader, Table } from 'semantic-ui-react'

const TableExamplePositiveNegative = () => (
    <Table collapsing>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Order</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.Row>
        </Table.Header>

        <Table.Body >
            <Table.Row positive>
                <Table.Cell>Kota small</Table.Cell>
                <Table.Cell>
                    {/* <Loader size='small' active /> */}
                    <Icon name='redo' loading />
                    Preparing meal
                    </Table.Cell>
                <Table.Cell>None</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default TableExamplePositiveNegative

// hourglass half
// hourglass end