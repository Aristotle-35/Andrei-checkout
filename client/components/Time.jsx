import React from 'react';
import _ from 'underscore';
import style from 'styled-components';

const timeSwitch = {
  0: 'Midnight',
  12: 'Noon',
};

const Select = style.select`
  background-color: white;
  border: 2px solid green;
  width: 149px;
  height: 40px;
`;

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: 'Select time',
    };
    this.toggleList = this.toggleList.bind(this);
    this.grabItem = this.grabItem.bind(this);
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  timeRender(time) {
    // console.log(time)
    const { headerTitle } = this.state;
    const timeRange = _.range(time.open, time.close + 1);
    // console.log(timeRange);
    const list = _.map(timeRange, (num) => {
      if (timeSwitch.hasOwnProperty(num)) {
        const word = timeSwitch[num];
        return word;
      }
      if (num > 12) {
        const pm = num - 12;
        return `${pm}:00 PM`;
      }
      return `${num}:00 AM`;
    });
    // console.log(list);
    let list2 = [];
    let el = {};
    list.forEach((value, index) => {
      el.id = index;
      el.time = value;
      list2.push(el);
      el = {};
    });
    // console.log(list2);
    list2 = list2.map(item => (
      <option key={item.id}>{item.time}</option>
    ));
    list2.unshift(<option>{headerTitle}</option>);
    return (
      <Select onChange={this.grabItem}>
        {list2}
      </Select>
    );
  }

  grabItem(event) {
    this.setState({
      headerTitle: event.target.value,
      listOpen: false,
    });
  }

  render() {
    const { listOpen, headerTitle } = this.state;
    // I can't use destructuring props assignment here, because 'time' is undefined in a moment when component is rendering:
    // const { time } = this.props;
    if (!listOpen) {
      return (
        <div onClick={this.toggleList} onKeyPress={this.toggleList} role="button" tabIndex={0}>
          {headerTitle}
        </div>
      );
    }
    return (
      <div>
        {this.timeRender(this.props.time)}
      </div>
    );
  }
}

export default Time;