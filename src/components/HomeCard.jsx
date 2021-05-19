import React from 'react'
import { Card, Label } from 'semantic-ui-react'
import _ from 'lodash'

const items = [
    {
        id: 1,
        href: '#order',
        header: 'Kota Small',
        description:
            'Chips, Polony & Full Vienna.',
        meta: 'R10.00',
    },
    {
        id: 2,
        href: '#order',
        header: 'Kota Small Meal With Special',
        description:
            'Chips, Polony, Full Vienna & Special.',
        meta: 'R12.00',
    },
    {
        id: 3,
        href: '#order',
        header: 'Kota Medium',
        description:
            'Chips, Polony, Half Russian & Half Vienna.',
        meta: 'R15.00',
    },
    {
        id: 4,
        href: '#order',
        header: 'Kota Medium Meal',
        description:
            'Chips, Polony, Lettuce, Burger & Cheese.',
        meta: 'R19.00',
    },
    {
        id: 5,
        href: '#order',
        header: 'Kota Mediun Meal With Special',
        description:
            'Chips, Polony, Full Russian, Special & Cheese.',
        meta: 'R20.00',

    },
    {
        id: 6,
        href: '#order',
        header: 'Kota Large Meal',
        description:
            'Chips, Polony, Full Russian, Full Vienna & Cheese.',
        meta: 'R22.00',

    },
    {
        id: 7,
        href: '#order',
        header: 'Kota Extra Large With Special',
        description:
            'Chips, Polony, Lettuce, Full Russian, Full Vienna, Special & Cheese.',
        meta: 'R25.00',

    },
    {
        id: 8,
        href: '#order',
        header: 'Dagwood small',
        description:
            'Chips, Polony, Burger, Lettuce, Onion, Tomato & Cheese.',
        meta: 'R20.00',

    },
    {
        id: 9,
        href: '#order',
        header: 'Dagwood Medium Meal',
        description:
            'Chips, Polony, Burger, Lettuce, Onion, Tomato, Cheese & Egg.',
        meta: 'R23.00',

    },
    {
        id: 10,
        href: '#order',
        header: 'Dagwood Large Meal',
        description:
            'Chips, Polony, Burger, Lettuce, Onion, Tomato, Cheese, Egg & Special.',
        meta: 'R27.00',

    },
]


export default class CardExampleGroupCentered extends React.Component {

    render() {
        return (
            <Card.Group itemsPerRow={3} stackable centered doubling >
                {_.map(items, (item) => (
                    
                    <Card href={item.href + '/' + item.id} >
                    
                        <Card.Content>
                            {/* <Label attached='top right' color='green' >2</Label> */}
                            <Card.Header>{item.header}</Card.Header>
                            <Card.Description>
                                {item.description}
                            </Card.Description>
                            <Card.Meta>{item.meta}</Card.Meta>
                        </Card.Content>
                    </Card>
                    
                ))}
            </Card.Group>
        )
    }
}