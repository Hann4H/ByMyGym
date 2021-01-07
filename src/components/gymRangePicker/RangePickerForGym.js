// https://ant.design/components/date-picker/

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import "./index.css";
import { DatePicker, Space, ConfigProvider } from "antd";
import plPL from "antd/es/locale/pl_PL";
import moment from "moment";

const { RangePicker } = DatePicker;

class RangePickerForGym extends Component {
	constructor(props) {
		super(props);
		this.onChangeRangePicker = this.onChangeRangePicker.bind(this);
	}

	onChangeRangePicker(dates, dateStrings) {
		console.log("From: ", dates[0], ", to: ", dates[1]);
		console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
	}

	render() {
		return (
			<div>
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
							format="YYYY/MM/DD HH:mm:ss"
							onChange={this.onChangeRangePicker}
						/>
					</Space>
				</ConfigProvider>
			</div>
		);
	}
}

export default RangePickerForGym;

// onChangeRangePicker = (value, dateString) => {
//     // let date = this.state.dateRange;
//     // date.push(value);
//     // this.setState({ dateRange: date });
//     // console.log("Selected Time: ", date);

//     console.log("From: ", dates[0], ", to: ", dates[1]);
//     console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
// };

{
	/* TODO jeszcze to będę robić */
}
// <p>coś tam </p>
// <ConfigProvider locale={plPL}>
// 	{/* <RangePicker
// 		renderExtraFooter={() => "extra footer"}
// 		onChange={this.onChangeRangePicker}
// 	/> */}
// 	<Space direction="vertical" size={12}>
// 		<RangePicker
// 			ranges={{
// 				Today: [moment(), moment()],
// 				"This Month": [
// 					moment().startOf("month"),
// 					moment().endOf("month"),
// 				],
// 			}}
// 			onChange={onChangeRangePicker}
// 		/>
// 		<RangePicker
// 			ranges={{
// 				Today: [moment(), moment()],
// 				"This Month": [
// 					moment().startOf("month"),
// 					moment().endOf("month"),
// 				],
// 			}}
// 			showTime
// 			format="YYYY/MM/DD HH:mm:ss"
// 			onChange={onChangeRangePicker}
// 		/>
// 	</Space>
// 	,
// </ConfigProvider>
