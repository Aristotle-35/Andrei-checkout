import React from 'react';
import style from 'styled-components';
import Price from './Price';
import Start from './Start';
import Time from './Time';
import End from './End';
import Location from './Location';
// import styles from './App.module.css';

const server = 'http://localhost:3000/api/turash/checkouts/1';

const Container1 = style.div`
  display: flex; 
  flex-direction: row;
  cursor: pointer;
  border: 0.5px solid black;
  width: 440px;
  text-align: left;
  vertical-align: middle;
  line-height: 40px; 
`;
const Compon1 = style.div`
  width: 290px;
  border: 0.5px solid black;
`;
const Compon2 = style(Compon1)`
  width: 150px;
`;
const Line = style.div`
  color: white;
  height: 10px;
`;
const Container2 = style.div`
  display: flex;
  flex-direction: colomn; 
  justify-content: center;
  cursor: pointer;
  border: 1px solid green;
  width: 440px;
`;
const Container3 = style.div`
  background-color: #00b300;
  cursor: pointer;
  border: 1px solid green;
  color: white;
  width: 440px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  line-height: 40px; 
  &:hover {
    background-color: green;
  };
`;

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
    fetch(server)
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
            // priceAir: result[0].priceAir,
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
    this.setState({
      newRange: range,
    });
  }

  addRange(range) {
    fetch(server, {
      method: 'post',
      body: JSON.stringify(range),
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
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
        <Container1>
          <Compon1>
            <Start
              dates={dates}
              header={startHeader}
              changeHeader={this.changeHeader}
              reserveRange={this.reserveRange}
            />
          </Compon1>
          <Compon2>
            <Time
              time={time}
            />
          </Compon2>
        </Container1>
        <Line>f</Line>
          <b>Trip end</b>
        <Container1>
          <Compon1>
            <End
              dates={dates}
              header={endHeader}
              changeHeader={this.changeHeader}
              reserveRange={this.reserveRange}
            />
          </Compon1>
          <Compon2>
            <Time
              time={time}
            />
          </Compon2>
        </Container1>
        <Line>f</Line>
          <b>Pickup & return location</b>
        <Container2>
          <Location
            location={location}
            // priceAir={priceAir}
          />
        </Container2>
        <Line>f</Line>
        <Container3
          onClick={() => {
            this.addRange(this.state.newRange);
            alert("We're sending you to the checkout page.");
          }}
        >
            Go to checkout
        </Container3>
      </div>
    );
  }
}

export default App;