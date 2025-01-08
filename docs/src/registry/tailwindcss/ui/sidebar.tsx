import {
  Match,
  Show,
  Switch,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  splitProps,
  useContext,
  type Accessor,
  type ComponentProps,
  type JSX,
  type ValidComponent,
} from "solid-js"
import {
  Polymorphic,
  type ElementOf,
  type PolymorphicProps,
} from "@kobalte/core/polymorphic"
import type { TooltipContentProps } from "@kobalte/core/tooltip"
import { cva, type VariantProps } from "class-variance-authority"

import { useIsMobile } from "@/registry/tailwindcss/hooks/use-mobile"
import { callHandler } from "@/registry/tailwindcss/libs/call-handler"
import { cn } from "@/registry/tailwindcss/libs/cn"
import { combineStyle } from "@/registry/tailwindcss/libs/combine-props"

import { Button, type buttonProps } from "./button"
import { Drawer, DrawerContent } from "./drawer"
import { Separator, type separatorProps } from "./separator"
import { Skeleton } from "./skeleton"
import { TextField, TextFieldRoot, type textFieldInputProps } from "./textfield"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar:state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: Accessor<"expanded" | "collapsed">
  open: Accessor<boolean>
  setOpen: (value: boolean) => void
  openMobile: Accessor<boolean>
  setOpenMobile: (open: boolean) => void
  isMobile: Accessor<boolean>
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContext>()

export const useSideBar = () => {
  const context = useContext(SidebarContext)

  if (context === undefined) {
    throw new Error(
      "`useSidebar` must be used within a `SidebarProvider` component."
    )
  }

  return context
}

type sidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const SidebarProvider = (props: sidebarProviderProps) => {
  const merge = mergeProps(
    {
      defaultOpen: true,
    } as sidebarProviderProps,
    props
  )
  const [local, rest] = splitProps(merge, [
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "style",
    "children",
  ])

  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = createSignal(false)

  // This is the internal state of the sidebar.
  // We use open and onOpenChange for control from outside the component.
  const [_open, _setOpen] = createSignal(local.defaultOpen!)
  const open = () => local.open ?? _open()
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    const openState = typeof value === "function" ? value(open()) : value
    if (local.onOpenChange) {
      local.onOpenChange(openState)
    } else {
      _setOpen(openState)
    }

    // This sets the cookie to keep the sidebar state.
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
  }

  // Helper to toggle the sidebar.
  const toggleSidebar = () => {
    if (isMobile()) {
      setOpenMobile((open) => !open)
    } else {
      setOpen((open) => !open)
    }
  }

  // Adds a keyboard shortcut to toggle the sidebar.
  createEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    onCleanup(() => {
      window.removeEventListener("keydown", handleKeyDown)
    })
  })

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = () => (open() ? "expanded" : "collapsed")

  const contextValue: SidebarContext = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={combineStyle(
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          },
          local.style
        )}
        class={cn(
          "group/sidebar-wrapper has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full",
          local.class
        )}
        {...rest}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  )
}

type sidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

export const Sidebar = (props: sidebarProps) => {
  const merge = mergeProps(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas",
    } as sidebarProps,
    props
  )
  const [local, rest] = splitProps(merge, [
    "side",
    "variant",
    "collapsible",
    "class",
    "children",
  ])

  const { isMobile, state, openMobile, setOpenMobile } = useSideBar()

  return (
    <Switch
      fallback={
        <div
          class="text-sidebar-foreground group peer hidden md:block"
          data-state={state()}
          data-collapsible={state() === "collapsed" ? local.collapsible : ""}
          data-variant={local.variant}
          data-side={local.side}
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            class={cn(
              "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            )}
          />
          <div
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class
            )}
            {...rest}
          >
            <div
              data-sidebar="sidebar"
              class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow"
            >
              {local.children}
            </div>
          </div>
        </div>
      }
    >
      <Match when={local.collapsible === "none"}>
        <div
          class={cn(
            "bg-sidebar text-sidebar-foreground flex h-full w-[--sidebar-width] flex-col",
            local.class
          )}
          {...rest}
        >
          {local.children}
        </div>
      </Match>

      <Match when={isMobile()}>
        <Drawer
          open={openMobile()}
          onOpenChange={setOpenMobile}
          side={local.side}
        >
          <DrawerContent
            data-sidebar="sidebar"
            data-mobile="true"
            class="bg-sidebar text-sidebar-foreground w-[--sidebar-width] p-0 [&>button]:hidden"
            style={{
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            }}
          >
            <div class="flex h-full w-full flex-col">{local.children}</div>
          </DrawerContent>
        </Drawer>
      </Match>
    </Switch>
  )
}

