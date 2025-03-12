import { Button } from "@/registry/tailwindcss/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/tailwindcss/ui/card"
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/registry/tailwindcss/ui/switch"

export const DemoCookieSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <div class="flex items-center justify-between space-x-2">
          <label class="flex flex-col space-y-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <span>Strictly Necessary</span>
            <span class="text-muted-foreground font-normal leading-snug">
              These cookies are essential in order to use the website and use
              its features.
            </span>
          </label>
          <Switch defaultChecked>
            <SwitchControl>
              <SwitchLabel class="sr-only">Strictly Necessary</SwitchLabel>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
        <div class="flex items-center justify-between space-x-2">
          <label class="flex flex-col space-y-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <span>Functional Cookies</span>
            <span class="text-muted-foreground font-normal leading-snug">
              These cookies allow the website to provide personalized
              functionality.
            </span>
          </label>
          <Switch>
            <SwitchControl>
              <SwitchLabel class="sr-only">Functional Cookies</SwitchLabel>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
        <div class="flex items-center justify-between space-x-2">
          <label class="flex flex-col space-y-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <span>Performance Cookies</span>
            <span class="text-muted-foreground font-normal leading-snug">
              These cookies help to improve the performance of the website.
            </span>
          </label>
          <Switch>
            <SwitchControl>
              <SwitchLabel class="sr-only">Performance Cookies</SwitchLabel>
              <SwitchThumb />
            </SwitchControl>
          </Switch>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" class="w-full">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  )
}
