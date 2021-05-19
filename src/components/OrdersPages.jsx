import React from 'react'
import { Grid } from 'semantic-ui-react'
import StatusList from './StatusList';
import History from './PreviousOrders';

const GridExampleTextAlignmentCenter = () => (
    <>
        <div className='status'>
            <StatusList />
        </div>
        <div className='history'>
            <History />
        </div>
    </>
)

export default GridExampleTextAlignmentCenter