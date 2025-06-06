import { Index } from "solid-js"

import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from "@repo/tailwindcss/ui/v4/calendar"

const { format: formatWeekdayLong } = new Intl.DateTimeFormat("en", {
  weekday: "long",
})
const { format: formatWeekdayShort } = new Intl.DateTimeFormat("en", {
  weekday: "short",
})
const { format: formatMonth } = new Intl.DateTimeFormat("en", {
  month: "long",
})

const CalendarDemo = () => {
  return (
    <Calendar mode="single">
      {(props) => (
        <div class="flex flex-col gap-4 rounded-md border p-3 shadow-sm">
          <div class="relative flex w-full items-center justify-between">
            <CalendarNav
              action="prev-month"
              aria-label="Go to previous month"
            />
            <CalendarLabel>
              {formatMonth(props.month)} {props.month.getFullYear()}
            </CalendarLabel>
            <CalendarNav action="next-month" aria-label="Go to next month" />
          </div>
          <CalendarTable>
            <thead>
              <tr class="flex">
                <Index each={props.weekdays}>
                  {(weekday) => (
                    <CalendarHeadCell abbr={formatWeekdayLong(weekday())}>
                      {formatWeekdayShort(weekday())}
                    </CalendarHeadCell>
                  )}
                </Index>
              </tr>
            </thead>
            <tbody>
              <Index each={props.weeks}>
                {(week) => (
                  <tr class="mt-2 flex w-full">
                    <Index each={week()}>
                      {(day) => (
                        <CalendarCell>
                          <CalendarCellTrigger day={day()}>
                            {day().getDate()}
                          </CalendarCellTrigger>
                        </CalendarCell>
                      )}
                    </Index>
                  </tr>
                )}
              </Index>
            </tbody>
          </CalendarTable>
        </div>
      )}
    </Calendar>
  )
}

export default CalendarDemo
