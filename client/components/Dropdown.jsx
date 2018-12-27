import React from 'react';
import _ from 'underscore';

const timeSwitch = {
    0: 'Midnight',
    12: 'Noon',

}

class Dropdown extends React.Component {
    constructor (props) {
      super (props);
      this.state = {
        listOpen: false,
        headerTitle: "Select time"
      }
    }

    handleClickOutside () {
        this.setState({
          listOpen: false
        })
      }

      toggleList () {
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
      }

      timeRender (time) {
        let timeRange = _.range(time.open, time.close+1)
        // console.log(timeRange);
        let list = _.map(timeRange, num => {
            if (timeSwitch.hasOwnProperty(num)) {
                num = timeSwitch[num];
                return num;
            } else if (num > 12) {
                num -= 12;
                return `${num}:00 PM`;
            } else {
                return `${num}:00 AM`;
            }
        })
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
        list2 = list2.map((item) => (
            <li className="dd-list-item" key={item.id} onClick={() => this.grabItem(item.time)}>{item.time}</li>
           ))
           return list2;
      }

      grabItem (item) {
        console.log(item);
        this.setState({
            headerTitle: item
        });
        this.toggleList();
      }

      render(){
        const{time} = this.props
        const{listOpen, headerTitle} = this.state
        return(
          <div className="dd-wrapper">
          <div className="dd-header" onClick={() => this.toggleList()}>
              <div className="dd-header-title">{headerTitle}</div>
          </div>
           {listOpen && <ul className="dd-list">
             {this.timeRender(time)}
            </ul>}
          </div>
        )
      }
  }
  
  export default Dropdown;