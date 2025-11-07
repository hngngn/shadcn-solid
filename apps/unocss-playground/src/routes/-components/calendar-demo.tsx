import { Index } from "solid-js"

import {
  Calendar,
  CalendarCell,
  CalendarCellTrigger,
  CalendarHeadCell,
  CalendarLabel,
  CalendarNav,
  CalendarTable,
} from "@/registry/ui/calendar"

const { format: formatWeekdayLong } = new Intl.DateTimeFormat("en", {
  weekday: "long",
})
const { format: formatWeekdayShort } = new Intl.DateTimeFormat("en", {
  weekday: "short",
})
const { format: formatMonth } = new Intl.DateTimeFormat("en", {
  month: "long",
})

const CalendarSingle = () => {
  const base = new Date(new Date().getFullYear(), new Date().getMonth(), 12)

  return (
    <Calendar mode="single" initialValue={base}>
      {(props) => (
        <div class="flex flex-col gap-4 rounded-lg border p-3 shadow-sm bg-background w-fit">
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

const CalendarMultiple = () => {
  return (
    <Calendar mode="multiple">
      {(props) => (
        <div class="flex flex-col gap-4 rounded-lg border p-3 shadow-sm bg-background w-fit">
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

const CalendarRange = () => {
  const base = new Date(new Date().getFullYear(), new Date().getMonth(), 12)

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      initialValue={{
        from: base,
        to: new Date(base.getTime() + 30 * 24 * 60 * 60 * 1000),
      }}
    >
      {(props) => (
        <div class="rounded-md border p-3 shadow-sm w-fit rounded-lg bg-background">
          <div class="relative w-full">
            <CalendarNav
              action="prev-month"
              class="absolute left-1"
              aria-label="Go to previous month"
            />
            <CalendarNav
              action="next-month"
              class="absolute right-1"
              aria-label="Go to next month"
            />
          </div>
          <div class="space-y-4 md:flex md:space-x-4 md:space-y-0">
            <Index each={props.months}>
              {(month, index) => (
                <div class="flex flex-col gap-4">
                  <div class="flex h-7 items-center justify-center">
                    <CalendarLabel index={index}>
                      {formatMonth(month().month)} {month().month.getFullYear()}
                    </CalendarLabel>
                  </div>
                  <CalendarTable index={index}>
                    <thead>
                      <tr class="flex">
                        <Index each={props.weekdays}>
                          {(weekday) => (
                            <CalendarHeadCell
                              abbr={formatWeekdayLong(weekday())}
                            >
                              {formatWeekdayShort(weekday())}
                            </CalendarHeadCell>
                          )}
                        </Index>
                      </tr>
                    </thead>
                    <tbody>
                      <Index each={month().weeks}>
                        {(week) => (
                          <tr class="mt-2 flex w-full">
                            <Index each={week()}>
                              {(day) => (
                                <CalendarCell>
                                  <CalendarCellTrigger
                                    day={day()}
                                    month={month().month}
                                  >
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
            </Index>
          </div>
        </div>
      )}
    </Calendar>
  )
}

const CalendarDemo = () => {
  return (
    <div class="bg-muted flex flex-1 flex-col flex-wrap justify-center gap-8 p-10 lg:flex-row">
      <CalendarSingle />
      <CalendarMultiple />
      <CalendarRange />
    </div>
  )
}

export default CalendarDemo
