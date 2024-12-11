import {
	DatePicker,
	DatePickerContent,
	DatePickerContext,
	DatePickerControl,
	DatePickerInput,
	DatePickerPositioner,
	DatePickerRangeText,
	DatePickerTable,
	DatePickerTableBody,
	DatePickerTableCell,
	DatePickerTableCellTrigger,
	DatePickerTableHead,
	DatePickerTableHeader,
	DatePickerTableRow,
	DatePickerTrigger,
	DatePickerView,
	DatePickerViewControl,
	DatePickerViewTrigger,
} from "@/registry/tailwindcss/ui/date-picker";
import { Index, createMemo } from "solid-js";
import { Portal } from "solid-js/web";

const DatePickerDemo = () => {
	return (
		<DatePicker numOfMonths={2} selectionMode="range">
			<DatePickerControl>
				<DatePickerInput index={0} />
				<DatePickerInput index={1} />
				<DatePickerTrigger />
			</DatePickerControl>
			<Portal>
				<DatePickerPositioner>
					<DatePickerContent>
						<DatePickerView view="day">
							<DatePickerContext>
								{(context) => {
									const offset = createMemo(() =>
										context().getOffset({ months: 1 }),
									);

									return (
										<>
											<DatePickerViewControl>
												<DatePickerViewTrigger>
													<DatePickerRangeText />
												</DatePickerViewTrigger>
											</DatePickerViewControl>
											<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
												<DatePickerTable>
													<DatePickerTableHead>
														<DatePickerTableRow>
															<Index each={context().weekDays}>
																{(weekDay) => (
																	<DatePickerTableHeader>
																		{weekDay().short}
																	</DatePickerTableHeader>
																)}
															</Index>
														</DatePickerTableRow>
													</DatePickerTableHead>
													<DatePickerTableBody>
														<Index each={context().weeks}>
															{(week) => (
																<DatePickerTableRow>
																	<Index each={week()}>
																		{(day) => (
																			<DatePickerTableCell value={day()}>
																				<DatePickerTableCellTrigger>
																					{day().day}
																				</DatePickerTableCellTrigger>
																			</DatePickerTableCell>
																		)}
																	</Index>
																</DatePickerTableRow>
															)}
														</Index>
													</DatePickerTableBody>
												</DatePickerTable>
												<DatePickerTable>
													<DatePickerTableHead>
														<DatePickerTableRow>
															<Index each={context().weekDays}>
																{(weekDay) => (
																	<DatePickerTableHeader>
																		{weekDay().short}
																	</DatePickerTableHeader>
																)}
															</Index>
														</DatePickerTableRow>
													</DatePickerTableHead>
													<DatePickerTableBody>
														<Index each={offset().weeks}>
															{(week) => (
																<DatePickerTableRow>
																	<Index each={week()}>
																		{(day) => (
																			<DatePickerTableCell
																				value={day()}
																				visibleRange={offset().visibleRange}
																			>
																				<DatePickerTableCellTrigger>
																					{day().day}
																				</DatePickerTableCellTrigger>
																			</DatePickerTableCell>
																		)}
																	</Index>
																</DatePickerTableRow>
															)}
														</Index>
													</DatePickerTableBody>
												</DatePickerTable>
											</div>
										</>
									);
								}}
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
												<Index
													each={context().getMonthsGrid({
														columns: 4,
														format: "short",
													})}
												>
													{(months) => (
														<DatePickerTableRow>
															<Index each={months()}>
																{(month) => (
																	<DatePickerTableCell value={month().value}>
																		<DatePickerTableCellTrigger>
																			{month().label}
																		</DatePickerTableCellTrigger>
																	</DatePickerTableCell>
																)}
															</Index>
														</DatePickerTableRow>
													)}
												</Index>
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
												<Index
													each={context().getYearsGrid({
														columns: 4,
													})}
												>
													{(years) => (
														<DatePickerTableRow>
															<Index each={years()}>
																{(year) => (
																	<DatePickerTableCell value={year().value}>
																		<DatePickerTableCellTrigger>
																			{year().label}
																		</DatePickerTableCellTrigger>
																	</DatePickerTableCell>
																)}
															</Index>
														</DatePickerTableRow>
													)}
												</Index>
											</DatePickerTableBody>
										</DatePickerTable>
									</>
								)}
							</DatePickerContext>
						</DatePickerView>
					</DatePickerContent>
				</DatePickerPositioner>
			</Portal>
		</DatePicker>
	);
};

export default DatePickerDemo;
