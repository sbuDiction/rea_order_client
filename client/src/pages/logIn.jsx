import React from 'react';
import { Card, Button, Icon, Input, Label, Container } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../utils/Auth';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            pass_code: '',
            email_address: '',
            redirect: false,
            isLoading: false,
            no_input: false,
        }
    }

    handleLogin = async () => {
        const { email_address, pass_code } = this.state;
        const params = {
            input_password: pass_code,
            input_email: email_address
        };
        if (params.input_email === '' || params.input_password === '') {
            this.setState({ no_input: true });
        } else {
            this.setState({ no_input: false });
            await Axios.post('http://localhost:5000/api/rea_order/login', params)
                .then(async res => {
                    let results = res.data;
                    if (results.data) {
                        window.localStorage.setItem('token', `${results.token}`);
                        await Auth.check();
                        this.setState({ redirect: true });
                        this.setState({ isLoading: true });
                    }
                })
        }
    }

    handleOnchange = event => {
        let input = event.target.name;
        if (input === 'email') {
            this.setState({ email_address: event.target.value });
        } else if (input === 'password') {
            this.setState({ pass_code: event.target.value });
        }
    }

    renderStart = () => {
        return (
            <div>
                <Container textAlign='center' style={{ paddingTop: 200 }}>
                    <Link to='/app'>
                        <Button animated circular positive basic size='large'>
                            <Button.Content visible>Start Ordering!</Button.Content>
                            <Button.Content hidden>
                                <Icon name='arrow right' />
                            </Button.Content>
                        </Button>
                    </Link>
                </Container>
            </div>
        );
    }

    renderLogin = () => {
        const { isLoading, no_input } = this.state;
        let label;
        if (no_input) {
            label = <Label basic pointing prompt color='red'>
                You forgot to enter details!
            </Label>
        }
        return (
            <div>
                <Card.Group style={{ paddingTop: 160 }} centered>
                    <Card color='teal'>
                        <Card.Content>
                            <Card.Header style={{ paddingLeft: 75, fontFamily: "Rubik, sans-serif", color: 'rgb(117, 117, 117)', fontWeight: 300 }}><Icon name='sign in' /> Login</Card.Header>
                            <Card.Description style={{ paddingLeft: 40 }}>
                                <Input size='mini' icon='user' iconPosition='left' placeholder='Email address' type='text' name='email' onChange={this.handleOnchange} />
                                {label}
                                <div className='gr'></div>
                                <Input size='mini' icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' onChange={this.handleOnchange} />
                                <div className='gr'></div>
                                <div style={{ paddingLeft: 40 }}>
                                    <Button content='Login' circular color='teal' type='submit' onClick={this.handleLogin} loading={isLoading} />
                                </div>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <small style={{ color: 'rgb(117, 117, 117)', paddingLeft: 50 }}>Don't have an account yet?</small>
                            <Link to='/signup'><Button fluid content='Sign Up' icon='signup' positive basic /></Link>
                        </Card.Content>
                    </Card>
                </Card.Group>

            </div>
        );
    }

    render() {
        const { redirect } = this.state;
        let content;
        if (redirect) {
            return <Redirect to='/app' />
        }

        if (Auth.getAuth()) {
            content = this.renderStart();
        } else {
            content = this.renderLogin();
        }
        return (
            <div>
                {content}
            </div >
        );
    }
}

export default Login;