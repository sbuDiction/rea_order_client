import React, { Component } from 'react'
import { Accordion, Icon } from 'semantic-ui-react'
import RadioButton from './RadioButton';
import CheckBox from './CheckBox';

export default class AccordionExampleFluid extends Component {
    state = { activeIndex: 0 }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <Accordion fluid styled>
                <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                    <Icon name='dropdown' />Choose your Drink</Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                    <RadioButton />
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                    <Icon name='dropdown' />Optional Extras</Accordion.Title>
                <Accordion.Content active={activeIndex === 1}>
                    <p>Choose up to 6</p>
                    <CheckBox />
                </Accordion.Content>

                <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                    <Icon name='dropdown' />Remove an Item</Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <CheckBox />
                </Accordion.Content>
            </Accordion>
        )
    }
}