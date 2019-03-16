import React from 'react';
import State from '../State/State';

const stateslist = (props) => {

    let States = (
        <p>No Data to show..</p>
    );

    if(Object.keys(props.states).length != 0) {
        States = Object.keys(props.states).map(stateName => (
            <State key = {stateName}
                   color = {props.color}
                   name = {stateName}
                   value = {props.states[stateName]}>
            </State> ) 
        );
    }

    return (
        <div style = {{ width : '30%',
                        border: '2px solid',
                        marginLeft: '20px' ,
                        marginRight: '20px'}}>
            <h4>{props.title}</h4>
            <State color = 'black'
                   name = 'State'
                   value = 'Median HMR'  />
            {States}
        </div>
    )
}

export default stateslist;