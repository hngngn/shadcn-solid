import {
	DatePicker,
	DatePickerContent,
	DatePickerContext,
	DatePickerInput,
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
import { Index, createMemo, createSignal } from "solid-js";

const DatePickerDemo = () => {
	const [date, setDate] = createSignal<string[]>([]);

	return (
		<DatePicker
			class="w-full max-w-xs"
			numOfMonths={2}
			selectionMode="range"
			format={() =>
				date()
					.map((e) =>
						new Intl.DateTimeFormat("en-US", {
							dateStyle: "long",
						}).format(new Date(e)),
					)
					.join(" - ")
			}
			value={date()}
			onValueChange={(e) => setDate(e.valueAsString)}
		>
			<DatePickerInput placeholder="Pick a date" />
			<DatePickerContent>
				<DatePickerView view="day">
					<DatePickerContext>
						{(api) => {
							const offset = createMemo(() => api().getOffset({ months: 1 }));

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
													<Index each={api().weekDays}>
														{(weekDay) => (
															<DatePickerTableHeader>
																{weekDay().short}
															</DatePickerTableHeader>
														)}
													</Index>
												</DatePickerTableRow>
											</DatePickerTableHead>
											<DatePickerTableBody>
												<Index each={api().weeks}>
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
													<Index each={api().weekDays}>
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
				<DatePickerView
					view="month"
					class="w-[calc(var(--reference-width)-(0.75rem*2))]"
				>
					<DatePickerContext>
						{(api) => (
							<>
								<DatePickerViewControl>
									<DatePickerViewTrigger>
										<DatePickerRangeText />
									</DatePickerViewTrigger>
								</DatePickerViewControl>
								<DatePickerTable>
									<DatePickerTableBody>
										<Index
											each={api().getMonthsGrid({
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
				<DatePickerView
					view="year"
					class="w-[calc(var(--reference-width)-(0.75rem*2))]"
				>
					<DatePickerContext>
						{(api) => (
							<>
								<DatePickerViewControl>
									<DatePickerViewTrigger>
										<DatePickerRangeText />
									</DatePickerViewTrigger>
								</DatePickerViewControl>
								<DatePickerTable>
									<DatePickerTableBody>
										<Index
											each={api().getYearsGrid({
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
		</DatePicker>
	);
};

export default DatePickerDemo;
