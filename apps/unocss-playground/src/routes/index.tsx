import { createFileRoute } from "@tanstack/solid-router"

import { Separator } from "@/registry/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/ui/sidebar"

import AccordionDemo from "./-components/accordion-demo"
import AlertDemo from "./-components/alert-demo"
import AlertDialogDemo from "./-components/alert-dialog-demo"
import AppSidebar from "./-components/app-sidebar"
import BadgeDemo from "./-components/badge-demo"
import BreadcrumbsDemo from "./-components/breadcrumbs-demo"
import ButtonDemo from "./-components/button-demo"
import ButtonGroupDemo from "./-components/button-group-demo"
import CalendarDemo from "./-components/calendar-demo"
import CardDemo from "./-components/card-demo"
import CarouselDemo from "./-components/carousel-demo"
import ChartDemo from "./-components/chart-demo"
import CheckboxDemo from "./-components/checkbox-demo"
import CollapsibleDemo from "./-components/collapsible-demo"
import ComboboxDemo from "./-components/combobox-demo"
import CommandDemo from "./-components/command-demo"
import ComponentWrapper from "./-components/component-wrapper"
import ContextMenuDemo from "./-components/context-menu-demo"
import DatePickerDemo from "./-components/date-picker-demo"
import DialogDemo from "./-components/dialog-demo"
import DrawerDemo from "./-components/drawer-demo"
import DropdownMenuDemo from "./-components/dropdown-menu-demo"
import FileFieldDemo from "./-components/file-field-demo"
import HoverCardDemo from "./-components/hover-card-demo"
import KbdDemo from "./-components/kbd-demo"
import MenubarDemo from "./-components/menubar-demo"
import ModeSwitcher from "./-components/mode-switcher"
import NavigationMenuDemo from "./-components/navigation-menu-demo"
import NumberFieldDemo from "./-components/number-field-demo"
import OTPFieldDemo from "./-components/otp-field-demo"
import PaginationDemo from "./-components/pagination-demo"
import PopoverDemo from "./-components/popover-demo"
import ProgressDemo from "./-components/progress-demo"
import RadioGroupDemo from "./-components/radio-group-demo"
import ResizableDemo from "./-components/resizable-demo"
import SearchDemo from "./-components/search-demo"
import SegmentedControlDemo from "./-components/segmented-control-demo"
import SelectDemo from "./-components/select-demo"
import SeparatorDemo from "./-components/separator-demo"
import SkeletonDemo from "./-components/skeleton-demo"
import SliderDemo from "./-components/slider-demo"
import SonnerDemo from "./-components/sonner-demo"
import SwitchDemo from "./-components/switch-demo"
import TableDemo from "./-components/table-demo"
import TabsDemo from "./-components/tabs-demo"
import TextFieldDemo from "./-components/text-field-demo"
import ToggleDemo from "./-components/toggle-buton-demo"
import ToggleGroupDemo from "./-components/toggle-group-demo"
import TooltipDemo from "./-components/tooltip-demo"

