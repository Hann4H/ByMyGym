import React, { Component } from "react";
import { PropTypes } from "prop-types";

import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
  DemoData,
} from "./Scheduler";

import { ConfigProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";

import firebase from "firebase";

const db = firebase.firestore();

class Basic extends Component {
  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(new Date(), ViewTypes.Week);
    schedulerData.localeMoment.locale("pl");
    schedulerData.setResources(DemoData.resources);
    schedulerData.setEvents(DemoData.events);
    this.state = {
      viewModel: schedulerData,
    };
  }

  //********** */

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(DemoData.events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    if (
      window.confirm(
        `Chcesz wybrać date/czas?`
        // {slotId: ${slotId}, slotName: ${slotName}, start: ${start}, end: ${end}, type: ${type}, item: ${item}}
      )
    ) {
      let newFreshId = 0;
      schedulerData.events.forEach((item) => {
        if (item.id >= newFreshId) newFreshId = item.id + 1;
      });

      let newEvent = {
        id: newFreshId,
        title: "Zarezerwuj",
        start: start,
        end: end,
        resourceId: slotId,
        bgColor: "purple",
      };

      schedulerData.addEvent(newEvent);
      this.setState({
        viewModel: schedulerData,
      });

      db.collection("reservation").add({
        id: newEvent.id,
        title: "Zarezerwowane",
        start: newEvent.start,
        end: newEvent.end,
        resourceId: newEvent.resourceId,
        bgColor: "#FFA841",
        gym_id: this.props.gym_id,
      });
    }
  };

  updateEventStart = (schedulerData, event, newStart) => {
    if (
      window.confirm(
        `Do you want to adjust the start of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newStart: ${newStart}}`
      )
    ) {
      schedulerData.updateEventStart(event, newStart);
    }
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    if (
      window.confirm(
        `Do you want to adjust the end of the event? {eventId: ${event.id}, eventTitle: ${event.title}, newEnd: ${newEnd}}`
      )
    ) {
      schedulerData.updateEventEnd(event, newEnd);
    }
    this.setState({
      viewModel: schedulerData,
    });
  };

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    if (
      window.confirm(
        `Do you want to move the event? {eventId: ${event.id}, eventTitle: ${event.title}, newSlotId: ${slotId}, newSlotName: ${slotName}, newStart: ${start}, newEnd: ${end}`
      )
    ) {
      schedulerData.moveEvent(event, slotId, slotName, start, end);
      this.setState({
        viewModel: schedulerData,
      });
    }
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(DemoData.events);
      this.setState({
        viewModel: schedulerData,
      });

      schedulerContent.scrollLeft = 10;
    }
  };

  onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollTop");
  };

  onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log("onScrollBottom");
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  };

  render() {
    const { viewModel } = this.state;
    return (
      <div style={{ backgroundColor: "white" }}>
        <div>
          <br />
          <ConfigProvider locale={plPL}>
            <Scheduler
              schedulerData={viewModel}
              prevClick={this.prevClick}
              nextClick={this.nextClick}
              onSelectDate={this.onSelectDate}
              onViewChange={this.onViewChange}
              eventItemClick={this.eventClicked}
              viewEventClick={this.ops1}
              viewEventText="Ops 1"
              viewEvent2Text="Ops 2"
              viewEvent2Click={this.ops2}
              updateEventStart={this.updateEventStart}
              updateEventEnd={this.updateEventEnd}
              moveEvent={this.moveEvent}
              newEvent={this.newEvent}
              onScrollLeft={this.onScrollLeft}
              onScrollRight={this.onScrollRight}
              onScrollTop={this.onScrollTop}
              onScrollBottom={this.onScrollBottom}
              toggleExpandFunc={this.toggleExpandFunc}
            />
          </ConfigProvider>
        </div>
      </div>
    );
  }
}

// export default withDragDropContext(Basic);
// export default createDndContext(HTML5Backend)(Basic);
// export default Basic;

export default Basic;
