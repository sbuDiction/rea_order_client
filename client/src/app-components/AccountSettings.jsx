import React from 'react';
import { Header, Image, Button, Grid, Form, Segment, Label } from 'semantic-ui-react';
import Axios from 'axios';
import Auth from '../utils/Auth';

class AccountSettings extends React.Component {
  constructor() {
    super()
    this.state = {
      user: []
    }
  }

  async componentDidMount() {
    let config = {
      headers: {
        'Authorization': `bearer:${Auth.getToken()}`
      }
    }
    await Axios.get('http://localhost:5000/api/rea_order/user', config)
      .then(res => {
        this.setState({ user: res.data.data });
      });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <Header as='h2' dividing>
          <Image circular src='./logo512.png' /> <span style={{ color: 'teal', fontWeight: 300, fontSize: 20 }}>{user.name + ' ' + user.last_name}</span>
          <Header.Subheader>
            Manage your account settings.
          </Header.Subheader>
        </Header>
        <Segment stacked color='teal' raised tertiary compact>
          <Label as='a' color='orange' ribbon='right' icon='power off' size='medium' content='Logout' /> 
          <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
              <Form>
                <Form.Input
                  icon='user'
                  iconPosition='left'
                  label='Username'
                  placeholder={user.name}
                />
                <Form.Input
                  icon='user'
                  iconPosition='left'
                  label='Surname'
                  placeholder={user.last_name}
                />
                <Form.Input
                  icon='mail'
                  iconPosition='left'
                  label='Email'
                  placeholder={user.email}
                  type='email'
                />
                <Form.Input
                  icon='map marker alternate'
                  iconPosition='left'
                  label='Home address'
                  placeholder={user.home_address}
                />

                {/* <Button content='Login' primary /> */}
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign='middle'>
              <Form>
              </Form>
              <Button content='Update account' icon='edit' size='big' color='teal' basic />
            </Grid.Column>
          </Grid>

          {/* <Divider vertical>Or</Divider> */}
        </Segment>
      </div>
    );
  }
}

export default AccountSettings