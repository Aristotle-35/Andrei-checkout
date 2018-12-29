import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import moment from 'moment';
 

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Unavailable',
  },
};

    // const dateRanges = [
    //   {
    //     state: 'unavailable',
    //     range: moment.range(
    //       moment().add(3, 'weeks'),
    //       moment().add(3, 'weeks').add(5, 'days')
    //     ),
    //   },
    // ];


const today = new Date();
const todayFormat = today.toLocaleDateString('en-US');

let dateRanges = [];
let disabled = {
  state: 'unavailable',
};

class Start extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      dropdownOpen: false,
      value: '',
      states: ''  
    };

    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  toggle(event) {
    event.preventDefault();
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
    this.props.dates.forEach((date) => {
      let dateObjStart = new Date(date[0]);
      let momentObjStart = moment(dateObjStart);
      let dateObjEnd = new Date(date[1]);
      let momentObjEnd = moment(dateObjEnd);
      disabled.range = moment.range(momentObjStart, momentObjEnd);
      dateRanges.push(disabled);
      //never forget to 'refresh' your transport container! In this case it is 'disabled'.
      disabled = {
        state: 'unavailable',
      };
      // console.log('dateranges', dateRanges);
    })
    
  }

  disableDate (date) {
    console.log(date);
    date.getDay() === 0;
  }
  getInitialState() {
    return {
      value: null,
    };
  }

  handleSelect (range, states) {
    // range is a moment-range object
    this.setState({
      value: range,
      states: states,
    });
    console.log(range);
    console.log(states);
  }

  render () {
   
    // console.log('dates', this.props.dates);
    
    return (
      <div>
          <div onClick={this.toggle}>
          {todayFormat}
          </div>
      
          {
          this.state.dropdownOpen
            ? (
              <DateRangePicker
              firstOfWeek={1}
              numberOfCalendars={1}
              selectionType='range'
              minimumDate={new Date()}
              stateDefinitions={stateDefinitions}
              dateStates={dateRanges}
              defaultState="available"
              showLegend={true}
              value={this.state.value}
              onSelect={this.handleSelect} />
            )
            : (
              null
            )
        }
        </div>
      )
  }
}

export default Start;

  
