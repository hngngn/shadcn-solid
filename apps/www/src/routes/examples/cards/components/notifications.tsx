import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card"

export const DemoNotifications = () => {
  return (
    <Card>
      <CardHeader class="pb-3">
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-1">
        <div class="hover:bg-accent hover:text-accent-foreground -mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mt-px h-5 w-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2-3v-3a7 7 0 0 1 4-6M9 17v1a3 3 0 0 0 6 0v-1"
            />
          </svg>
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">Everything</p>
            <p class="text-muted-foreground text-sm">
              Email digest, mentions & all activity.
            </p>
          </div>
        </div>
        <div class="bg-accent text-accent-foreground -mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 pt-px"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"
            />
          </svg>
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">Available</p>
            <p class="text-muted-foreground text-sm">
              Only mentions and comments.
            </p>
          </div>
        </div>
        <div class="hover:bg-accent hover:text-accent-foreground -mx-2 flex items-start space-x-4 rounded-md p-2 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mt-px h-5 w-5"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
              <path d="M16.681 16.673A8.717 8.717 0 0 1 12 18c-3.6 0-6.6-2-9-6c1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146A9.055 9.055 0 0 1 12 6c3.6 0 6.6 2 9 6c-.666 1.11-1.379 2.067-2.138 2.87M3 3l18 18" />
            </g>
          </svg>
          <div class="space-y-1">
            <p class="text-sm font-medium leading-none">Ignoring</p>
            <p class="text-muted-foreground text-sm">
              Turn off all notifications.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
