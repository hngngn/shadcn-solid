import { Button } from "@repo/tailwindcss/ui/v4/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/tailwindcss/ui/v4/dropdown-menu"

const DropdownMenuDemo = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger<typeof Button>
        as={(props) => (
          <Button variant="outline" {...props}>
            Open
          </Button>
        )}
      />
      <DropdownMenuPortal>
        <DropdownMenuContent class="w-64">
          <DropdownMenuItem inset>
            Back
            <DropdownMenuShortcut>⌘[</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem inset disabled>
            Forward
            <DropdownMenuShortcut>⌘]</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem inset>
            Reload
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>More Tools</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent class="w-48">
                <DropdownMenuItem inset>
                  Save Page...
                  <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
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
                      d="M5 12h14m-7-7v14"
                    />
                  </svg>
                  Create Shortcut...
                </DropdownMenuItem>
                <DropdownMenuItem inset>Name Window...</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
                      d="m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16"
                    />
                  </svg>
                  Developer Tools
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
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
                      d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                    />
                  </svg>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked>
            Show Bookmarks Bar
            <DropdownMenuShortcut>⌘⇧B</DropdownMenuShortcut>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>Show Full URLs</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuGroupLabel inset>People</DropdownMenuGroupLabel>
            <DropdownMenuRadioGroup value="pedro">
              <DropdownMenuRadioItem value="pedro">
                Pedro Duarte
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="colm">
                Colm Tuite
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export default DropdownMenuDemo
