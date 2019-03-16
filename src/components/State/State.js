import React from 'react';

const state = (props) => (
    <div style = {{ margin: 'auto',
                    width: '400px',
                    overflow: 'hidden' }}>
        <p style = {{float: 'left'}}>
            <span style = {{color:props.color}}>{props.name}</span>
        </p>
        <p style = {{ float: 'right',
                    margin: '0px 20px',
                    padding: '14px',
                    width: '180px' }}>

            <span style = {{color:props.color}}>{
                (typeof props.value == "number")? 
                    props.value.toFixed(1) :
                    props.value
                }
            </span>
        </p>
    </div>

)

export default state;