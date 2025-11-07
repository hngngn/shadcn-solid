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
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/registry/ui/tabs"
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "@/registry/ui/text-field"

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
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="settings" disabled>
            Disabled
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <Tabs defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M10 4v4M2 8h20M6 4v4" />
              </g>
            </svg>
            Preview
          </TabsTrigger>
          <TabsTrigger value="code">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m16 18l6-6l-6-6M8 6l-6 6l6 6"
              />
            </svg>
            Code
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
    </div>
  )
}

export default TabsDemo
