import React from 'react';
// import Calendar from 'react-calendar';
// 'react-calendar/dist/entry.nostyle';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import { Button } from 'reactstrap';
// import Calendar from 'rc-calendar';
// import 'rc-calendar/assets/index.css';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import MomentRange from 'moment-range';
import moment from 'moment';
 
// const moment = MomentRange.extendMoment(Moment);

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  // enquire: {
  //   color: '#ffd200',
  //   label: 'Enquire',
  // },
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Unavailable',
  },
};

const dateRanges = [
  // {
  //   state: 'enquire',
  //   range: moment.range(
  //     moment().add(2, 'weeks').subtract(5, 'days'),
  //     moment().add(2, 'weeks').add(6, 'days')
  //   ),
  // },
  {
    state: 'unavailable',
    range: moment.range(
          moment().add(2, 'weeks').subtract(5, 'days'),
          moment().add(2, 'weeks').add(6, 'days')
        ),
  },
];

const today = new Date();
const todayFormat = today.toLocaleDateString('en-US');

class Start extends React.Component {
  constructor (props) {
    super (props);

    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      dropdownOpen: false,
      value: '',
      states: ''  
    };
  }

  toggle(event) {
    event.preventDefault();

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
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
    console.log(range)
  }

  render () {
    return (
      <tbody>
        <tr>
          <td>
          <button onClick={this.toggle}>
          {todayFormat}
          </button>
          </td>
        </tr>
        <tr>
          <td>
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
              // <div className="menu">
              //  <button> Menu item 1 </button>
              // </div>
            )
            : (
              null
            )
        }
          </td>
        </tr>
        
      </tbody>
      )
  }
}

export default Start;

  