export const Route = createFileRoute("/")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header class="bg-background sticky top-0 z-10 flex h-14 items-center border-b p-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            class="data-[orientation=vertical]:h-4 mr-4 ml-2"
          />
          <h1 class="text-sm font-medium">Kitchen Sink</h1>
          <div class="ml-auto flex items-center gap-2">
            <ModeSwitcher />
          </div>
        </header>
        <div class="@container grid p-4 gap-4">
          <ComponentWrapper name="accordion">
            <AccordionDemo />
          </ComponentWrapper>
          <ComponentWrapper name="alert">
            <AlertDemo />
          </ComponentWrapper>
          <ComponentWrapper name="alert-dialog">
            <AlertDialogDemo />
          </ComponentWrapper>
          <ComponentWrapper name="badge">
            <BadgeDemo />
          </ComponentWrapper>
          <ComponentWrapper name="breadcrumbs">
            <BreadcrumbsDemo />
          </ComponentWrapper>
          <ComponentWrapper name="button-group">
            <ButtonGroupDemo />
          </ComponentWrapper>
          <ComponentWrapper name="button">
            <ButtonDemo />
          </ComponentWrapper>
          <ComponentWrapper name="calendar">
            <CalendarDemo />
          </ComponentWrapper>
          <ComponentWrapper name="card">
            <CardDemo />
          </ComponentWrapper>
          <ComponentWrapper name="carousel">
            <CarouselDemo />
          </ComponentWrapper>
          <ComponentWrapper name="chart">
            <ChartDemo />
          </ComponentWrapper>
          <ComponentWrapper name="checkbox">
            <CheckboxDemo />
          </ComponentWrapper>
          <ComponentWrapper name="collapsible">
            <CollapsibleDemo />
          </ComponentWrapper>
          <ComponentWrapper name="combobox">
            <ComboboxDemo />
          </ComponentWrapper>
          <ComponentWrapper name="command">
            <CommandDemo />
          </ComponentWrapper>
          <ComponentWrapper name="context-menu">
            <ContextMenuDemo />
          </ComponentWrapper>
          <ComponentWrapper name="date-picker">
            <DatePickerDemo />
          </ComponentWrapper>
          <ComponentWrapper name="dialog">
            <DialogDemo />
          </ComponentWrapper>
          <ComponentWrapper name="drawer">
            <DrawerDemo />
          </ComponentWrapper>
          <ComponentWrapper name="dropdown-menu">
            <DropdownMenuDemo />
          </ComponentWrapper>
          <ComponentWrapper name="file-field">
            <FileFieldDemo />
          </ComponentWrapper>
          <ComponentWrapper name="hover-card">
            <HoverCardDemo />
          </ComponentWrapper>
          <ComponentWrapper name="kbd">
            <KbdDemo />
          </ComponentWrapper>
          <ComponentWrapper name="menubar">
            <MenubarDemo />
          </ComponentWrapper>
          <ComponentWrapper name="navigation-menu">
            <NavigationMenuDemo />
          </ComponentWrapper>
          <ComponentWrapper name="number-field">
            <NumberFieldDemo />
          </ComponentWrapper>
          <ComponentWrapper name="otp-field">
            <OTPFieldDemo />
          </ComponentWrapper>
          <ComponentWrapper name="pagination">
            <PaginationDemo />
          </ComponentWrapper>
          <ComponentWrapper name="popover">
            <PopoverDemo />
          </ComponentWrapper>
          <ComponentWrapper name="progress">
            <ProgressDemo />
          </ComponentWrapper>
          <ComponentWrapper name="radio-group">
            <RadioGroupDemo />
          </ComponentWrapper>
          <ComponentWrapper name="resizable">
            <ResizableDemo />
          </ComponentWrapper>
          <ComponentWrapper name="search">
            <SearchDemo />
          </ComponentWrapper>
          <ComponentWrapper name="segmented-control">
            <SegmentedControlDemo />
          </ComponentWrapper>
          <ComponentWrapper name="select">
            <SelectDemo />
          </ComponentWrapper>
          <ComponentWrapper name="separator">
            <SeparatorDemo />
          </ComponentWrapper>
          <ComponentWrapper name="skeleton">
            <SkeletonDemo />
          </ComponentWrapper>
          <ComponentWrapper name="slider">
            <SliderDemo />
          </ComponentWrapper>
          <ComponentWrapper name="sonner">
            <SonnerDemo />
          </ComponentWrapper>
          <ComponentWrapper name="switch">
            <SwitchDemo />
          </ComponentWrapper>
          <ComponentWrapper name="table">
            <TableDemo />
          </ComponentWrapper>
          <ComponentWrapper name="tabs">
            <TabsDemo />
          </ComponentWrapper>
          <ComponentWrapper name="text-field">
            <TextFieldDemo />
          </ComponentWrapper>
          <ComponentWrapper name="toggle-group">
            <ToggleGroupDemo />
          </ComponentWrapper>
          <ComponentWrapper name="toggle-button">
            <ToggleDemo />
          </ComponentWrapper>
          <ComponentWrapper name="tooltip">
            <TooltipDemo />
          </ComponentWrapper>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
