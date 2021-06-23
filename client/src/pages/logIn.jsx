import React from 'react';
import { Card, Button, Icon, Input } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import Axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            pass_code: '',
            email_address: '',
            redirect: false,
            isLoading: false
        }
    }

    handleLogin = async () => {
        const { email_address, pass_code } = this.state;
        const params = {
            input_password: pass_code,
            input_email: email_address
        };

        await Axios.post('http://localhost:5000/api/rea_order/login', params)
            .then(res => {
                let results = res.data;
                console.log(results);
                if (results.data) {
                    this.setState({ redirect: true })
                }
            })
    }

    handleOnchange = event => {
        let input = event.target.name;
        if (input === 'email') {
            this.setState({ email_address: event.target.value });
        } else if (input === 'password') {
            this.setState({ pass_code: event.target.value });
        }
    }

    render() {
        const { redirect, isLoading } = this.state
        if (redirect) {
            return <Redirect to='/app' />
        }
        return (
            <div>
                <Card.Group style={{ paddingTop: 160 }} centered>
                    <Card>
                        <Card.Content>
                            <Card.Header style={{ paddingLeft: 75, fontFamily: "Rubik, sans-serif", color: 'rgb(117, 117, 117)', fontWeight: 300 }}><Icon name='sign in' /> Login</Card.Header>
                            <Card.Description style={{ paddingLeft: 40 }}>
                                <Input size='mini' placeholder='Email address' type='text' name='email' onChange={this.handleOnchange} />
                                <div className='gr'></div>
                                <Input size='mini' placeholder='Password' type='password' name='password' onChange={this.handleOnchange} />
                                <div className='gr'></div>
                                <div style={{ paddingLeft: 30 }}>
                                    <Button content='Login' circular icon='signup' type='submit' onClick={this.handleLogin} loading={isLoading} />
                                </div>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <small style={{ color: 'rgb(117, 117, 117)', paddingLeft: 50 }}>Don't have an account yet?</small>
                            <Link to='/signup'><Button fluid content='Signup' icon='user' positive basic /></Link>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div >
        );
    }
}

export default Login;