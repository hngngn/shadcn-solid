import { createSignal, For } from "solid-js";
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
  const [date, setDate] = createSignal<string[]>([]);

  return (
    <DatePicker
      class="w-full max-w-[16rem]"
      numOfMonths={2}
      selectionMode="range"
      format={() =>
        date()
          .map(e =>
            new Intl.DateTimeFormat("en-US", {
              dateStyle: "long"
            }).format(new Date(e))
          )
          .join(" - ")
      }
      value={date()}
      onValueChange={e => setDate(e.valueAsString)}
    >
      <DatePickerInput placeholder="Pick a date" />
      <DatePickerContent>
        <DatePickerView view="day">
          {api => {
            const offset = api().getOffset({ months: 1 });

            return (
              <>
                <DatePickerViewControl>
                  <DatePickerViewTrigger>
                    <DatePickerRangeText />
                  </DatePickerViewTrigger>
                </DatePickerViewControl>
                <div class="flex gap-4">
                  <DatePickerTable>
                    <DatePickerTableHead>
                      <DatePickerTableRow>
                        <For each={api().weekDays}>
                          {weekDay => (
                            <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                          )}
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
                  <DatePickerTable>
                    <DatePickerTableHead>
                      <DatePickerTableRow>
                        <For each={api().weekDays}>
                          {weekDay => (
                            <DatePickerTableHeader>{weekDay.short}</DatePickerTableHeader>
                          )}
                        </For>
                      </DatePickerTableRow>
                    </DatePickerTableHead>
                    <DatePickerTableBody>
                      <For each={offset.weeks}>
                        {week => (
                          <DatePickerTableRow>
                            <For each={week}>
                              {day => (
                                <DatePickerTableCell value={day} visibleRange={offset.visibleRange}>
                                  <DatePickerTableCellTrigger>{day.day}</DatePickerTableCellTrigger>
                                </DatePickerTableCell>
                              )}
                            </For>
                          </DatePickerTableRow>
                        )}
                      </For>
                    </DatePickerTableBody>
                  </DatePickerTable>
                </div>
              </>
            );
          }}
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
