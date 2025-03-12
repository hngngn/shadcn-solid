import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import AccordionDemo from "./accordion-demo"
import AlertDemo from "./alert-demo"
import AlertDialogDemo from "./alert-dialog-demo"
import AppSidebar from "./app-sidebar"
import AreaChartInteractive from "./area-chart-interactive"
import BadgeDemo from "./badge-demo"
import BadgeDestructive from "./badge-destructive"
import BadgeOutline from "./badge-outline"
import BadgeSecondary from "./badge-secondary"
import ButtonDemo from "./button-demo"
import ButtonDestructive from "./button-destructive"
import ButtonGhost from "./button-ghost"
import ButtonLink from "./button-link"
import ButtonLoading from "./button-loading"
import ButtonOutline from "./button-outline"
import ButtonSecondary from "./button-secondary"
import ButtonWithIcon from "./button-with-icon"
import CalendarDemo from "./calendar-demo"
import CardDemo from "./card-demo"
import CarouselDemo from "./carousel-demo"
import CheckboxDemo from "./checkbox-demo"
import CollapsibleDemo from "./collapsible-demo"
import ComboboxDemo from "./combobox-demo"
import CommandDemo from "./command-demo"
import ComponentWrapper from "./component-wrapper"
import ContextMenuDemo from "./context-menu-demo"
import DatePickerDemo from "./date-picker-demo"
import DialogDemo from "./dialog-demo"
import DrawerDemo from "./drawer-demo"
import DropdownMenuDemo from "./dropdown-menu-demo"
import HoverCardDemo from "./hover-card-demo"
import MenubarDemo from "./menubar-demo"
import ModeToggle from "./mode-toggle"
import NavigationMenuDemo from "./navigation-menu-demo"
import NumberFieldDemo from "./number-field-demo"
import OtpFieldDemo from "./otp-field-demo"
import PaginationDemo from "./pagination-demo"
import PopoverDemo from "./popover-demo"
import ProgressDemo from "./progress-demo"
import RadioGroupDemo from "./radio-group-demo"
import ResizableDemo from "./resizable-demo"
import SelectDemo from "./select-demo"
import SeparatorDemo from "./separator-demo"
import SkeletonDemo from "./skeleton-demo"
import SonnerDemo from "./sonner-demo"
import SwitchDemo from "./switch-demo"
import TableDemo from "./table-demo"
import TabsDemo from "./tabs-demo"
import TextareaDemo from "./textarea-demo"
import TextFieldDemo from "./textfield-demo"
import ToastDemo from "./toast-demo"
import ToggleDemo from "./toggle-demo"
import ToggleDisabled from "./toggle-disabled"
import ToggleGroupDemo from "./toggle-group-demo"
import ToggleOutline from "./toggle-outline"
import ToggleWithText from "./toggle-with-text"
import TooltipDemo from "./tooltip-demo"

const Page = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ComponentWrapper name="Accordion">
              <AccordionDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Alert">
              <AlertDemo />
            </ComponentWrapper>
            <ComponentWrapper name="AlertDialog">
              <AlertDialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Badge">
              <BadgeDemo />
              <BadgeDestructive />
              <BadgeOutline />
              <BadgeSecondary />
            </ComponentWrapper>
            <ComponentWrapper name="Button">
              <div class="flex items-center gap-2">
                <ButtonDemo />
                <ButtonDestructive />
                <ButtonGhost />
                <ButtonLink />
              </div>
              <div class="flex items-center gap-2">
                <ButtonLoading />
                <ButtonOutline />
                <ButtonSecondary />
              </div>
              <div class="flex items-center gap-2">
                <ButtonWithIcon />
              </div>
            </ComponentWrapper>
            <ComponentWrapper name="Calendar">
              <CalendarDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Card">
              <CardDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Carousel" class="[&_.max-w-xs]:max-w-[70%]">
              <CarouselDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Checkbox">
              <CheckboxDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Collapsible">
              <CollapsibleDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Combobox">
              <ComboboxDemo />
            </ComponentWrapper>
            <ComponentWrapper
              name="Command"
              class="[&_[cmdk-root]]:md:min-w-max"
            >
              <CommandDemo />
            </ComponentWrapper>
            <ComponentWrapper name="ContextMenu">
              <ContextMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="DatePicker">
              <DatePickerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Dialog">
              <DialogDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Drawer">
              <DrawerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="DropdownMenu">
              <DropdownMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="HoverCard">
              <HoverCardDemo />
            </ComponentWrapper>
            <ComponentWrapper name="TextField">
              <TextFieldDemo />
            </ComponentWrapper>
            <ComponentWrapper name="OTPField">
              <OtpFieldDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Menubar">
              <MenubarDemo />
            </ComponentWrapper>
            <ComponentWrapper name="NavigationMenu" class="col-span-2">
              <NavigationMenuDemo />
            </ComponentWrapper>
            <ComponentWrapper name="NumberField">
              <NumberFieldDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Pagination">
              <PaginationDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Popover">
              <PopoverDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Progress">
              <ProgressDemo />
            </ComponentWrapper>
            <ComponentWrapper name="RadioGroup">
              <RadioGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Resizable" class="col-span-2">
              <ResizableDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Select">
              <SelectDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Separator">
              <SeparatorDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Skeleton">
              <SkeletonDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Sonner">
              <SonnerDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Switch">
              <SwitchDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Table" class="col-span-2">
              <TableDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Tabs">
              <TabsDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Textarea">
              <TextareaDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Toast">
              <ToastDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Toggle">
              <div class="flex items-center gap-2">
                <ToggleDemo />
                <ToggleDisabled />
                <ToggleOutline />
                <ToggleWithText />
              </div>
            </ComponentWrapper>
            <ComponentWrapper name="ToggleGroup">
              <ToggleGroupDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Tooltip">
              <TooltipDemo />
            </ComponentWrapper>
            <ComponentWrapper name="Mode Toggle">
              <ModeToggle />
            </ComponentWrapper>
            <ComponentWrapper name="Area Chart" class="col-span-3">
              <AreaChartInteractive />
            </ComponentWrapper>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Page
