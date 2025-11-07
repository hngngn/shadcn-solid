import type { ParentComponent } from "solid-js"

const ComponentInstallation: ParentComponent = (props) => {
  return (
    <div class="relative mt-6 flex-1 outline-none [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6">
      {props.children}
    </div>
  )
}

export default ComponentInstallation
