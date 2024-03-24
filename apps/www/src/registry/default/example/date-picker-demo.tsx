import { For } from "solid-js";
import {
  DatePicker,
  DatePickerContent,
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
  DatePickerViewTrigger
} from "../ui/date-picker";

const DatePickerDemo = () => {
  return (
    <DatePicker>
      <DatePickerInput placeholder="Pick a date" />
      <DatePickerContent>
        <DatePickerView view="day">
          {api => (
            <>
              <DatePickerViewControl>
                <DatePickerViewTrigger>
                  <DatePickerRangeText />
                </DatePickerViewTrigger>
              </DatePickerViewControl>
              <DatePickerTable>
                <DatePickerTableHead>
                  <DatePickerTableRow>
                    <For each={api().weekDays}>
                      {weekDay => <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>}
                    </For>
                  </DatePickerTableRow>
                </DatePickerTableHead>
                <DatePickerTableBody>
                  <For each={api().weeks}>
                    {week => (
                      <DatePickerTableRow>
                        <For each={week}>
                          {day => (
                            <DatePickerTableCell value={day}>
                              <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
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
        </DatePickerView>
        <DatePickerView view="month">
          {api => (
            <>
              <DatePickerViewControl>
                <DatePickerViewTrigger>
                  <DatePickerRangeText />
                </DatePickerViewTrigger>
              </DatePickerViewControl>
              <DatePickerTable>
                <DatePickerTableBody>
                  <For
                    each={api().getMonthsGrid({
                      columns: 4,
                      format: "short"
                    })}
                  >
                    {months => (
                      <DatePickerTableRow>
                        <For each={months}>
                          {month => (
                            <DatePickerTableCell value={month.value}>
                              <DatePickerTableCellTrigger>{month.label}</DatePickerTableCellTrigger>
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
        </DatePickerView>
        <DatePickerView view="year">
          {api => (
            <>
              <DatePickerViewControl>
                <DatePickerViewTrigger>
                  <DatePickerRangeText />
                </DatePickerViewTrigger>
              </DatePickerViewControl>
              <DatePickerTable>
                <DatePickerTableBody>
                  <For
                    each={api().getYearsGrid({
                      columns: 4
                    })}
                  >
                    {years => (
                      <DatePickerTableRow>
                        <For each={years}>
                          {year => (
                            <DatePickerTableCell value={year.value}>
                              <DatePickerTableCellTrigger>{year.label}</DatePickerTableCellTrigger>
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
        </DatePickerView>
      </DatePickerContent>
    </DatePicker>
  );
};

export default DatePickerDemo;
