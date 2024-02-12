import type { TNavItem } from "@/config/docs"
import { docsConfig } from "@/config/docs"
import { Button } from "@/registry/default/ui/button"
import {
  CommandDialog,
  CommandHeading,
  CommandInput,
  CommandItem,
  CommandItemLabel,
  CommandList,
} from "@/registry/default/ui/command"
import { useColorMode } from "@kobalte/core"
import { useNavigate } from "@solidjs/router"
import type { JSXElement } from "solid-js"
import { createEffect, createSignal, onCleanup } from "solid-js"

type Option = TNavItem & { value: string; icon: JSXElement }

type List = {
  label: string
  options: Option[]
}

const CommandMenu = () => {
  const navigate = useNavigate()
  const { setColorMode } = useColorMode()

  const data = () => {
    const temp: List[] = []

    temp.push({
      label: "Links",
      options: docsConfig.mainNav.map((e) => ({
        ...e,
        value: e.title,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
              clip-rule="evenodd"
            />
          </svg>
        ),
      })),
    })

    docsConfig.sidebarNav.forEach((e) =>
      temp.push({
        label: e.title,
        options: e.items.map((e) => ({
          ...e,
          value: e.title,
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828C5.343 22 7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172C21 19.657 21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828C18.657 2 16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
                clip-rule="evenodd"
              />
            </svg>
          ),
        })),
      })
    )

    temp.push({
      label: "Theme",
      options: [
        {
          title: "Light",
          value: "light",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-5 0h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"
              />
            </svg>
          ),
        },
        {
          title: "Dark",
          value: "dark",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"
              />
            </svg>
          ),
        },
        {
          title: "System",
          value: "system",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 19h18M5 7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z"
              />
            </svg>
          ),
        },
      ],
    })

    return temp
  }

  const [open, setOpen] = createSignal(false)

  createEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)

    onCleanup(() => {
      document.removeEventListener("keydown", down)
    })
  })

  return (
    <>
      <Button
        variant="outline"
        class="bg-background text-muted-foreground relative h-8 w-full justify-start rounded-[0.5rem] text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <kbd class="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span class="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog<Option, List>
        options={data()}
        optionValue="value"
        optionTextValue="label"
        optionLabel="title"
        optionGroupChildren="options"
        placeholder="Type a command or search..."
        onChange={(e: Option) => {
          switch (e.title) {
            case "Light":
              setColorMode("light")
              break
            case "Dark":
              setColorMode("dark")
              break
            case "System":
              setColorMode("system")
              break
            default:
              navigate(e.href!)
              break
          }
        }}
        itemComponent={(props) => (
          <CommandItem item={props.item}>
            {props.item.rawValue.icon}
            <CommandItemLabel>{props.item.rawValue.title}</CommandItemLabel>
          </CommandItem>
        )}
        sectionComponent={(props) => (
          <CommandHeading>{props.section.rawValue.label}</CommandHeading>
        )}
        open={open()}
        onOpenChange={setOpen}
      >
        <CommandInput />
        <CommandList />
      </CommandDialog>
    </>
  )
}

export default CommandMenu