type sidebarTrigger<T extends ValidComponent | HTMLElement = HTMLElement> =
  buttonProps<ElementOf<T>> & {
    onClick?: JSX.EventHandlerUnion<T, MouseEvent>
  }

export const SidebarTrigger = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, sidebarTrigger<T>>
) => {
  const [local, rest] = splitProps(props as sidebarTrigger, [
    "class",
    "onClick",
  ])
  const { toggleSidebar, open } = useSideBar()

  const handleOnClick: JSX.EventHandlerUnion<HTMLElement, MouseEvent> = (
    event
  ) => {
    callHandler(event, local.onClick)
    toggleSidebar()
  }

  return (
    <Button
      data-trigger="trigger"
      variant="ghost"
      size="icon"
      class={cn("size-7", local.class)}
      onClick={handleOnClick}
      {...rest}
    >
      <Show
        when={!open()}
        fallback={
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
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18m7-6l-3-3l3-3" />
            </g>
            <title>Close sidebar</title>
          </svg>
        }
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
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18m5-12l3 3l-3 3" />
          </g>
          <title>Open sidebar</title>
        </svg>
      </Show>
    </Button>
  )
}

export const SidebarRail = (props: ComponentProps<"button">) => {
  const { toggleSidebar } = useSideBar()
  const [local, rest] = splitProps(props, ["class"])

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      class={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarInset = (props: ComponentProps<"main">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <main
      class={cn(
        "bg-background relative flex min-h-svh flex-1 flex-col",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarTextFieldRoot = TextFieldRoot

export type sidebarTextFieldProps<T extends ValidComponent = "input"> =
  textFieldInputProps<T>

export const SidebarTextField = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, sidebarTextFieldProps<T>>
) => {
  const [local, rest] = splitProps(props as sidebarTextFieldProps, ["class"])

  return (
    <TextField
      data-sidebar="input"
      class={cn(
        "bg-background focus-visible:ring-sidebar-ring h-8 w-full shadow-none focus-visible:ring-2",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarHeader = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="header"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  )
}

export const SidebarFooter = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="footer"
      class={cn("flex flex-col gap-2 p-2", local.class)}
      {...rest}
    />
  )
}

type sidebarSeparatorProps<T extends ValidComponent = "hr"> = separatorProps<T>

export const SidebarSeparator = <T extends ValidComponent = "hr">(
  props: PolymorphicProps<T, sidebarSeparatorProps<T>>
) => {
  const [local, rest] = splitProps(props as sidebarSeparatorProps, ["class"])

  return (
    <Separator
      data-sidebar="separator"
      class={cn("bg-sidebar-border mx-2 w-auto", local.class)}
      {...rest}
    />
  )
}

export const SidebarContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="content"
      class={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarGroup = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="group"
      class={cn("relative flex w-full min-w-0 flex-col p-2", local.class)}
      {...rest}
    />
  )
}

export const SidebarGroupLabel = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, { class?: string }>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <Polymorphic
      as="div"
      data-sidebar="group-label"
      class={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-none transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarGroupAction = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, { class?: string }>
) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <Polymorphic
      as="button"
      data-sidebar="group-action"
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarGroupContent = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="group-content"
      class={cn("w-full text-sm", local.class)}
      {...rest}
    />
  )
}

export const SidebarMenu = (props: ComponentProps<"ul">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ul
      data-sidebar="menu"
      class={cn("flex w-full min-w-0 flex-col gap-1", local.class)}
      {...rest}
    />
  )
}

