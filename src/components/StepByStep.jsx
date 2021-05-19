import React from 'react'
import { Icon, Step, Loader, Segment, Dimmer } from 'semantic-ui-react'

const StepExampleVertical = () => (
    <Step.Group vertical>
        <Segment>
            <Dimmer active inverted>
                <Loader active inline='centered' />
                <Step loading completed={false} >
                    {/* <Icon name='stopwatch' /> */}
                    <Step.Content>
                        <Step.Title>Order has been received</Step.Title>
                        <Step.Description>Your order is being prepared please wait</Step.Description>
                    </Step.Content>
                </Step>
            </Dimmer>
        </Segment>


        <Step completed={false}>
            <Icon name='payment' />
            <Step.Content>
                <Step.Title>Billing</Step.Title>
                <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
        </Step>

        <Step active>
            <Icon name='info' />
            <Step.Content>
                <Step.Title>Confirm Order</Step.Title>
            </Step.Content>
        </Step>
    </Step.Group>
)

export default StepExampleVertical