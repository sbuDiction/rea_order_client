import React, { Component } from 'react';
import { Checkbox, Form, Input, Radio, TextArea, Button, Message } from 'semantic-ui-react';
import Axios from 'axios';

class UpdateStockForm extends Component {
    constructor() {
        super();
        this.state = {
            qty: 0,
            name: '',
            description: '',
            price: 0,
            isNew: false,
            message: ''
        };
    }

    handleChange = (e, { qty }) => this.setState({ qty: Number(qty) });

    handleInputChange = event => {
        let input = event.target.name;
        if (input === 'name') {
            this.setState({ name: event.target.value });
        } else if (input === 'price') {
            this.setState({ price: Number(event.target.value) });
        } else if (input === 'description') {
            this.setState({ description: event.target.value });
        };
    }

    handleAddButton = async () => {
        try {
            const { qty, name, description, price } = this.state;
            const params = { qty, name, description, price };
            await Axios.post('/api/rea_order/add/stock', params)
                .then(res => {
                    this.setState({ message: res.data.status });
                });
        } catch (error) {

        };
    }

    render() {
        const { qty, message } = this.state;
        let content;
        if (message === 'Stock was successfuly updated.') {
            content = <Message success header={message} content='You can now update the quantity of this meal in stock' />;
        } else if (message === 'Stock quantity successfuly updated.') {
            content = <Message success header={message} content='You can now update the quantity of this meal in stock' />;
        };
        
        return (
            <div>
                {content}
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field control={Input} label='Meal name' placeholder='Name of the meal' name='name' onChange={this.handleInputChange} />
                        <Form.Field control={Input} label='Price tag' placeholder='Meal price tag' type='number' name='price' onChange={this.handleInputChange} />
                    </Form.Group>
                    <Form.Group grouped>
                        <label>Meal quantity</label>
                        <Form.Field control={Radio} label='One' qty='1' checked={qty === '1'} onChange={this.handleChange} />
                        <Form.Field control={Radio} label='Five' qty='5' checked={qty === '5'} onChange={this.handleChange} />
                        <Form.Field control={Radio} label='Ten' qty='10' checked={qty === '10'} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Field control={TextArea} label='Meal description' placeholder='Add what is in the meal...' name='description' onChange={this.handleInputChange} />
                    <Form.Field control={Checkbox} label='New meal?' />
                    <Button content="Add item" labelPosition='right' icon='checkmark' positive onClick={this.handleAddButton} />
                </Form>
            </div>
        )
    }
}

export default UpdateStockForm