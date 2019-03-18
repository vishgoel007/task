import React, {Component} from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import Statelist from '../../components/StatesList/StatesList';
import axios from 'axios';


class Main extends Component {

    state = {
        states : {
            lesser : {},
            average : {},
            higher : {}
        },
        filter : {
            year : 2019,
            month :'January' 
        }
    };

    fetchApiHandler = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                        'August', 'September', 'October', 'November', 'December']; 
        let hmr45, hmr60;
        let less = {}, avg = {}, high = {};

        axios.get('http://localhost:8001/years')
        .then(countryData => {
            countryData.data.aggregations.year.buckets.forEach(year => {
                if(year.key == this.state.filter.year) {
                    year.months.buckets.forEach(month => {
                        if(month.key == (months.indexOf(this.state.filter.month)+1)) {
                            hmr45 = month.hmrPercentiles.values['45.0'];
                            hmr60 = month.hmrPercentiles.values['60.0'];
                        }
                    });
                }
            });
            return axios.get('http://localhost:8000/states');
        })
        .then(stateData => {
            stateData.data.aggregations.year.buckets.forEach(year => {
                if(year.key == this.state.filter.year) {
                    year.month.buckets.forEach(month => {
                        if(month.key == (months.indexOf(this.state.filter.month)+1)) {
                            month.splitBy.buckets.forEach(mnth => {
                                if(mnth.hmrPercentiles.values['50.0'] < hmr45) {
                                    less[mnth.key] = mnth.hmrPercentiles.values['50.0'];
                                }
                                else if(mnth.hmrPercentiles.values['50.0'] > hmr45 && mnth.hmrPercentiles.values['50.0'] < hmr60) {
                                    avg[mnth.key] = mnth.hmrPercentiles.values['50.0'];
                                }
                                else high[mnth.key] = mnth.hmrPercentiles.values['50.0'];
                            })
                        }
                    });
                }
            });
            const updateStates = {...this.state.states};
            updateStates.lesser = less;
            updateStates.average = avg;
            updateStates.higher = high;
            this.setState({states : updateStates}); 
            
        })
    }

    filterHandler = (event, type) => {
        const updatedFilter = {...this.state.filter};
        updatedFilter[type] = event.target.value;
        this.setState({filter : updatedFilter});
        this.fetchApiHandler();
    }

    componentDidMount() {
        this.fetchApiHandler();
    }

    render () {
        let statesConfiguration = {
            lesser : {
                title : 'States <45%le',
                color : 'red'
            },

            average : {
                title : 'States <60%le and >45%le',
                color : 'orange'
            },

            higher : {
                title : 'States >60%le',
                color : 'green'
            }
        };

        return (
            <div>
                <h3 style = {{display:'inline-block'}}>Filters</h3>

                <Dropdown type = "Year" yearChanged = {(event) => this.filterHandler(event, "year")} />
                <Dropdown type = "Month" monthChanged = {(event) => this.filterHandler(event, "month")} />
                
                <div style = {{width : '100%', display: 'flex', paddingTop: '40px'}}>

                    <Statelist title = {statesConfiguration.lesser.title} 
                            color = {statesConfiguration.lesser.color}
                            states = {this.state.states.lesser} />

                    <Statelist title = {statesConfiguration.average.title} 
                            color = {statesConfiguration.average.color} 
                            states = {this.state.states.average} />

                    <Statelist title = {statesConfiguration.higher.title} 
                            color = {statesConfiguration.higher.color} 
                            states = {this.state.states.higher} />

                </div>
                
            </div>
        );
    }

}

export default Main; 