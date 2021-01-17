// https://ant.design/components/date-picker/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { DatePicker, Space, ConfigProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";
import moment from "moment";
import Select from "react-select";
import { RRule, RRuleSet, rrulestr } from "rrule";
import firebase from "firebase";
import { TimePicker } from "antd";

const db = firebase.firestore();

const { RangePicker } = DatePicker;

// const { RangePicker } = TimePicker;

const nameStyle = {
	fontWeight: "bold",
	color: "var(--darkOrange)",
	textTransform: "none",
	fontWeight: "normal",
};

class RangePickerForGym extends Component {
	constructor(props) {
		super(props);
		this.state = { weekday: "", dates: [], dateStrings: [], times: [] };
		this.onChangeRangePicker = this.onChangeRangePicker.bind(this);
		this.handleWeekday = this.handleWeekday.bind(this);
		this.newEvent = this.newEvent.bind(this);
		this.disabledDate = this.disabledDate.bind(this);
	}

	onChangeRangePicker(dates, dateStrings) {
		console.log("Moments From: ", dates[0], ", to: ", dates[1]);
		console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
		this.setState({ dates });
		this.setState({ dateStrings });
	}

	onChangeTime = (times) => {
		console.log(times);
		this.setState({ times: times });
	};

	handleWeekday = (weekday) => {
		console.log(weekday);
		this.setState({ weekday });
	};

	disabledDate(current) {
		// Can not select days before today and today
		return current && current < moment().endOf("day");
	}

	newEvent = () => {
		const { dates, dateStrings, weekday, times } = this.state;

		if (dates && weekday && times) {
			const today = new Date();
			let startDate = new Date(dateStrings[0]);
			let start = dateStrings[0];
			let end = dateStrings[1];
			let startTime = moment(times[0]).format("HH:mm"); // picker zwraca godzinę startową i godzinę końcową jako array stąd
			let endTime = moment(times[1]).format("HH:mm"); // rozróżnienie na [0] i [1]

			let datesFrom = moment(
				moment(dates[0]).format("YYYY-MM-DD") + " " + startTime
			);
			let datesTo = moment(
				moment(dates[1]).format("YYYY-MM-DD") + " " + endTime
			);
			console.log("From rule: ", datesFrom);
			console.log("To rule: ", datesTo);

			// get weekday
			let byweekdayValue = [];
			let lenWeekday = weekday.length;
			while (lenWeekday) {
				lenWeekday--;
				let a = weekday[lenWeekday];
				switch (a.value) {
					case "MO":
						byweekdayValue.push(RRule.MO);
						break;
					case "TU":
						byweekdayValue.push(RRule.TU);
						break;
					case "WE":
						byweekdayValue.push(RRule.WE);
						break;
					case "TH":
						byweekdayValue.push(RRule.TH);
						break;
					case "FR":
						byweekdayValue.push(RRule.FR);
						break;
					case "SA":
						byweekdayValue.push(RRule.SA);
						break;
					case "SU":
						byweekdayValue.push(RRule.SU);
						break;
					default:
						break;
				}
			}
			console.log("byweekday: ", byweekdayValue);

			//  create rule
			// let hoursTo = new Date(dates[1]).getHours();
			// let minutesTo = new Date(dates[1]).getMinutes();
			// let dateTo = new Date(dates[0]).setHours(hoursTo);
			// dateTo = new Date(dateTo).setMinutes(minutesTo);
			// dateTo = moment(new Date(dateTo)).format("YYYY-MM-DD HH:mm");

			const rule = new RRule({
				freq: RRule.WEEKLY,
				// byweekday: [RRule.TU, RRule.SA],
				byweekday: byweekdayValue,
				dtstart: new Date(datesFrom.toISOString()),
				until: new Date(datesTo.toISOString()),
			});
			console.log(rule.toString());
			console.log("From: ", dateStrings[0] + " " + startTime);
			console.log("To: ", dateStrings[0] + " " + endTime);

			if (startDate < today) {
				alert("Początkowa data nie może być z przeszłości!");
			} else {
				if (
					window.confirm(
						`Chcesz zarezerwować termin? Od ${start} do ${end} (${startTime}-${endTime})`
					)
				) {
					db.collection("reservation")
						.add({
							id: 0,
							title: "Do akceptacji",
							start: dateStrings[0] + " " + startTime,
							end: dateStrings[0] + " " + endTime,
							resourceId: "r1",
							bgColor: "#FFD700",
							movable: false,
							resizable: false,
							gym_id: this.props.gym_id,
							reservation_date: new Date().toISOString(),
							name: this.props.name,
							surname: this.props.surname,
							email: this.props.email,
							phoneNumber: this.props.phoneNumber,
							user_id: this.props.user,
							scored: null,
							// rrule: "FREQ=WEEKLY;DTSTART=20210110T013000Z;UNTIL=20210130T023000Z;BYDAY=TU,FR",
							rrule: rule.toString(),
						})
						.then(() => {
							window.location.reload();
							window.location.replace("/finishReservation");
						});
				}
			}
		} else {
			window.alert("Proszę uzupełnić obowiązkowe pola!");
		}
	};

	render() {
		return (
			<>
				<div className="booking-field">
					<ConfigProvider locale={plPL}>
						<Space direction="vertical" size="2">
							<label style={nameStyle}>Wybierz daty *:</label>
							<RangePicker
								ranges={{
									Today: [moment(), moment()],
									"This Month": [
										moment().startOf("month"),
										moment().endOf("month"),
									],
								}}
								disabledDate={this.disabledDate}
								hideDisabledOptions="true"
								onChange={this.onChangeRangePicker}
							/>

							{/* <RangePicker
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
								disabledDate={this.disabledDate}
								disabledHours={() => [0, 1, 2, 3, 4, 5, 23]}
								hideDisabledOptions="true"
								onChange={this.onChangeRangePicker}
							/> */}
							<p style={{ height: 10 }} />
							<label style={nameStyle}>Wybierz czas *:</label>
							<TimePicker.RangePicker
								format="HH:mm"
								minuteStep={30}
								disabledHours={() => [0, 1, 2, 3, 4, 5, 23]}
								hideDisabledOptions="true"
								onChange={this.onChangeTime}
							/>

							<p style={{ height: 10 }} />
							<label style={nameStyle}>
								Wybierz dzień/dni tygodnia *:
							</label>
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
								onChange={this.handleWeekday}
								options={[
									{ value: "MO", label: "Poniedziałek" },
									{ value: "TU", label: "Wtorek" },
									{ value: "WE", label: "Środa" },
									{ value: "TH", label: "Czwartek" },
									{ value: "FR", label: "Piątek" },
									{ value: "SA", label: "Sobota" },
									{ value: "SU", label: "Niedziela" },
								]}
							/>
						</Space>
					</ConfigProvider>
					<p style={{ height: 10 }} />
					<button onClick={this.newEvent} style={{ color: "white" }}>
						Zatwierdź
					</button>
				</div>
			</>
		);
	}
}

export default RangePickerForGym;
