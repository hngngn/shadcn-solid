import {
  Card,
  CardDescription,
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

const TabsOrientationDemo = () => {
  return (
    <div class="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account" orientation="vertical">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsIndicator />
        </TabsList>
        <TabsContent value="account">
          <Card class="w-[200px]">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you&apos;re
                done.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card class="w-[200px]">
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TabsOrientationDemo
