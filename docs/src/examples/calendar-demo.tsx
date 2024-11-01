import {
	DatePicker,
	DatePickerContent,
	DatePickerContext,
	DatePickerRangeText,
	DatePickerTable,
	DatePickerTableBody,
	DatePickerTableCell,
	DatePickerTableCellTrigger,
	DatePickerTableHead,
	DatePickerTableHeader,
	DatePickerTableRow,
	DatePickerView,
	DatePickerViewControl,
	DatePickerViewTrigger,
} from "@repo/tailwindcss/ui/date-picker";
import { For } from "solid-js";

const CalendarDemo = () => {
	return (
		<DatePicker open>
			<DatePickerContent>
				<DatePickerView view="day">
					<DatePickerContext>
						{(context) => (
							<>
								<DatePickerViewControl>
									<DatePickerViewTrigger>
										<DatePickerRangeText />
									</DatePickerViewTrigger>
								</DatePickerViewControl>
								<DatePickerTable>
									<DatePickerTableHead>
										<DatePickerTableRow>
											<For each={context().weekDays}>
												{(weekDay) => (
													<DatePickerTableHeader>
														{weekDay.short}
													</DatePickerTableHeader>
												)}
											</For>
										</DatePickerTableRow>
									</DatePickerTableHead>
									<DatePickerTableBody>
										<For each={context().weeks}>
											{(week) => (
												<DatePickerTableRow>
													<For each={week}>
														{(day) => (
															<DatePickerTableCell value={day}>
																<DatePickerTableCellTrigger>
																	{day.day}
																</DatePickerTableCellTrigger>
															</DatePickerTableCell>
														)}
													</For>
												</DatePickerTableRow>
											)}
										</For>
									</DatePickerTableBody>
								</DatePickerTable>
							</>
						)}
					</DatePickerContext>
				</DatePickerView>
				<DatePickerView view="month">
					<DatePickerContext>
						{(context) => (
							<>
								<DatePickerViewControl>
									<DatePickerViewTrigger>
										<DatePickerRangeText />
									</DatePickerViewTrigger>
								</DatePickerViewControl>
								<DatePickerTable>
									<DatePickerTableBody>
										<For
											each={context().getMonthsGrid({
												columns: 4,
												format: "short",
											})}
										>
											{(months) => (
												<DatePickerTableRow>
													<For each={months}>
														{(month) => (
															<DatePickerTableCell value={month.value}>
																<DatePickerTableCellTrigger>
																	{month.label}
																</DatePickerTableCellTrigger>
															</DatePickerTableCell>
														)}
													</For>
												</DatePickerTableRow>
											)}
										</For>
									</DatePickerTableBody>
								</DatePickerTable>
							</>
						)}
					</DatePickerContext>
				</DatePickerView>
				<DatePickerView view="year">
					<DatePickerContext>
						{(context) => (
							<>
								<DatePickerViewControl>
									<DatePickerViewTrigger>
										<DatePickerRangeText />
									</DatePickerViewTrigger>
								</DatePickerViewControl>
								<DatePickerTable>
									<DatePickerTableBody>
										<For
											each={context().getYearsGrid({
												columns: 4,
											})}
										>
											{(years) => (
												<DatePickerTableRow>
													<For each={years}>
														{(year) => (
															<DatePickerTableCell value={year.value}>
																<DatePickerTableCellTrigger>
																	{year.label}
																</DatePickerTableCellTrigger>
															</DatePickerTableCell>
														)}
													</For>
												</DatePickerTableRow>
											)}
										</For>
									</DatePickerTableBody>
								</DatePickerTable>
							</>
						)}
					</DatePickerContext>
				</DatePickerView>
			</DatePickerContent>
		</DatePicker>
	);
};

export default CalendarDemo;