export const SidebarMenuItem = (props: ComponentProps<"li">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <li
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...rest}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type sidebarMenuButton = VariantProps<typeof sidebarMenuButtonVariants> & {
  class?: string
  isActive?: boolean
  tooltip?: string | TooltipContentProps<"div">
}

export const SidebarMenuButton = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, sidebarMenuButton>
) => {
  const merge = mergeProps<sidebarMenuButton[]>(
    {
      isActive: false,
    },
    props
  )
  const [local, rest] = splitProps(merge, [
    "class",
    "isActive",
    "variant",
    "size",
    "tooltip",
  ])

  const { isMobile, state } = useSideBar()

  return (
    <Show
      when={!local.tooltip || state() !== "collapsed"}
      fallback={
        <Tooltip placement="right" openDelay={0} closeDelay={0}>
          <TooltipTrigger
            data-sidebar="menu-button"
            data-size={local.size}
            data-active={local.isActive}
            class={cn(
              sidebarMenuButtonVariants({
                variant: local.variant,
                size: local.size,
              }),
              local.class
            )}
            {...rest}
          />
          <TooltipContent
            hidden={state() !== "collapsed" || isMobile()}
            {...(typeof local.tooltip === "string"
              ? { children: local.tooltip }
              : local.tooltip)}
          />
        </Tooltip>
      }
    >
      <Polymorphic
        as="button"
        data-sidebar="menu-button"
        data-size={local.size}
        data-active={local.isActive}
        class={cn(
          sidebarMenuButtonVariants({
            variant: local.variant,
            size: local.size,
          }),
          local.class
        )}
        {...rest}
      />
    </Show>
  )
}

export const SidebarMenuAction = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, { showOnHover?: boolean; class?: string }>
) => {
  const [local, rest] = splitProps(props, ["class", "showOnHover"])

  return (
    <Polymorphic
      as="button"
      data-sidebar="menu-action"
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-none transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.showOnHover &&
          "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[expanded]:opacity-100 md:opacity-0",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarMenuBadge = (props: ComponentProps<"div">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <div
      data-sidebar="menu-badge"
      class={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      {...rest}
    />
  )
}

type sidebarMenuSkeletonProps = ComponentProps<"div"> & {
  showIcon?: boolean
}

export const SidebarMenuSkeleton = (props: sidebarMenuSkeletonProps) => {
  const [local, rest] = splitProps(props, ["class", "showIcon"])

  // Random width between 50 to 90%.
  const width = createMemo(() => `${Math.floor(Math.random() * 40) + 50}%`)

  return (
    <div
      data-sidebar="menu-skeleton"
      class={cn("flex h-8 items-center gap-2 rounded-md px-2", local.class)}
      {...rest}
    >
      <Show when={local.showIcon}>
        <Skeleton class="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />
      </Show>
      <Skeleton
        class="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": width(),
        }}
      />
    </div>
  )
}

export const SidebarMenuSub = (props: ComponentProps<"ul">) => {
  const [local, rest] = splitProps(props, ["class"])

  return (
    <ul
      data-sidebar="menu-sub"
      class={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      {...rest}
    />
  )
}

export const SidebarMenuSubItem = (props: ComponentProps<"li">) => {
  return <li {...props} />
}

type sidebarMenuSubButton = {
  size?: "sm" | "md"
  isActive?: boolean
  class?: string
}

export const SidebarMenuSubButton = <T extends ValidComponent = "a">(
  props: PolymorphicProps<T, sidebarMenuSubButton>
) => {
  const merge = mergeProps<sidebarMenuSubButton[]>({ size: "md" }, props)
  const [local, rest] = splitProps(merge, ["class", "isActive", "size"])

  return (
    <Polymorphic
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        local.size === "sm" && "text-xs",
        local.size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        local.class
      )}
      {...rest}
    />
  )
}
