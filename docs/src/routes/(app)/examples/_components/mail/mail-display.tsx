import { Show, createMemo } from "solid-js"
import type { DropdownMenuTriggerProps } from "@kobalte/core/dropdown-menu"
import { Image } from "@kobalte/core/image"
import type { TooltipTriggerProps } from "@kobalte/core/tooltip"

import { Button } from "@/registry/tailwindcss/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/tailwindcss/ui/dropdown-menu"
import { Separator } from "@/registry/tailwindcss/ui/separator"
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "@/registry/tailwindcss/ui/switch"
import { TextArea } from "@/registry/tailwindcss/ui/textarea"
import { TextFieldRoot } from "@/registry/tailwindcss/ui/textfield"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/tailwindcss/ui/tooltip"

import { mails } from "./data"
import { mail } from "./use-mail"

export const MailDisplay = () => {
  const data = createMemo(
    () => mails.find((item) => item.id === mail.selected) ?? null
  )

  return (
    <div class="flex h-full flex-col">
      <div class="flex items-center p-2">
        <div class="flex items-center gap-2">
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger
              as={(props: TooltipTriggerProps) => (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!data()}
                  {...props}
                >
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
                      d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2m2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8m-9 4h4"
                    />
                    <title>Archive</title>
                  </svg>
                </Button>
              )}
            />
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger
              as={(props: TooltipTriggerProps) => (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!data()}
                  {...props}
                >
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
                      d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                    />
                    <title>Move to trash</title>
                  </svg>
                </Button>
              )}
            />
            <TooltipContent>Move to trash</TooltipContent>
          </Tooltip>
        </div>
        <div class="ml-auto flex items-center gap-2">
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger
              as={(props: TooltipTriggerProps) => (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!data()}
                  {...props}
                >
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
                      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
                      <path d="m11 8l-3 3l3 3m5-3H8" />
                    </g>
                    <title>Reply</title>
                  </svg>
                </Button>
              )}
            />
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip openDelay={0} closeDelay={0}>
            <TooltipTrigger
              as={(props: TooltipTriggerProps) => (
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!data()}
                  {...props}
                >
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
                      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-5l-5 3v-3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3z" />
                      <path d="m13 8l3 3l-3 3m3-3H8" />
                    </g>
                    <title>Forward</title>
                  </svg>
                </Button>
              )}
            />
            <TooltipContent>Forward</TooltipContent>
          </Tooltip>
        </div>
        <Separator orientation="vertical" class="mx-2 h-6" />
        <DropdownMenu placement="bottom-end">
          <DropdownMenuTrigger
            as={(props: DropdownMenuTriggerProps) => (
              <Button variant="ghost" size="icon" disabled={!data()} {...props}>
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
                    d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m0-14a1 1 0 1 0 2 0a1 1 0 1 0-2 0"
                  />
                  <title>More</title>
                </svg>
              </Button>
            )}
          />
          <DropdownMenuContent>
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      <Show
        when={data()}
        fallback={
          <div class="text-muted-foreground p-8 text-center">
            No message selected
          </div>
        }
      >
        <div class="flex flex-1 flex-col">
          <div class="flex items-start p-4">
            <div class="flex items-start gap-4 text-sm">
              <Image class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image.Img alt={data()?.name} />
                <Image.Fallback class="bg-muted flex h-full w-full items-center justify-center rounded-full">
                  {data()
                    ?.name.split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </Image.Fallback>
              </Image>
              <div class="grid gap-1">
                <div class="font-semibold">{data()?.name}</div>
                <div class="line-clamp-1 text-xs">{data()?.subject}</div>
                <div class="line-clamp-1 text-xs">
                  <span class="font-medium">Reply-To:</span> {data()?.email}
                </div>
              </div>
            </div>
            {data()?.date && (
              <div class="text-muted-foreground ml-auto text-xs">
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(data()!.date))}
              </div>
            )}
          </div>
          <Separator />
          <div class="flex-1 whitespace-pre-wrap p-4 text-sm">
            {data()?.text}
          </div>
          <Separator class="mt-auto" />
          <div class="p-4">
            <div class="grid gap-4">
              <TextFieldRoot>
                <TextArea
                  class="p-4"
                  placeholder={`Reply ${data()!.name}...`}
                />
              </TextFieldRoot>
              <div class="flex items-center">
                <Switch class="flex items-center gap-2 text-xs font-normal">
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                  <SwitchLabel>Mute this thread</SwitchLabel>
                </Switch>
                <Button size="sm" class="ml-auto">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  )
}
