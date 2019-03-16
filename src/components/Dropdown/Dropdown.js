import React from 'react';

const dropdown = (props) => {

    let selectEle = null;


    switch(props.type) {

        case('Year'):
            const currentYear = (new Date()).getFullYear();
            const years = Array.from(new Array(30),( val, index) => currentYear - index);
            selectEle = (
                <select onChange = {props.yearChanged}>
                    { years.map(year => (
                        <option key = {year}
                                value = {year}>{year}</option>
                    ))}
                </select>
            );
        break;

        case('Month'):
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                             'August', 'September', 'October', 'November', 'December']; 
            selectEle = (
                <select onChange = {props.monthChanged}>
                    { months.map(month => (
                        <option key = {month}
                            value = {month}>{month}</option>  
                    ))}
                </select>
            );
        break;

    }

    return (
        <div style = {{display : 'inline-block',
                        marginLeft: '15px',
                        marginRight: '15px'}}>
            <label>{props.type}</label>
            {selectEle}
        </div>
    )


}

export default dropdown;