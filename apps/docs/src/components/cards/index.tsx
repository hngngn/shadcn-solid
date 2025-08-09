import clientOnlyWrapper from "../client-only-wrapper"
import CardsCalendar from "./calendar"
import CardsCookieSettings from "./cookie-settings"
import CardsCreateAccount from "./create-account"
import CardsForms from "./forms"
import CardsShare from "./share"

const CardsStats = clientOnlyWrapper(() => import("./stats"))
const CardsActivityGoal = clientOnlyWrapper(() => import("./activity-goal"))
const CardsExerciseMinutes = clientOnlyWrapper(
  () => import("./exercise-minutes"),
)

const CardsDemo = () => {
  return (
    <div class="md:grids-col-2 grid **:data-[slot=card]:shadow-none md:gap-4 lg:grid-cols-10 xl:grid-cols-11">
      <div class="grid gap-4 lg:col-span-4 xl:col-span-6">
        <CardsStats />
        <div class="grid gap-1 sm:grid-cols-[auto_1fr] md:hidden">
          <CardsCalendar />
          <div class="pt-3 sm:pt-0 sm:pl-2 xl:pl-4">
            <CardsActivityGoal />
          </div>
          <div class="pt-3 sm:col-span-2 xl:pt-4">
            <CardsExerciseMinutes />
          </div>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div class="flex flex-col gap-4">
            <CardsForms />
          </div>
          <div class="flex flex-col gap-4">
            <CardsCreateAccount />
            <div class="lg:hidden xl:block">
              <CardsCookieSettings />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4 lg:col-span-6 xl:col-span-5">
        <div class="hidden gap-1 sm:grid-cols-[auto_1fr] md:grid">
          <CardsCalendar />
          <div class="pt-3 sm:pt-0 sm:pl-2 xl:pl-3">
            <CardsActivityGoal />
          </div>
          <div class="pt-3 sm:col-span-2 xl:pt-3">
            <CardsExerciseMinutes />
          </div>
        </div>
        <CardsShare />
        <div class="md:hidden lg:block xl:hidden">
          <CardsCookieSettings />
        </div>
      </div>
    </div>
  )
}

export default CardsDemo
