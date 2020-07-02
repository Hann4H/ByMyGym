import React, { Component } from 'react';
import moment from 'moment';

export class Calendar2 extends Component {

    constructor() {
      super();
        this.state = {
        hour: [
            "\xa07:00\xa0",
            "\xa08:00\xa0",
            "\xa09:00\xa0",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00"
        ],
        hourAvailable: [
            "\xa07:00\xa0",
            "\xa08:00\xa0",
            "\xa09:00\xa0",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00"
        ],
        hourReserved: [],
        hourAvailable2: [
            "\xa07:00\xa0",
            "\xa08:00\xa0",
            "\xa09:00\xa0",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00"
        ],
        hourReserved2: [],
        indexStart: 7,
        indexEnd: 14,
        array: []
      }
    }
    
    onClickData(hour) {
      if(this.state.hourReserved.indexOf(hour) > -1 ) {
        this.setState({
          hourAvailable: this.state.hourAvailable.concat(hour),
          hourReserved: this.state.hourReserved.filter(res => res != hour)
        })
      } else {
        this.setState({
          hourReserved: this.state.hourReserved.concat(hour),
          hourAvailable: this.state.hourAvailable.filter(res => res != hour)
        })
      }
    }

    onClickChevronL() {
        this.setState({
            indexStart: this.state.indexStart-7,
            indexEnd: this.state.indexEnd-7
          })
    }

    onClickChevronR() {
        this.setState({
            indexStart: this.state.indexStart+7,
            indexEnd: this.state.indexEnd+7
          })
    }

    
    getDaysArray = (year, month) => {
        const monthIndex = month - 1
        const names = Object.freeze(
           [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ]);
        const date = new Date(year, monthIndex, 1);
        const result = [];
        while (date.getMonth() == monthIndex) {
          result.push(`${date.getDate()}-${names[date.getDay()]}`);
          date.setDate(date.getDate() + 1);
        }
        return result;
      }

    
    render() {
        (this.getDaysArray(2020, 9))
      return (
        <div>
          <h1>Hour Reservation System</h1>
          <DrawGrid 
            hour = { this.state.hour }
            available = { this.state.hourAvailable }
            reserved = { this.state.hourReserved }
            onClickData = { this.onClickData.bind(this) }
            array = { this.state.array }
            indexStart = { this.state.indexStart }
            indexEnd = { this.state.indexEnd }
            onClickChevronLeft = { this.state.onClickChevronL }
            onClickChevronRight = { this.state.onClickChevronR }
            />
        </div>
      )
    }
  }
  
  class DrawGrid extends Component {

    render() {

        var a = moment('2020-06-22');
        var b = moment('2022-10-01');

        for (var m = moment(a); m.isBefore(b); m.add(1, 'days')) {
            // array.push([ m.format('DD.MM'), {hours}]);
            this.props.array.push(m.format('DD.MM'));
        }

      return (
         <div className="container-6">
          <h2></h2>
          <table className="grid">
            <thead>
                <tr></tr>
            </thead>
            <tbody>
                <tr className="body-t">
                {this.props.array.slice(this.props.indexStart, this.props.indexEnd).map(day => 
                <div>
                    <th className="week-day">
                    <td className="buagam">{day+"\xa0\xa0\xa0\xa0\xa0"}</td>
                    </th>
                    <tr>
                    {this.props.hour.map( row =>
                        <div>
                        <td 
                        className={this.props.reserved.indexOf(row) > -1? 'reserved': 'available'}
                        key={row} onClick = {e => this.onClickHour(row)}>{row} </td></div>)}
                        </tr>
                        </div>
                )}
                </tr>
                
            </tbody>
          </table>
          
          <AvailableList available = { this.props.available } />
          <ReservedList reserved = { this.props.reserved } />
         </div>
      )
    }
    
    onClickHour(hour) {
        this.props.onClickData(hour);
    }

    onClickChevronLeft() {
        this.props.onClickChevronL();
    }

    onClickChevronRight() {
        this.props.onClickChevronR();
    }

  }

  class ActualDates extends Component {
    render() {
      const hourCount = this.props.available.length;
      return(
        <div className="left">
          <h4>Available Hours: ({hourCount == 0? 'No hours available' : hourCount})</h4>
          <ul>
            {this.props.available.map( res => <li key={res} >{res}</li> )}
          </ul>
        </div>
      )
    }
  }
  
  class AvailableList extends Component {
    render() {
      const hourCount = this.props.available.length;
      return(
        <div className="left">
          <h4>Available Hours: ({hourCount == 0? 'No hours available' : hourCount})</h4>
          <ul>
            {this.props.available.map( res => <li key={res} >{res}</li> )}
          </ul>
        </div>
      )
    }
  }
  
  class ReservedList extends Component {
    render() {
      return(
        <div className="right">
          <h4>Reserved Hours: ({this.props.reserved.length})</h4>
          <ul>
            { this.props.reserved.map(res => <li key={res} >{res}</li>) }
          </ul>
        </div>
      )
    }
  }
  
  
 