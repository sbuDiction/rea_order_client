import React from 'react';
import { Card, Button, Icon, Input, Popup } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';

class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            last_name: '',
            pass_code: '',
            confirm_pass_code: '',
            email_address: '',
            phone_number: '',
            isLoading: false,
            alert: '',
            redirect: false,
            isMatch: false,
            matchFound: false
        }
    }

    handleSubmit = async event => {
        const { name, last_name, pass_code, confirm_pass_code, email_address, phone_number } = this.state
        const params = {
            input_name: name,
            input_surname: last_name,
            input_password: pass_code,
            input_email: email_address,
            input_phone: phone_number
        };

        if (confirm_pass_code === pass_code) {
            this.setState({ isMatch: false });
            this.setState({ isLoading: true });
            await Axios.post('http://localhost:5000/api/rea_order/create_account', params)
                .then(async res => {
                    let results = res.data;
                    if (results.data) {
                        const token = await results.token;
                        window.localStorage.setItem('token', `${token}`)
                        this.setState({ redirect: true });
                        this.setState({ isLoading: false });
                    } else {
                        this.setState({ isLoading: false });
                    }
                });
        }


    }

    handleChange = event => {
        let input = event.target.name;
        if (input === 'name') {
            this.setState({ name: event.target.value });
        } else if (input === 'surname') {
            this.setState({ last_name: event.target.value });
        } else if (input === 'email') {
            this.setState({ email_address: event.target.value });
        } else if (input === 'phone') {
            this.setState({ phone_number: event.target.value });
        } else if (input === 'password') {
            this.setState({ pass_code: event.target.value });
        } else if (input === 'confirmPassword') {
            if (event.target.value.length === this.getPasswordLength()) {
                this.setState({ matchFound: true });
                this.setState({ isMatch: false });
            } else if (event.target.value.length !== this.getPasswordLength()) {
                this.setState({ matchFound: false, isMatch: true });
            }
            this.setState({ isMatch: true });
            this.setState({ confirm_pass_code: event.target.value });
        }
    }

    handleRedirect = () => {

    }

    getPasswordLength = () => this.state.pass_code.length


    renderPopUp = () => {
        const { isMatch, matchFound } = this.state;
        let isLoading = isMatch;
        let color = 'red'
        if (matchFound) {
            color = 'green';
            isLoading = false;
        } else if (!matchFound) {
            color = 'red';
        }
        return (
            <Popup
                content={<>Checking if password's <code>match: <span style={{ color: `${color}` }} >{matchFound.toString().toUpperCase()}</span></code></>}
                on='click'
                positionFixed
                size='mini'
                trigger={<Input size='mini' placeholder='Confirm password' name='confirmPassword' type='password' onChange={this.handleChange} required autoComplete='new-password' loading={isLoading} />}
            />
        )
    }

    render() {
        const { isLoading, redirect } = this.state
        if (redirect) {
            return <Redirect to='/login' />
        }
        return (
            <div>
                <Card.Group style={{ paddingTop: 110 }} centered>
                    <Card color='teal'>
                        <Card.Content>
                            <Card.Header style={{ paddingLeft: 35, fontFamily: "Rubik, sans-serif", color: 'rgb(117, 117, 117)', fontWeight: 300 }}><Icon name='user' /> Create account</Card.Header>
                            <Card.Description style={{ paddingLeft: 40 }}>
                                <Input size='mini' placeholder='Name' name='name' type='text' onChange={this.handleChange} required />
                                <div className='gr'></div>
                                <Input size='mini' placeholder='Last name' name='surname' type='text' onChange={this.handleChange} required />
                                <div className='gr'></div>
                                <Input size='mini' placeholder='Email address' name='email' type='email' onChange={this.handleChange} required autoComplete='email' />
                                <div className='gr'></div>
                                <Input size='mini' placeholder='Phone number' name='phone' type='cellphone' onChange={this.handleChange} required />
                                <div className='gr'></div>
                                <Input size='mini' placeholder='Password' name='password' type='password' onChange={this.handleChange} required autoComplete='new-password' />
                                <div className='gr'></div>
                                {this.renderPopUp()}
                                <div className='gr'></div>
                                <div style={{ paddingLeft: 30 }}>
                                    <Button content='Sign Up' loading={isLoading} circular color='teal' type='submit' onClick={this.handleSubmit} />
                                </div>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <small style={{ color: 'rgb(117, 117, 117)', paddingLeft: 50 }}>Already have an account?</small>
                            <Link to='/login' ><Button fluid content='Login' icon='sign in' positive basic /></Link>

                        </Card.Content>
                    </Card>
                </Card.Group>
            </div >
        );
    }
}

export default CreateAccount;