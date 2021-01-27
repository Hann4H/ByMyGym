import React, { Component } from "react";
import { ConfigProvider } from "antd";
import Scheduler, { SchedulerData, ViewTypes } from "./Scheduler";
import plPL from "antd/es/locale/pl_PL";

import firebase from "firebase";
const db = firebase.firestore();

class ShowScheduler extends Component {
	constructor(props) {
		super(props);

		let schedulerData = new SchedulerData(new Date(), ViewTypes.Day);
		schedulerData.localeMoment.locale("pl");
		this.state = {
			viewModel: schedulerData,
			DemoData: {
				resources: [
					{
						id: "r0",
						name: "",
						groupOnly: true,
					},
					{
						id: "r1",
						name: "Rezerwacja",
					},
				],
				events: [],
			},
		};
		schedulerData.setResources(this.state.DemoData.resources);
		schedulerData.setEvents(this.state.DemoData.events);
	}

	componentDidMount() {
		db.collection("reservation")
			.where("gym_id", "==", this.props.gym_id)
			.get()
			.then((items) => {
				const events = items.docs.map((doc) => {
					return { docId: doc.id, ...doc.data() };
				});

				const eventsData = JSON.stringify(events, null, 4);
				this.setState((events) => ({
					DemoData: {
						events: JSON.parse(eventsData),
					},
				}));

				// console.log(
				// 	"Show booking items3!!!: " +
				// 		JSON.stringify(this.state.DemoData.events, null, 4)
				// );
			});
	}

	prevClick = (schedulerData) => {
		schedulerData.prev();
		schedulerData.setEvents(this.state.DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	nextClick = (schedulerData) => {
		schedulerData.next();
		schedulerData.setEvents(this.state.DemoData.events);
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
		schedulerData.setEvents(this.state.DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	onSelectDate = (schedulerData, date) => {
		schedulerData.setDate(date);
		schedulerData.setEvents(this.state.DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
		if (schedulerData.ViewTypes === ViewTypes.Day) {
			schedulerData.next();
			schedulerData.setEvents(this.state.DemoData.events);
			this.setState({
				viewModel: schedulerData,
			});

			schedulerContent.scrollLeft = maxScrollLeft - 10;
		}
	};

	onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
		if (schedulerData.ViewTypes === ViewTypes.Day) {
			schedulerData.prev();
			schedulerData.setEvents(this.state.DemoData.events);
			this.setState({
				viewModel: schedulerData,
			});

			schedulerContent.scrollLeft = 10;
		}
	};

	onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
		// console.log("onScrollTop");
	};

	onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
		// console.log("onScrollBottom");
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
			<div>
				<h3 className="calendar-napis">
					Kalendarz rezerwacji
				</h3>
				<div className="mobile-calen">
				<ConfigProvider locale={plPL}>
					<Scheduler 
						schedulerData={viewModel}
						prevClick={this.prevClick}
						nextClick={this.nextClick}
						onSelectDate={this.onSelectDate}
						onViewChange={this.onViewChange}
						newEvent={this.newEvent}
						onScrollLeft={this.onScrollLeft}
						onScrollRight={this.onScrollRight}
						onScrollTop={this.onScrollTop}
						onScrollBottom={this.onScrollBottom}
						toggleExpandFunc={this.toggleExpandFunc}
						dane={this.state.DemoData.events}
					/>
				</ConfigProvider>
				</div>
			</div>
		);
	}
}

export default ShowScheduler;
