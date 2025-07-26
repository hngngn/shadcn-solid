import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/tailwindcss/ui/v4/card"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@repo/tailwindcss/ui/v4/tabs"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@repo/tailwindcss/ui/v4/text-field"

const TabsDemo = () => {
  return (
    <div class="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6">
              <TextField defaultValue="Pedro Duarte" class="grid gap-3">
                <TextFieldLabel>Name</TextFieldLabel>
                <TextFieldInput />
              </TextField>
              <TextField defaultValue="@peduarte" class="grid gap-3">
                <TextFieldLabel>Username</TextFieldLabel>
                <TextFieldInput />
              </TextField>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-6">
              <TextField defaultValue="" class="grid gap-3">
                <TextFieldLabel>Current password</TextFieldLabel>
                <TextFieldInput />
              </TextField>
              <TextField defaultValue="" class="grid gap-3">
                <TextFieldLabel>New password</TextFieldLabel>
                <TextFieldInput />
              </TextField>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsDemo
