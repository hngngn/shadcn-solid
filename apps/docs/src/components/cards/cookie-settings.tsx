import { Button } from "@/registry/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/ui/card"
import {
  Switch,
  SwitchControl,
  SwitchDescription,
  SwitchInput,
  SwitchLabel,
  SwitchThumb,
} from "@/registry/ui/switch"

const CardsCookieSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cookie Settings</CardTitle>
        <CardDescription>Manage your cookie settings here.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-6">
        <Switch class="flex items-center justify-between gap-4" defaultChecked>
          <div class="flex flex-col items-start">
            <SwitchLabel>Strictly Necessary</SwitchLabel>
            <SwitchDescription>
              These cookies are essential in order to use the website and use
              its features.
            </SwitchDescription>
          </div>
          <div>
            <SwitchInput />
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </div>
        </Switch>
        <Switch class="flex items-center justify-between gap-4">
          <div class="flex flex-col items-start">
            <SwitchLabel>Functional Cookies</SwitchLabel>
            <SwitchDescription>
              These cookies allow the website to provide personalized
              functionality.
            </SwitchDescription>
          </div>
          <div>
            <SwitchInput />
            <SwitchControl>
              <SwitchThumb />
            </SwitchControl>
          </div>
        </Switch>
      </CardContent>
      <CardFooter>
        <Button variant="outline" class="w-full">
          Save preferences
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardsCookieSettings
