import { Button } from "@/registry/tailwindcss/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/registry/tailwindcss/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/registry/tailwindcss/ui/dropdown-menu";
import { Separator } from "@/registry/tailwindcss/ui/separator";
import { As } from "@kobalte/core";

export const DemoGithub = () => {
  return (
    <Card>
      <CardHeader class="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div class="space-y-1">
          <CardTitle>shadcn-solid</CardTitle>
          <CardDescription>
            Beautifully designed components that you can copy and paste into your apps. Accessible.
            Customizable. Open Source.
          </CardDescription>
        </div>
        <div class="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" class="px-3 shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
              />
            </svg>
            Star
          </Button>
          <Separator orientation="vertical" class="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <As component={Button} variant="secondary" class="px-2 shadow-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-secondary-foreground"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m6 9l6 6l6-6"
                  />
                </svg>
                <span class="sr-only">Arrow</span>
              </As>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-[200px]">
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Suggested Lists</DropdownMenuGroupLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Future Ideas</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>{" "}
                  Create List
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div class="flex space-x-4 text-sm text-muted-foreground">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M15 17.5c.32.32.754.5 1.207.5h.543c.69 0 1.25-.56 1.25-1.25v-.25a1.5 1.5 0 0 0-1.5-1.5a1.5 1.5 0 0 1-1.5-1.5v-.25c0-.69.56-1.25 1.25-1.25h.543c.453 0 .887.18 1.207.5M9 12h4m-2 0v6" />
                <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2" />
              </g>
            </svg>
            TypeScript
          </div>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="mr-1 h-3 w-3" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m12 17.75l-6.172 3.245l1.179-6.873l-5-4.867l6.9-1l3.086-6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
              />
            </svg>
            33
          </div>
          <div>Updated Feb 2024</div>
        </div>
      </CardContent>
    </Card>
  );
};
