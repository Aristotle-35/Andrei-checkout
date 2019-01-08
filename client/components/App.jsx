import React from 'react';
import Price from './Price';
import Start from './Start';
import Time from './Time';
import End from './End';
import Location from './Location';

const server = 'http://localhost:3002/api/turash/checkouts/';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
      dates: '',
      time: '',
      newRange: '',
      startHeader: false,
      endHeader: false,
      priceAir: '', 
    };
    this.getCars = this.getCars.bind(this);
    this.reserveRange = this.reserveRange.bind(this);
    this.changeHeader = this.changeHeader.bind(this);
  }

  componentDidMount() {
    this.getCars();
  }

  getCars() {
    let id;
    console.log(window.location.pathname, "whats")
    let itemID = window.location.pathname.slice(1, window.location.pathname.length - 1);
    if (itemID) {
      id = Number(itemID);
    } else {
      id = 1;
    }
    console.log(id, "id");
    fetch(server + id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('No result!');
      })
      .then(
        (result) => {
          console.log(result[0]);
          this.setState({
            price: result[0].price,
            dates: result[0].dates,
            time: result[0].time,
            location: result[0].location,
            priceAir: result[0].priceAir,
          });
        },
      )
      .catch(
        (error) => {
          console.log(error);
        },
      );
  }

  reserveRange(range) {
    // console.log('new dates to db ', range);
    this.setState({
      newRange: range,
    });
  }

  addRange(range) {
    console.log('new dates to db ', range);
    let id;
    // console.log(window.location.pathname, "whats")
    let itemID = window.location.pathname.slice(1, window.location.pathname.length - 1);
    if (itemID) {
      id = Number(itemID);
    } else {
      id = 1;
    }
    fetch(server + id, {
      method: 'post',
      body: JSON.stringify(range),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
      console.log('result of posting new dates', res)
      this.getCars();
    })
  }

  changeHeader(start, end) {
    this.setState({
      startHeader: start,
      endHeader: end,
    });
  }

  render() {
    // console.log('location', this.state.location)
    const {
      price, dates, startHeader, time, endHeader, location, newRange, priceAir
    } = this.state;
    return (
      <div>
        <Price price={price} />
        <b>Trip start</b>
        <div className="Container1">
          <div id="Compon1">
            <Start
              dates={dates}
              header={startHeader}
              changeHeader={this.changeHeader}
              reserveRange={this.reserveRange}
            />
          </div>
          <div id="Compon2">
            <Time
              time={time}
            />
          </div>
        </div>
        <div id="Line">f</div>
          <b>Trip end</b>
        <div className="Container1">
          <div id="Compon1">
            <End
              dates={dates}
              header={endHeader}
              changeHeader={this.changeHeader}
              reserveRange={this.reserveRange}
            />
          </div>
          <div id="Compon2">
            <Time
              time={time}
            />
          </div>
        </div>
        <div id="Line">f</div>
          <b>Pickup & return location</b>
        <div className="Container2">
          <Location
            location={location}
            priceAir={priceAir}
          />
        </div>
        <div id="Line">f</div>
        <div className="Container3"
          onClick={() => {
            this.addRange(this.state.newRange);
            alert("We're sending you to the checkout page.");
          }}
        >
            Go to checkout
        </div>
      </div>
    );
  }
}

export default App;