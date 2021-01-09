// https://ant.design/components/date-picker/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { DatePicker, Space, ConfigProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";
import moment from "moment";
import Select from "react-select";

const { RangePicker } = DatePicker;

class RangePickerForGym extends Component {
	constructor(props) {
		super(props);
		this.state = { weekday: "", dates: [], dateStrings: [] };
		this.onChangeRangePicker = this.onChangeRangePicker.bind(this);
		this.handleWeekday = this.handleWeekday.bind(this);
		this.handleReservation = this.handleReservation.bind(this);
	}

	onChangeRangePicker(dates, dateStrings) {
		console.log("From: ", dates[0], ", to: ", dates[1]);
		console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
		this.setState(dates);
		this.setState(dateStrings);
	}

	handleWeekday = (weekday) => {
		console.log(weekday);
		// const weekday = evt.target.value;
		this.setState(weekday);
	};

	handleReservation() {
		console.log(this.state.weekday.value);
		console.log(
			"From dates: ",
			this.state.dates[0],
			", to: ",
			this.state.dates[1]
		);
		console.log(
			"From dateStrings: ",
			this.state.dateStrings[0],
			", to: ",
			this.state.dateStrings[1]
		);
	}

	// {
	//   id: 5,
	//   start: "2017-12-19 17:30:00",
	//   end: "2017-12-19 23:30:00",
	//   resourceId: "r1",
	//   title: "R1 has recurring tasks every week on Tuesday, Friday",
	//   rrule: "FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR",
	//   bgColor: "#f759ab",
	// },

	render() {
		return (
			<>
				<div className="booking-field">
					<ConfigProvider locale={plPL}>
						<Space direction="vertical" size={12}>
							<RangePicker
								ranges={{
									Today: [moment(), moment()],
									"This Month": [
										moment().startOf("month"),
										moment().endOf("month"),
									],
								}}
								onChange={this.onChangeRangePicker}
							/>
							<RangePicker
								ranges={{
									Today: [moment(), moment()],
									"This Month": [
										moment().startOf("month"),
										moment().endOf("month"),
									],
								}}
								showTime
								format="YYYY-MM-DD HH:mm"
								minuteStep={30}
								disabledHours={() => [0, 1, 2, 3, 4, 5, 23]}
								hideDisabledOptions="true"
								onChange={this.onChangeRangePicker}
							/>
						</Space>
					</ConfigProvider>
					<br />
					<Select
						isMulti
						theme={(theme) => ({
							...theme,
							colors: {
								...theme.colors,
								primary: "#ffa841",
								primary25: "#ffb967",
							},
						})}
						placeholder="Dzień tygodnia"
						// value={this.state.weekday}
						onChange={this.handleWeekday}
						options={[
							{ value: "monday", label: "Poniedziałek" },
							{ value: "tuesday", label: "Wtorek" },
							{ value: "wednesday", label: "Środa" },
							{ value: "thursday", label: "Czwartek" },
							{ value: "friday", label: "Piątek" },
							{ value: "saturday", label: "Sobota" },
							{ value: "sunday", label: "Niedziela" },
						]}
					/>
					<button onClick={this.handleReservation}>Zatwierdź</button>
				</div>
			</>
		);
	}
}

export default RangePickerForGym;
