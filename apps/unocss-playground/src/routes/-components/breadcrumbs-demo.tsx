import {
  BreadcrumbList,
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsSeparator,
} from "@/registry/ui/breadcrumbs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"

const BreadcrumbsDemo = () => {
  return (
    <Breadcrumbs>
      <BreadcrumbList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <DropdownMenu>
            <DropdownMenuTrigger class="flex items-center gap-1">
              <BreadcrumbsEllipsis />
              <span class="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/docs/components">Components</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink current>Breadcrumb</BreadcrumbsLink>
        </BreadcrumbsItem>
      </BreadcrumbList>
    </Breadcrumbs>
  )
}

export default BreadcrumbsDemo
